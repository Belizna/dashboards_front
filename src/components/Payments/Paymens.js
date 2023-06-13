import React, {useState, useEffect} from "react";
import { Form, Input, Popconfirm, Table, Typography} from 'antd';
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

const Payments = () => {

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}credit/payments`)
    .then((res) => setData(res.data.payments))
  }, [])


  const handleDelete = async (record) => {
    console.log(record._id)
    const deletePayments = await axios.delete(`${process.env.REACT_APP_API_URL}credit/payments/${record._id}`)
    console.log(deletePayments)
    const newData = data.filter((item) => item._id !== record._id);
    setData(newData);
  };

  const edit = (record) => {
    form.setFieldsValue({
      date_payment: '',
      summ_payment: '',
      status_payment: '',
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
      const index = newData.findIndex((item) => _id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        const patch = await axios.patch(`${process.env.REACT_APP_API_URL}credit/payments/${data[index]._id}`, row)
        console.log(patch)
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
      editable: true,
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
          onChange: cancel,
        }}
        style={{marginTop: 35}}
      />
    </Form>
    </>
  );
}

export default Payments;