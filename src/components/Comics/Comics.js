import React, {useEffect, useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Form, Input, Popconfirm, Table,Space, InputNumber, Typography, Button} from 'antd';
import axios from "axios";

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
  const inputNode = inputType === 'number' ? <InputNumber min={0} max={record.count_chapters}/> 
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

const Comics = ({comics_collect}) => {

  const [countSave, setCountSave] = useState(0);
  useEffect(()  => {
    axios.get(`${process.env.REACT_APP_API_URL}/comics/${comics_collect}`)
    .then((res) => setData(res.data.comics))
  }, [countSave, comics_collect])
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
    await axios.delete(`${process.env.REACT_APP_API_URL}/comics/delete/${record._id}`)
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
      name_comics: record.name_comics,
      count_chapters: record.count_chapters,
      count_read_chapters: record.count_read_chapters,
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
        row["collection_comics"] = comics_collect
        console.log(row)
        typeof _id === 'number' ?  await axios.post(`${process.env.REACT_APP_API_URL}/comics/add`,row) 
        : await axios.patch(`${process.env.REACT_APP_API_URL}/comics/edit/${_id}`,row) 
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
      dataIndex: 'name_comics',
      width: '28%',
      editable: true,
      ...getColumnSearchProps('name_comics')
    },
    {
        title: 'Количество глав',
        dataIndex: 'count_chapters',
        width: '9%',
        editable: true,
        sorter: {
          compare: (a, b) => a.count_chapters - b.count_chapters,
          multiple: 1,
        },
      },
      {
        title: 'Прочитано',
        dataIndex: 'count_read_chapters',
        width: '6%',
        editable: true,
        sorter: {
          compare: (a, b) => a.count_read_chapters - b.count_read_chapters,
          multiple: 1,
        },
      },
    {
      title: 'Процент завершения',
      dataIndex: 'procent_read_chapters',
      width: '9%',
      editable: false,
      sorter: {
        compare: (a, b) => a.procent_read_chapters - b.procent_read_chapters,
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
        inputType: col.dataIndex === 'count_read_chapters' ? 'number' :
        col.dataIndex === 'count_chapters' ? 'number1' :
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
      name_comics: '',
      collection_comics: comics_collect,
      count_chapters: 1,
      count_read_chapters: 0
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
        style={{marginTop: 35, width: 1100}}
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
          backgroundColor:'#5270A7',
        }}
      >
        Добавить комикс
      </Button>
    </>
      
  );
}

export default Comics;