import React, { useEffect, useState } from "react";
import { Select, Typography, Tabs, Button, Form, Input, Space, Card } from 'antd';
import axios from "axios";
import { G6, MindMap } from '@ant-design/graphs';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

import './pagePersonBooks.css'

const { Title } = Typography;
const { TabPane } = Tabs
const { treeToGraphData } = G6;

const PagePersonBooks = () => {

    const [form] = Form.useForm();
    const [formClass] = Form.useForm();
    const [formPerson] = Form.useForm();

    const [optionsSelector, setOptionsSelector] = useState();
    const [classSelector, setClassSelector] = useState();
    const [personSelector, setPersonSelector] = useState();
    const [person, setPerson] = useState();
    const [ordens, setOrdens] = useState([{ id: 'Необходимо выбрать класс' }]);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/person`)
            .then((res) => [
                setOrdens(res.data.personTree),
                setOptionsSelector(res.data.personSelectorOptions),
                setClassSelector(res.data.personSelectorClass),
                setPersonSelector(res.data.groupPerson),
                setData(treeToGraphData(ordens[0]))])
    }, [])

    const handleChangeNameOrden = (value) => {
        setData(treeToGraphData(ordens[value]))
    }

    const handleChangeClass = (value) => {
        personSelector.map(pers => pers.id === value ? setPerson(pers.person) : pers)
    }

    const options = {
        type: 'boxed',
        autoFit: 'view',
        data,
        transforms: (prev) => [
            ...prev.filter((transform) => transform.type !== 'collapse-expand-react-node'),
            {
                ...prev.find((transform) => transform.type === 'collapse-expand-react-node'),
                enable: true,
            },
        ],
    };

    const onFinish = (values) => {
        axios.post(`${process.env.REACT_APP_API_URL}/person/add/class`, values)
    };

    const onFinishPerson = (values) => {
        axios.post(`${process.env.REACT_APP_API_URL}/person/add/person`, values)
    };

    const onFinishBooks = (values) => {
        axios.post(`${process.env.REACT_APP_API_URL}/person/add/books`, values)
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 4,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 20,
            },
        },
    };

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 20,
                offset: 4,
            },
        },
    };

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Статистика" key="1">
                {data &&
                    <>
                        <div className="tabMain">
                            <div className="tab">
                                <div className="pagePerson">
                                    <div className="pagePersonHeader">
                                        <Title level={5}>Статистика по <Select
                                            showSearch
                                            placeholder="Выбрать класс"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }

                                            onChange={handleChangeNameOrden}
                                            options={optionsSelector}
                                        /></Title>
                                    </div>
                                    <div className="treePerson">
                                        <MindMap {...options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </TabPane>
            <TabPane tab="Админка" key="2">
                <div className="formPerson">
                    <div className="formAddPerson">
                        <div className="formTitle">
                            <Title level={5}>Добавление класса </Title>
                        </div>
                        <div className="formAddInput">
                            <Form
                                name="dynamic_form_item"
                                {...formItemLayoutWithOutLabel}
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 600,
                                }}
                                form={formClass}
                            >
                                <Form.List name="names">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? 'Класс' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "Необходимо добавить класс",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="Название класса"
                                                            style={{
                                                                width: '60%',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 1 ? (
                                                        <CloseOutlined
                                                            style={{
                                                                marginLeft: 5,
                                                            }}
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Добавить класс
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Сохранить
                                    </Button>
                                </Form.Item>
                                <Form.Item noStyle shouldUpdate>
                                    {() => (
                                        <Typography>
                                            <pre>{JSON.stringify(formClass.getFieldsValue(), null, 2)}</pre>
                                        </Typography>
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="formAddPerson2">
                        <div className="formTitle">
                            <Title level={5}>Добавление персонажа </Title>
                        </div>
                        <div className="formAddInput">
                            <Form
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                form={form}
                                name="dynamic_form_complex"
                                style={{
                                    maxWidth: 600,
                                }}
                                autoComplete="off"
                                initialValues={{
                                    items: [{}],
                                }}
                                onFinish={onFinishPerson}
                            >
                                <Form.List name="items">
                                    {(fields, { add, remove }) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                rowGap: 16,
                                                flexDirection: 'column',
                                            }}
                                        >
                                            {fields.map((field) => (
                                                <Card
                                                    size="small"
                                                    title={`Класс ${field.name + 1}`}
                                                    key={field.key}
                                                    extra={
                                                        <CloseOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Form.Item label="Класс" name={[field.name, 'name']}>
                                                        <Select
                                                            showSearch
                                                            placeholder="Выбрать класс"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            options={classSelector}
                                                        />
                                                    </Form.Item>

                                                    {/* Nest Form.List */}
                                                    <Form.Item label="Персонаж">
                                                        <Form.List name={[field.name, 'list']}>
                                                            {(subFields, subOpt) => (
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        rowGap: 16,
                                                                    }}
                                                                >
                                                                    {subFields.map((subField) => (
                                                                        <Space key={subField.key}>
                                                                            <Form.Item noStyle name={[subField.name, 'first']}>
                                                                                <Input placeholder="Имя" />
                                                                            </Form.Item>
                                                                            <Form.Item noStyle name={[subField.name, 'second']}>
                                                                                <Input placeholder="Должность" />
                                                                            </Form.Item>
                                                                            <CloseOutlined
                                                                                className="dynamic-delete-button"
                                                                                onClick={() => {
                                                                                    subOpt.remove(subField.name);
                                                                                }}
                                                                            />
                                                                        </Space>
                                                                    ))}
                                                                    <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                        + Добавить персонажа
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </Form.List>
                                                    </Form.Item>
                                                </Card>
                                            ))}

                                            <Button type="dashed" onClick={() => add()} block>
                                                + Добавить класс
                                            </Button>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Сохранить
                                                </Button>
                                            </Form.Item>
                                            <Form.Item noStyle shouldUpdate>
                                                {() => (
                                                    <Typography>
                                                        <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                                                    </Typography>
                                                )}
                                            </Form.Item>
                                        </div>
                                    )}
                                </Form.List>
                            </Form>
                        </div>

                    </div>
                    <div className="formAddPerson2">
                        <div className="formTitle">
                            <Title level={5}>Добавление произведения </Title>
                        </div>
                        <div className="formAddInput">
                            <Form
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                form={formPerson}
                                name="dynamic_form_person_complex"
                                style={{
                                    maxWidth: 600,
                                }}
                                autoComplete="off"
                                initialValues={{
                                    items: [{}],
                                }}
                                onFinish={onFinishBooks}
                            >
                                <Form.List name="items">
                                    {(fields, { add, remove }) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                rowGap: 16,
                                                flexDirection: 'column',
                                            }}
                                        >
                                            {fields.map((field) => (
                                                <Card
                                                    size="small"
                                                    title={`Персонаж ${field.name + 1}`}
                                                    key={field.key}
                                                    extra={
                                                        <CloseOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Form.Item label="Класс" name={[field.name, 'name']}>
                                                        <Select
                                                            showSearch
                                                            placeholder="Выбрать класс"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            onChange={handleChangeClass}
                                                            options={classSelector}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Персонаж" name={[field.name, 'person']}>
                                                        <Select
                                                            showSearch
                                                            placeholder="Выбрать персонажа"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }

                                                            options={person}
                                                        />
                                                    </Form.Item>
                                                    {/* Nest Form.List */}
                                                    <Form.Item label="Книга">
                                                        <Form.List name={[field.name, 'list']}>
                                                            {(subFields, subOpt) => (
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        rowGap: 16,
                                                                    }}
                                                                >
                                                                    {subFields.map((subField) => (
                                                                        <Space key={subField.key}>
                                                                            <Form.Item noStyle name={[subField.name, 'first']}>
                                                                                <Input placeholder="Название книги" />
                                                                            </Form.Item>
                                                                            <CloseOutlined
                                                                                className="dynamic-delete-button"
                                                                                onClick={() => {
                                                                                    subOpt.remove(subField.name);
                                                                                }}
                                                                            />
                                                                        </Space>
                                                                    ))}
                                                                    <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                        + Добавить книгу
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </Form.List>
                                                    </Form.Item>
                                                </Card>
                                            ))}

                                            <Button type="dashed" onClick={() => add()} block>
                                                + Добавить персонажа
                                            </Button>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Сохранить
                                                </Button>
                                            </Form.Item>
                                            <Form.Item noStyle shouldUpdate>
                                                {() => (
                                                    <Typography>
                                                        <pre>{JSON.stringify(formPerson.getFieldsValue(), null, 2)}</pre>
                                                    </Typography>
                                                )}
                                            </Form.Item>
                                        </div>
                                    )}
                                </Form.List>
                            </Form>
                        </div>

                    </div>
                </div>

            </TabPane>
        </Tabs>
    )
}
export default PagePersonBooks;