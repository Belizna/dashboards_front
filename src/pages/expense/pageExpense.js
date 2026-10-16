import { useEffect, useState, useRef } from "react";
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Form, Input, Spin, Popconfirm, Table, Space, Select, Tabs, Card, Typography, Button, DatePicker } from 'antd';
import axios from "axios";
import PurposeStat from "../../components/Purpose/PurposeStat";
import dayjs from 'dayjs';

const { TabPane } = Tabs

const dateFormat = 'DD-MM-YYYY';

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
    const inputNode =
        inputType === 'select' ?
            <Select
                options={[
                    { value: 'Ипотека', label: 'Ипотека' },
                    { value: 'Книги', label: 'Книги' },
                    { value: 'Продукты', label: 'Продукты' },
                    { value: 'Аптека', label: 'Аптека' },
                    { value: 'Игры', label: 'Игры' },
                    {
                        value: 'Переводы. Общий бюджет',
                        label: 'Переводы. Общий бюджет',
                    },
                    {
                        value: 'Переводы. Отпуск',
                        label: 'Переводы. Отпуск',
                    },
                    { value: 'Хобби', label: 'Хобби' },
                    {
                        value: 'Интернет и подписки',
                        label: 'Интернет и подписки',
                    },
                    { value: 'Прочее', label: 'Прочее' },
                ]}
            />
            : inputType === 'date' ?
                <DatePicker
                    format={dateFormat}
                    style={{ width: '100%' }}
                />
                : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
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

const PageExpense = () => {

    const [countSave, setCountSave] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/expense/`)
            .then((res) => [setData(res.data.expense)])
    }, [countSave])

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    // eslint-disable-next-line
    const [dataStatic, setDataStatistic] = useState([]);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/expense/delete/${record._id}`)
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
            ...record,
            date: record.date ? dayjs(record.date) : null,
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

            const payload = {
                ...row,
                date: row.date ? row.date.toISOString() : null,
            };

            const newData = [...data];
            const index = newData.findIndex((item) => _id === item._id);

            if (index > -1) {
                const item = newData[index];

                newData.splice(index, 1, {
                    ...item,
                    ...payload,
                });

                setData(newData);
                setEditingKey('');

                if (typeof _id === 'number') {
                    await axios.post(
                        `${process.env.REACT_APP_API_URL}/expense/add`,
                        payload
                    );
                } else {
                    await axios.patch(
                        `${process.env.REACT_APP_API_URL}/expense/edit/${_id}`,
                        payload
                    );
                }

                setCountSave((prev) => prev + 1);
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Дата',
            dataIndex: 'date',
            width: '10%',
            editable: true,
            render: (date) =>
                date ? dayjs(date).format('DD-MM-YYYY') : '',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            width: '12%',
            editable: true,
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            width: '8%',
            editable: true,
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            width: '18%',
            editable: true,
            ...getColumnSearchProps('comment')
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
                inputType: col.dataIndex === 'date' ? 'date' :
                    col.dataIndex === 'category' ? 'select' :
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
            date: '',
            category: '',
            amount: 0,
            comment: ''
        };
        setData([...data, newData])
        add(newData)
    };

    return (
        <>
            {data === 0 ? <><div className="loader">
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
                    <TabPane tab="Цели" key="1">
                        <div className="pageEarlyPayments">
                            <div className="tableMiniature">
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
                                            style={{ marginTop: 35, width: 1100 }}
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
                                            backgroundColor: '#5270A7',
                                        }}
                                    >
                                        Добавить цель
                                    </Button>
                                </>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Статистика" key="2">
                        <div className="purpose_stat_year">
                            {dataStatic && dataStatic.map((arr) =>
                                <div>
                                    <Card title={arr.year}>
                                        <div className="purpose_stat_year_card">
                                            {
                                                arr.goals.map((ar) => <>
                                                    <PurposeStat purposeStatistic={ar} />
                                                    <br />
                                                </>
                                                )}
                                        </div>
                                    </Card>
                                    <br />
                                </div>
                            )}
                        </div>
                    </TabPane>
                </Tabs>
            }
        </>
    )
}

export default PageExpense;