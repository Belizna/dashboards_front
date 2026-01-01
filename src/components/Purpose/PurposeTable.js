import React, { useEffect, useState, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Form, Input, Popconfirm, Table, Space, Select, Typography, Button } from 'antd';
import axios from "axios";

const currentYear = new Date().getFullYear()

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
  const inputNode = inputType === 'select' ?
    <Select
      options={[
        {
          value: 'Прохождение игр',
          label: 'Прохождение игр',
        },
        {
          value: 'Покупка игр',
          label: 'Покупка игр',
        },
        {
          value: 'Чтение книг',
          label: 'Чтение книг',
        },
        {
          value: 'Покупка книг',
          label: 'Покупка книг',
        },
        {
          value: 'Покрас миниатюр',
          label: 'Покрас миниатюр',
        },
        {
          value: 'Ипотека',
          label: 'Ипотека',
        },
        {
          value: 'Заработок',
          label: 'Заработок',
        }
      ]} /> : inputType === 'select_year' ? <Select
        options={[
          {
            value: currentYear,
            label: currentYear,
          },
          {
            value: currentYear + 1,
            label: currentYear + 1,
          },
          {
            value: currentYear + 2,
            label: currentYear + 2,
          },
        ]} />
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
              message: `Требуется ввод ${title}!`,
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

const PurposeTable = ({ comics_collect }) => {

  const [countSave, setCountSave] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/purpose/`)
      .then((res) => setData(res.data.purpose))
  }, [countSave])

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
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
          placeholder={`Поиск комикса`}
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

  const handleDelete = async (record) => {
    const newData = data.filter((item) => item._id !== record._id);
    await axios.delete(`${process.env.REACT_APP_API_URL}/purpose/delete/${record._id}`)
    setData(newData);
  };

  const add = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const edit = (record) => {
    form.setFieldsValue({
      purpose_name: record.purpose_name,
      purpose_count: record.purpose_count,
      purpose_key: record.purpose_key,
      purpose_year: record.purpose_year,
    });
    setEditingKey(record._id);
  };

  const cancel = (_id) => {
    try {
      if (typeof _id === 'number') {
        const newData = data.filter((item) => item._id !== _id);
        setData(newData);
        setEditingKey('');
      }
      else setEditingKey('');
    }
    catch (errInfo) {
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
        typeof _id === 'number' ? await axios.post(`${process.env.REACT_APP_API_URL}/purpose/add`, row)
          : await axios.patch(`${process.env.REACT_APP_API_URL}/purpose/edit/${_id}`, row)
        setCountSave(countSave + 1)
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
      title: 'Название',
      dataIndex: 'purpose_name',
      width: '18%',
      editable: true,
      ...getColumnSearchProps('purpose_name')
    },
    {
      title: 'Категория',
      dataIndex: 'purpose_key',
      width: '9%',
      editable: true,
    },
    {
      title: 'Цель',
      dataIndex: 'purpose_count',
      width: '10%',
      editable: true,
    },
    {
      title: 'Год',
      dataIndex: 'purpose_year',
      width: '5%',
      editable: true,
    },
    {
      title: 'Действия',
      dataIndex: 'operation',
      width: '10%',
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
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
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
        inputType: col.dataIndex === 'purpose_year' ? 'select_year' :
          col.dataIndex === 'purpose_key' ? 'select' :
            'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),

    };
  });

  const handleAdd = async () => {
    setPage(Math.ceil((data.length + 1) / 15))
    const newData = {
      _id: Math.random(),
      purpose_name: '',
      purpose_key: '',
      purpose_count: 0,
      purpose_year: currentYear
    };
    setData([...data, newData])
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
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            },
          }}
          style={{ marginTop: 35, width: 1100 }}
          rowClassName={(record, index) => record.procent_read_chapters === 100 ? 'table-row-light' :
            record.procent_read_chapters >= 1 ? 'table-row-light-to' :
              'table-row-dark'}
        />
      </Form>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginTop: 10,
          backgroundColor: '#5270A7',
        }}
      >
        Добавить цель
      </Button>
    </>

  );
}

export default PurposeTable;