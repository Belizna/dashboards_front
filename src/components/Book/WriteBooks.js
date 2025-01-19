import React, {useEffect, useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Form, Input,FloatButton, Popconfirm, Table,Space, Select, Typography, Button} from 'antd';
import axios from "axios";

import './books.css'

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
      value: 'Не Прочитано',
      label: 'Не Прочитано',
    },
    {
      value: 'Прочитано',
      label: 'Прочитано',
    },
  ]}/> : inputType === 'select_format' ? <Select
  options={[
    {
      value: 'роман',
      label: 'роман',
    },
    {
      value: 'повесть',
      label: 'повесть',
    },
    {
      value: 'рассказ',
      label: 'рассказ',
    },
  ]}/>
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
              required: false,
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

const WriteBooks = ({name_book}) => {
  const [countSave, setCountSave] = useState(0);
  useEffect(()  => {
    axios.get(`${process.env.REACT_APP_API_URL}/books/write_books/${name_book}`)
    .then((res) => [setData(res.data.write_books), setDataFilter(res.data.filter)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countSave, name_book])
  
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [filter, setDataFilter] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
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
          placeholder={`Поиск книги`}
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
    await axios.delete(`${process.env.REACT_APP_API_URL}/books/write_books/delete/${record._id}`)
    setData(newData);
  };

  const edit = (record) => {
    form.setFieldsValue({
      date_earlyPayment: '',
      summ_earlyPayment: '',
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
      const index = newData.findIndex((item) => _id === item._id );
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        typeof _id === 'number' ?  await axios.post(`${process.env.REACT_APP_API_URL}/books/write_books/add/${name_book}`,row) 
        : await axios.patch(`${process.env.REACT_APP_API_URL}/books/write_books/edit/${_id}`,row) 
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
      title: 'Наименование',
      dataIndex: 'book_name',
      width: '25%',
      editable: true,
      ...getColumnSearchProps('book_name')
    },
    {
        title: 'Формат',
        dataIndex: 'format',
        width: '10%',
        editable: true,
        filters:[
          {
            text: 'Роман',
            value: 'роман'
          },
          {
            text: 'Повесть',
            value: 'повесть'
          },
          {
            text: 'Рассказ',
            value: 'рассказ'
          }
        ],
        onFilter: (value, record) => record.format.startsWith(value)
      },
    {
      title: 'Сборник',
      dataIndex: 'collection_book',
      width: '25%',
      editable: true,
      require: false,
      filters: filter,
      onFilter: (value, record) => record.collection_book?.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Автор',
      dataIndex: 'author',
      width: '15%',
      editable: true,
      ...getColumnSearchProps('author')
    },
    {
      title: 'Статус',
      dataIndex: 'presence',
      width: '13%',
      editable: true,
      defaultFilteredValue : ['Не Прочитано'], 
      filters:[
        {
          text: 'Прочитано',
          value: 'Прочитано'
        },
        {
          text: 'Не Прочитано',
          value: 'Не Прочитано'
        },
      ],
      onFilter: (value, record) => record.presence.startsWith(value)
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
        inputType: col.dataIndex === 'presence' ? 'select' :
        col.dataIndex === 'format' ? 'select_format' :
        'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = async () => {
    setPage(Math.ceil((data.length + 1)/15))
    const newData = {
      _id: Math.random(),
      book_name: '',
      format: 'рассказ',
      presence: 'Не Прочитано',
      author: ''
    };
    setData([...data, newData])
    edit(newData)
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
        style={{marginTop: 35}}
        rowClassName={(record, index) => record.presence === 'Прочитано'  ? 'table-row-light' : 'table-row-dark'}
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
        Добавить книгу
      </Button>
      <FloatButton.BackTop />
    </>
      
  );
}

export default WriteBooks;