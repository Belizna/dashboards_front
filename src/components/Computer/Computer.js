import React, { useEffect, useState } from "react";
import { Form, Input, Popconfirm, DatePicker, Table, Typography, Button, Select, Tabs } from 'antd';
import axios from "axios";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);

const dateFormat = 'DD-MM-YYYY'


const Computer = () => {
  const [countSave, setCountSave] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/computer`)
      .then((res) => [setData(res.data.computer),
      setDataCategory(res.data.category)
      ])
  }, [countSave])

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [category, setDataCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [editingKey, setEditingKey] = useState('');

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
      <DatePicker format={dateFormat} />
      : inputType === 'select_category' ? <Select
        options={category} />
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

  const isEditing = (record) => record._id === editingKey;

  const add = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const handleDelete = async (record) => {
    const newData = data.filter((item) => item._id !== record._id);
    await axios.delete(`${process.env.REACT_APP_API_URL}/computer/${record._id}`)
    setData(newData);
  };

  const edit = (record) => {
    form.setFieldsValue({
      date_buy: dayjs.utc(record.date_buy, dateFormat),
      components_name: record.components_name,
      components_summ: record.components_summ,
      category: record.category,
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
        typeof _id === 'number' ? await axios.post(`${process.env.REACT_APP_API_URL}/computer/add`, row)
          : await axios.patch(`${process.env.REACT_APP_API_URL}/computer/edit/${_id}`, row)
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
      dataIndex: 'components_name',
      width: '35%',
      editable: true,
    },
    {
      title: 'Стоимость',
      dataIndex: 'components_summ',
      width: '8%',
      editable: true,
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      width: '20%',
      editable: true,
    },
    {
      title: 'Дата покупки',
      dataIndex: 'date_buy',
      width: '20%',
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
        inputType: col.dataIndex === 'date_buy' ? 'date' : col.dataIndex === 'category' ? 'select_category' : 'text',
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
      components_name: '',
      category: '',
      components_summ: '',
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
          style={{ marginTop: 35 }}
          rowClassName={'table-row-dark'}
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
        Добавить комплектующие
      </Button>
    </>
  );
}

export default Computer;

