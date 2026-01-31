import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Image, Spin, Input, Typography, Popconfirm, Space, Select, Card, Tabs, Button, Table } from 'antd';
import axios from "axios";

import './scratch.css'
const { TabPane } = Tabs
const { Meta } = Card;

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
  const inputNode = inputType === 'select_status' ? <Select
    options={[
      {
        value: 'Выполнено',
        label: 'Выполнено',
      },
      {
        value: 'Не выполнено',
        label: 'Не выполнено',
      }
    ]} />
    : inputType === 'select' ? <Select
      options={[
        {
          value: 'Книги',
          label: 'Книги',
        },
        {
          value: 'Игры',
          label: 'Игры',
        },
        {
          value: 'Дорамы',
          label: 'Дорамы',
        },
        {
          value: 'Фильмы',
          label: 'Фильмы',
        },
        {
          value: 'Сериалы',
          label: 'Сериалы',
        },
        {
          value: 'Аниме',
          label: 'Аниме',
        }
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


const PageScratch = () => {

  const [countSave, setCountSave] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/scratch`)
      .then((res) => [setData(res.data.scratch), setDataScratch(res.data.scratch_poster)])
  }, [countSave])

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [dataScratch, setDataScratch] = useState(0);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchText, setSearchText] = useState('');
  const [isEdit, setIsEdit] = useState(false);
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
          placeholder={`Поиск`}
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
    await axios.delete(`${process.env.REACT_APP_API_URL}/scratch/delete/${record._id}`)
    setData(newData);
    setIsEdit(false)
  };

  const add = (record) => {
    setIsEdit(true)
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const edit = (record) => {
    setIsEdit(true)
    form.setFieldsValue({
      name: record.name,
      status: record.status,
      category: record.category,
      image_key: record.image_key,
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
    setIsEdit(false)
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
        typeof _id === 'number' ? await axios.post(`${process.env.REACT_APP_API_URL}/scratch/add`, row)
          : await axios.patch(`${process.env.REACT_APP_API_URL}/scratch/edit/${_id}`, row)
        setCountSave(countSave + 1)
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
    setIsEdit(false)
  };
  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      width: '10%',
      editable: true,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: '4%',
      editable: true,
      filters: [
        {
          text: 'Выполнено',
          value: 'Выполнено',
        },
        {
          text: 'Не выполнено',
          value: 'Не выполнено',
        }
      ],
      onFilter: (value, record) => record.status.includes(value)
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      width: '4%',
      editable: true,
      filters: [
        {
          text: 'Книги',
          value: 'Книги',
        },
        {
          text: 'Игры',
          value: 'Игры',
        },
        {
          text: 'Дорамы',
          value: 'Дорамы',
        },
        {
          text: 'Фильмы',
          value: 'Фильмы',
        },
        {
          text: 'Сериалы',
          value: 'Сериалы',
        },
        {
          text: 'Аниме',
          value: 'Аниме',
        }
      ],
      onFilter: (value, record) => record.category.includes(value),
    },
    isEdit && {
      title: 'Изображение',
      dataIndex: 'image_key',
      width: '10%',
      editable: true,
    },
    {
      title: 'Действия',
      dataIndex: 'operation',
      width: '5%',
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
  ].filter(Boolean);
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'category' ? 'select' :
          col.dataIndex === 'status' ? 'select_status' :
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
      name: '',
      status: 'Не выполнено',
      category: '',
      image_key: '',
    };
    setData([...data, newData])
    add(newData)
  };

  return (
    <>
      {dataScratch === 0 ? <><div className="loader">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 80,
              }}
              spin
            />
          }
        />
      </div></> :
        <Tabs defaultActiveKey="1">
          <TabPane tab="Постер" key="1">
            <Tabs defaultActiveKey="1">
              {
                dataScratch.map(arr => (

                  <TabPane tab={arr.category} key={arr.key} >
                    <div className="footerScratch">
                      <Typography.Text strong>
                        Выполнено {arr.done}/{arr.count}
                      </Typography.Text>
                    </div>
                    <div className="poster">
                      {
                        arr.card.map(arrcard => (
                          <div className="card_poster">
                            <Card
                              hoverable
                              cover={
                                <Image
                                  width={205}
                                  height={275}
                                  alt="basic"
                                  src={arrcard.image_key}
                                />
                              }
                            >
                              <Meta title={<div style={{
                                textAlign: 'center', whiteSpace: 'normal',
                                wordBreak: 'break-word', height: 47
                              }}>{arrcard.name}</div>} />
                            </Card>
                          </div>
                        ))
                      }
                    </div>
                  </TabPane>
                ))
              }
            </Tabs>
          </TabPane>
          <TabPane tab="Таблица" key="3">
            <>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  key={isEdit}
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
                  rowClassName={(record, index) => record.status === 'Выполнено' ? 'table-row-light' :

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
                Добавить скретч
              </Button>
            </>
          </TabPane>
        </Tabs>
      }
    </>
  )
}
export default PageScratch;