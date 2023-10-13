import React, {useEffect, useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Form, Input, Popconfirm, Table,Space, InputNumber, DatePicker, Select, Typography, Button} from 'antd';
import axios from "axios";
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
  const inputNode = inputType === 'select' ? <Select
  options={[
    {
      value: 'Black Legion',
      label: 'Black Legion',
    },
    {
      value: 'Death Guard',
      label: 'Death Guard',
    },
    {
      value: 'World Eaters',
      label: 'World Eaters',
    },
    {
      value: 'Ultramarine',
      label: 'Ultramarine',
    },
  ]}/> : inputType === 'date' ? 
  <DatePicker  format={dateFormat}/>
  : inputType === 'number' ? <InputNumber min={0} max={record.count_miniatures}/> 
  : inputType === 'number1' ? <InputNumber min={1}/> 
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

const Miniatures = ({filter_json}) => {

  const [countSave, setCountSave] = useState(0);
  useEffect(()  => {
    axios.get(`${process.env.REACT_APP_API_URL}hobby/miniatures/`)
    .then((res) => setData(res.data.miniatures))
  }, [countSave])
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
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
          placeholder={`Поиск миниатюры`}
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
    const deleteBooks = await axios.delete(`${process.env.REACT_APP_API_URL}hobby/miniatures/delete/${record._id}`)
    console.log(deleteBooks)
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
      date_buy_miniature: dayjs.utc(record.date_buy_miniature, dateFormat),
      collection_miniature: record.collection_miniature,
      count_miniatures: record.count_miniatures,
      count_miniatures_color: record.count_miniatures_color,
      miniature_name: record.miniature_name,
      price_miniature: record.price_miniature,
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
        typeof _id === 'number' ?  await axios.post(`${process.env.REACT_APP_API_URL}hobby/miniatures/add`,row) 
        : await axios.patch(`${process.env.REACT_APP_API_URL}hobby/miniatures/edit/${_id}`,row) 
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
      dataIndex: 'miniature_name',
      width: '28%',
      editable: true,
      ...getColumnSearchProps('miniature_name')
    },
    {
      title: 'Дата покупки',
      dataIndex: 'date_buy_miniature',
      width: '15%',
      editable: true,
    },
    {
      title: 'Цена',
      dataIndex: 'price_miniature',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.price_miniature - b.price_miniature,
        multiple: 1,
      },
    },
    {
      title: 'Легион',
      dataIndex: 'collection_miniature',
      width: '13%',
      editable: true,
      filters: filter_json,
      onFilter: (value, record) => record.collection_miniature?.startsWith(value),
      filterSearch: true,
    },
    {
        title: 'В коробке',
        dataIndex: 'count_miniatures',
        width: '9%',
        editable: true,
        sorter: {
          compare: (a, b) => a.count_miniatures - b.count_miniatures,
          multiple: 1,
        },
      },
      {
        title: 'Покрашено',
        dataIndex: 'count_miniatures_color',
        width: '6%',
        editable: true,
        sorter: {
          compare: (a, b) => a.count_miniatures_color - b.count_miniatures_color,
          multiple: 1,
        },
      },
    {
      title: 'Процент покрашенных',
      dataIndex: 'procent_miniatures_color',
      width: '9%',
      editable: false,
      sorter: {
        compare: (a, b) => a.procent_miniatures_color - b.procent_miniatures_color,
        multiple: 1,
      },
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
        inputType: col.dataIndex === 'collection_miniature' ? 'select' : 
        col.dataIndex === 'date_buy_miniature' ? 'date' : 
        col.dataIndex === 'count_miniatures_color' ? 'number' :
        col.dataIndex === 'count_miniatures' ? 'number1' :
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
      miniature_name: 'miniature_name',
      collection_miniature: 'Black Legion',
      count_miniatures: 1,
      count_miniatures_color: 0
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
          onChange: cancel,
        }}
        style={{marginTop: 35}}
        rowClassName={(record, index) => record.procent_miniatures_color === 100 ? 'table-row-light' :
        record.procent_miniatures_color >= 1 ? 'table-row-light-to' :
         'table-row-dark'}
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
        Добавить миниатюру
      </Button>
    </>
      
  );
}

export default Miniatures;