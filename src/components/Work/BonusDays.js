import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import React, {useState, useEffect, useRef} from "react";
import { Form,FloatButton, Input, Popconfirm, DatePicker, Table, InputNumber, Button, Space, Typography} from 'antd';
import axios from 'axios'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

const dateFormat = 'DD-MM-YYYY'

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
  const inputNode = inputType === 'date' ? 
  <DatePicker  format={{format: dateFormat}}/> :
  inputType === 'number' ? 
  <InputNumber min={0} step={0.5}/>
  : <Input />;

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

const BonusDays = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [countSave, setCountSave] = useState(0);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
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
          placeholder={`Поиск даты зарплаты`}
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
    axios.get(`${process.env.REACT_APP_API_URL}/weekend/bonus_days/`)
    .then((res) => setData(res.data.bonus_days))
  }, [countSave])


  const handleDelete = async (record) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/weekend/bonus_days/delete/${record._id}`)
    const newData = data.filter((item) => item._id !== record._id);
    setData(newData);
  };

  const add = (record) => {
    form.setFieldsValue({
      time_bonus: '',
      ...record,
    });
    setEditingKey(record._id); 
  };

  const edit = (record) => {
    form.setFieldsValue({
      date_bonus: (dayjs.utc(record.date_bonus, dateFormat)),
      time_bonus: record.time_bonus,
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
        typeof _id === 'number' ? await axios.post(`${process.env.REACT_APP_API_URL}/weekend/bonus_days/add`,row) 
        : await axios.patch(`${process.env.REACT_APP_API_URL}/weekend/bonus_days/edit/${data[index]._id}`, row)
        setCountSave(countSave+1)
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
      title: 'Дата подработки',
      dataIndex: 'date_bonus',
      width: '20%',
      editable: true,
      ...getColumnSearchProps('date_bonus')
    },
    {
      title: 'Отработанные часы',
      dataIndex: 'time_bonus',
      width: '25%',
      editable: true,
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
        inputType: col.dataIndex === 'date_bonus' ? 'date' : 
        col.dataIndex === 'time_bonus' ? 'number' : 
        'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleAdd = async () => {
    const newData = {
      _id: Math.random(),
      time_bonus: 0.0,
    };
    setData([newData, ...data])
    add(newData)
    
  };
  return (
      <>

      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          onChange: cancel,
        }}
        style={{marginTop: 35}}
        rowClassName={(record, index) => record.status_bonus === 'Выплачено'  ? 'table-row-light' : 'table-row-dark'}
      />
    </Form>
    <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginTop: 10,
          backgroundColor:'#5270A7',
        }}
      >
        Добавить подработку
      </Button>
      <FloatButton.BackTop />
    </>
  );
}

export default BonusDays;