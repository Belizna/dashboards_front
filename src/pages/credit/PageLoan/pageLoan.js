import React, {useState, useEffect} from "react";
import { Form, Input,FloatButton, Popconfirm, Table,  Button, Typography} from 'antd';
import axios from 'axios'
import { Area } from '@ant-design/plots';
import './pageLoan.css'

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
  const inputNode =  <Input />;
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

const PageLoan = () => {

  const [countSave, setCountSave] = useState(0);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [summGroup, setSummGroup] = useState(0);
  const [dataHistory, setDataHistory] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record._id === editingKey;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/credit/loan`)
    .then((res) => [setData(res.data.loan), setSummGroup(res.data.summLoans),setDataHistory(res.data.history_loan) ])
  }, [countSave])


  const handleDelete = async (record) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/credit/loan/delete/${record._id}`)
    const newData = data.filter((item) => item._id !== record._id);
    setData(newData);
    setCountSave(countSave+1)
  };

  const add = (record) => {
    form.setFieldsValue({
      summ_loan: '',
      bank: '',
      ...record,
    });
    setEditingKey(record._id);
  };

  const edit = (record) => {
    form.setFieldsValue({
      summ_loan: record.summ_loan,
      bank: record.bank,
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
      const index = newData.findIndex((item) => _id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        typeof _id === 'number' ? await axios.post(`${process.env.REACT_APP_API_URL}/credit/loan/add`,row) 
        : await axios.patch(`${process.env.REACT_APP_API_URL}/credit/loan/edit/${data[index]._id}`, row)
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

  const configArea = {
    data: dataHistory,
    xField: 'date_loan',
    yField: 'summ_loan',
  };

  const columns = [
    {
      title: 'Сумма займа',
      dataIndex: 'summ_loan',
      width: '25%',
      editable: true,
      sorter: {
        compare: (a, b) => a.summ_loan - b.summ_loan,
        multiple: 1,
      },
    },
    {
      title: 'Банк',
      dataIndex: 'bank',
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
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleAdd = async () => {
    const newData = {
      _id: Math.random(),
      summ_loan: 0,
      bank: ''
    };
    setData([newData, ...data])
    add(newData)
  };
  return (
      <>
      <div className="loans">

            <Typography.Title
        level={2}
        style={{
          margin: 0,
        }}
      >
        Общий займ : {summGroup}р.
      </Typography.Title>
      <div className="loansTable">
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
      </div>
    <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginTop: 10,
          backgroundColor:'#5270A7',
          marginLeft: -570
        }}
      >
        Добавить займ
      </Button>
      <FloatButton.BackTop />
      <Area style={{width: 1100, height: 300, marginTop: 100}} {...configArea} />
      </div>
      
    </>
  );
}

export default PageLoan;