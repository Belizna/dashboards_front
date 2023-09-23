import React, {useEffect, useState} from "react";
import { Form, Input, Popconfirm, Table, Typography, Button} from 'antd';
import axios from "axios";
import moment from "moment"

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
          <Input/>
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EarlyPayments = () => {
  const [countSave, setCountSave] = useState(0);
  useEffect(()  => {
    axios.get(`${process.env.REACT_APP_API_URL}credit/early_payment/`)
    .then((res) => setData(res.data.early_payment))
  }, [countSave])
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  const handleDelete = async (record) => {
    const newData = data.filter((item) => item._id !== record._id);
    const deleteEarlyPay = await axios.delete(`${process.env.REACT_APP_API_URL}credit/early_payment/${record._id}`)
    console.log(deleteEarlyPay)
    setData(newData);
  };

  const edit = (record) => {
    form.setFieldsValue({
      _id: '',
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
        typeof _id === 'number' ? await axios.post(`${process.env.REACT_APP_API_URL}credit/early_payment/`,row) 
        : await axios.patch(`${process.env.REACT_APP_API_URL}credit/early_payment/${_id}`,row) 
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
      title: 'Дата платежа',
      dataIndex: 'date_earlyPayment',
      width: '25%',
      editable: true,
    },
    {
      title: 'Сумма платежа',
      dataIndex: 'summ_earlyPayment',
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
        inputType: col.dataIndex === 'date_earlyPayment' ? 'date' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = async () => {
    const newData = {
      _id: Math.random(),
      date_earlyPayment: moment().format('DD-MM-YYYY'),
      summ_earlyPayment: 10,
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
        rowClassName={'table-row-dark'}
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
        Добавить платеж
      </Button>
    </>
      
  );
}

export default EarlyPayments;

