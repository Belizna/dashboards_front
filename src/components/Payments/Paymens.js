import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import React, {useState, useEffect, useRef} from "react";
import { Form, Input,FloatButton, Popconfirm, Table, Select, Button, Space, Typography} from 'antd';
import axios from 'axios'
import './payments.css'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'select' ? <Select
  options={[
    {
      value: 'Оплачено',
      label: 'Оплачено',
    },
    {
      value: 'Не оплачено',
      label: 'Не оплачено',
    },
  ]}/> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Payments = () => {

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Поиск даты платежа`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Сброс
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const isEditing = (record) => record._id === editingKey;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/credit/payments`)
    .then((res) => setData(res.data.payments))
  }, [])


  const handleDelete = async (record) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/credit/payments/${record._id}`)
    const newData = data.filter((item) => item._id !== record._id);
    setData(newData);
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = (_id) => {
    try{
      if(typeof _id === 'number')
      {
        const newData = data.filter((item) => item._id !== _id);
        setData(newData);
        setEditingKey('');
      }
      else setEditingKey('');
  }
  catch(errInfo) {
    console.log('Cancel error:', errInfo);
  }
  };

  const save = async (_id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => _id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        await axios.patch(`${process.env.REACT_APP_API_URL}/credit/payments/${data[index]._id}`, row)
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Дата платежа',
      dataIndex: 'date_payment',
      width: '25%',
      editable: false,
      ...getColumnSearchProps('date_payment')
    },
    {
      title: 'Сумма платежа',
      dataIndex: 'summ_payment',
      width: '25%',
      editable: true,
    },
    {
      title: 'Статус платежа',
      dataIndex: 'status_payment',
      width: '30%',
      editable: true,
      defaultFilteredValue: ['Не оплачено'],
      filters: [
        {
          text: 'Оплачено',
          value: 'Оплачено',
        },
        {
          text: 'Не оплачено',
          value: 'Не оплачено',
        },
      ],
      onFilter: (value, record) => record.status_payment.includes(value),
    },
    {
      title: 'Действия',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          /* eslint-disable */
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Отменить редактирование?" onConfirm={() => cancel(record._id)}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{marginRight: 8}}>
            Edit
          </Typography.Link>
          <Popconfirm title="Уверен в удалении?" onConfirm={() => handleDelete(record)}>
          <a>Delete</a>
        </Popconfirm>
        </>
        /* eslint-enable */
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'status_payment' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
      <>
      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName={(record, index) => record.status_payment === 'Оплачено'  ? 'table-row-light' : 'table-row-dark'}
        bordered
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          },
        }}
        style={{marginTop: 35}}
      />
    </Form>
    <FloatButton.BackTop />
    </>
  );
}

export default Payments;