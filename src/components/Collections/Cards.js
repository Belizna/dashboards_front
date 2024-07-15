import React, { useEffect, useState, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Form, FloatButton, Input, Popconfirm, Table, Space, Select, Typography, Button, Modal } from 'antd';
import axios from "axios";
import PageCardsImage from "../../pages/collections/PageCardsImage";

const Cards = ({ collection_card, option, filter }) => {
  const [countSave, setCountSave] = useState(0);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/collection/card/${collection_card}`)
      .then((res) => setData(res.data.card))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countSave, collection_card])

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(option[0].value);
  const [filterLevel, setFilterLevel] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [card, setCard] = useState([])
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    var cardList = []
    console.log(filterStatus)
    if (filterLevel === '' && filterStatus === '') {
      cardList = data
    }
    else if (filterLevel !== '' && filterStatus === '') {
      data.map(obj => obj.level_card === filterLevel ? cardList.push(obj) : '')
    }
    else if (filterLevel === '' && filterStatus !== '') {
      data.map(obj => obj.status_card === filterStatus ? cardList.push(obj) : '')
    }
    else {
      data.map(obj => obj.status_card === filterStatus && obj.level_card === filterLevel ? cardList.push(obj) : '')
    }
    setCard(cardList)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleResetFilter = () => {
    setFilterLevel('')
    setFilterStatus('')
  }

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
          value: 'Есть',
          label: 'Есть',
        },
        {
          value: 'Нет',
          label: 'Нет',
        },
        {
          value: 'Замена',
          label: 'Замена',
        }
      ]} /> : inputType === 'select_level' ? <Select
        options={option} /> : <Input />;
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
          placeholder={`Поиск карточки`}
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
    onFilter: (value, record) => {
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    },
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
    await axios.delete(`${process.env.REACT_APP_API_URL}/collection/card/delete/${record._id}`)
    setData(newData);
  };

  const edit = (record) => {
    form.setFieldsValue({
      name_card: record.name_card,
      level_card: record.level_card,
      collection_card: record.collection_card,
      status_card: record.status_card,
      number_card: record.number_card,
      summ_card: record.summ_card
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
        typeof _id === 'number' ? await axios.post(`${process.env.REACT_APP_API_URL}/collection/card/add/${collection_card}`, row)
          : await axios.patch(`${process.env.REACT_APP_API_URL}/collection/card/edit/${_id}`, row)
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
      title: 'Номер',
      dataIndex: 'number_card',
      width: '5%',
      editable: true,
      ...getColumnSearchProps('number_card')
    },
    {
      title: 'Наименование',
      dataIndex: 'name_card',
      width: '27%',
      editable: true,
      ...getColumnSearchProps('name_card')
    },
    {
      title: 'Тип',
      dataIndex: 'level_card',
      width: '10%',
      editable: true,
      filters: filter,
      onFilter: (value, record) => {
        setFilters(value)
        setFilterLevel(value)
        return record.level_card.startsWith(value);
      }
    },
    {
      title: 'Коллекция',
      dataIndex: 'collection_card',
      width: '20%',
      editable: false,
    },
    {
      title: 'Наличие',
      dataIndex: 'status_card',
      width: '13%',
      editable: true,
      filters: [
        {
          text: 'Есть',
          value: 'Есть'
        },
        {
          text: 'Нет',
          value: 'Нет'
        },
        {
          text: 'Замена',
          value: 'Замена'
        }
      ],
      onFilter: (value, record) => {
        setFilterStatus(value)
        return record.status_card.startsWith(value);
      }
    },
    {
      title: 'Цена',
      dataIndex: 'summ_card',
      width: '10%',
      editable: true,
      sorter: {
        compare: (a, b) => a.summ_card - b.summ_card,
        multiple: 1,
      },
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
        inputType: col.dataIndex === 'status_card' ? 'select_status' :
          col.dataIndex === 'level_card' ? 'select_level' :
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
      number_card: data[data.length - 1]?.number_card + 1,
      status_card: 'Нет',
      level_card: filters,
      collection_card: collection_card,
      summ_card: 0
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
          style={{ marginTop: 35 }}
          rowClassName={(record, index) => record.status_card === 'Есть' ? 'table-row-light' :
            record.status_card === 'Замена' ? 'table-row-light-to' : 'table-row-dark'}
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
        Добавить карточку
      </Button>
      <Button onClick={showModal} type="primary"
        style={{
          marginLeft: 10,
          marginTop: 10,
          backgroundColor: '#5270A7',
        }}>Посмотреть коллекцию</Button>

      <Button onClick={handleResetFilter} type="primary"
        style={{
          marginLeft: 10,
          marginTop: 10,
          backgroundColor: '#5270A7',
        }}>Сбросить фильтр</Button>

      <Modal zIndex={100} centered={true} width={1300} title={collection_card} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <PageCardsImage collection_card={collection_card} card={card} />
      </Modal>

      <FloatButton.BackTop />
    </>

  );
}

export default Cards;