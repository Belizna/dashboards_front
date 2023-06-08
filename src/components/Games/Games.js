import React, {useEffect, useState} from "react";
import { Form, Input, Popconfirm, Table, Typography, Button} from 'antd';
import axios from "axios";

import './games.css'

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
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Games = () => {
  useEffect(()  => {
    axios.get(`${process.env.REACT_APP_API_URL}games/library/`)
    .then((res) => setData(res.data.libraryGames))
  }, [])
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;

  const handleDelete = async (record) => {
    const newData = data.filter((item) => item._id !== record._id);
    const deleteGames = await axios.delete(`${process.env.REACT_APP_API_URL}games/library/delete/${record._id}`)
    console.log(deleteGames)
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

  const cancel = () => {
    setEditingKey('');
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
        typeof _id === 'number' ?  await axios.post(`${process.env.REACT_APP_API_URL}games/library/add/`,row) 
        : await axios.patch(`${process.env.REACT_APP_API_URL}games/library/edit/${_id}`,row) 
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
      dataIndex: 'game_name',
      width: '27%',
      editable: true,
    },
    {
      title: 'Сумма игры',
      dataIndex: 'summ_game',
      width: '12%',
      editable: true,
    },
    {
      title: 'Площадка',
      dataIndex: 'compilation',
      width: '15%',
      editable: true,
    },
    {
      title: 'Дата покупки',
      dataIndex: 'date_game',
      width: '15%',
      editable: true,
    },
    {
      title: 'Статус',
      dataIndex: 'presence',
      width: '15%',
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
            <Popconfirm title="Отменить редактирование?" onConfirm={cancel}>
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = async () => {
    const newData = {
      _id: Math.random(),
      game_name: 'game_name',
      summ_game: 0,
      presence: 'Не Пройдено'
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
          onChange: cancel,
        }}
        style={{marginTop: 35}}
        rowClassName={(record, index) => record.presence === 'Пройдено'  ? 'table-row-light' : 'table-row-dark'}
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
        Добавить игру
      </Button>
    </>
      
  );
}

export default Games;