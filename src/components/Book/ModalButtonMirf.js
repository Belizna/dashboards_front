import React, { useState } from 'react';

import {
    Button,
    Modal,
    Form,
    Input,
    AutoComplete,
    Select,
    Tooltip
} from 'antd';

import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';

import './books.css';


const ModalButtonMirf = ({
    book,
    item,
    category,
    authors,
    onUpdate,
    onDelete
}) => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [form] = Form.useForm();


    // ========================================
    // Авторы
    // ========================================

    const options = authors.map(author => ({
        value: author.author,
        label: author.author,
        author: author
    }));


    // ========================================
    // Открытие редактирования
    // ========================================

    const handleEditOpen = () => {

        form.setFieldsValue({
            book_name: book.name,
            author: book.author,
            compilation: item.compilation,
            category: category.category,
            is_presence: book.history.is_presence,
            is_read: book.history.is_read,
            image: book.history.image,
        });

        setEditModalOpen(true);
    };


    // ========================================
    // Сохранение
    // ========================================

    const handleEditSave = async () => {

        try {

            const values = await form.validateFields();

            onUpdate?.({
                ...book,
                ...values
            });

            setEditModalOpen(false);

        } catch (error) {

            console.log('Ошибка:', error);

        }
    };


    // ========================================
    // Удаление
    // ========================================

    const handleDelete = () => {

        setDeleteModalOpen(false);

        onDelete?.(book);
    };


    return (
        <>
            {/* ========================================
                КНОПКИ
            ======================================== */}

            <div className="card_bookmarks_actions">

                <Tooltip title="Редактировать">

                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="mac-button mac-yellow"
                        onClick={handleEditOpen}
                    />

                </Tooltip>


                <Tooltip title="Удалить">

                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="mac-button mac-red"
                        onClick={() => setDeleteModalOpen(true)}
                    />

                </Tooltip>

            </div>


            {/* ========================================
                РЕДАКТИРОВАНИЕ
            ======================================== */}

            <Modal
                title="Редактирование карточки"
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                onOk={handleEditSave}
                okText="Сохранить"
                cancelText="Отмена"
                width={700}
                centered
            >

                <div className="edit-book-modal">

                    {/* ========================================
                        КАРТИНКА
                    ======================================== */}

                    <div className="edit-book-cover">

                        <img
                            src={
                                book.image ||
                                'https://i.postimg.cc/5YXX8NKY/seryj-fon.png'
                            }
                            alt={book.book_name}
                        />

                    </div>


                    {/* ========================================
                        ФОРМА
                    ======================================== */}

                    <div className="edit-book-form">

                        <Form
                            form={form}
                            layout="vertical"
                        >

                            <Form.Item
                                label="Карточка"
                                name="book_name"
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                label="Автор"
                                name="author"
                            >
                                <AutoComplete
                                    options={options}
                                    placeholder="Введите ФИО автора"
                                    filterOption={(
                                        inputValue,
                                        option
                                    ) =>
                                        option.value
                                            .toLowerCase()
                                            .includes(
                                                inputValue.toLowerCase()
                                            )
                                    }
                                />
                            </Form.Item>


                            <Form.Item
                                label="Раздел"
                                name="compilation"
                            >
                                <Select
                                    options={[
                                        {
                                            label: '116 главных фантастических книг',
                                            value: '116 главных фантастических книг'
                                        },
                                        {
                                            label: 'Главные фантастические книги XXI века',
                                            value: 'Главные фантастические книги XXI века'
                                        },
                                        {
                                            label: 'Фантлаб',
                                            value: 'Фантлаб'
                                        },
                                        {
                                            label: 'Кинг. Книжная полка',
                                            value: 'Кинг. Книжная полка'
                                        },
                                        {
                                            label: 'Хьюго',
                                            value: 'Хьюго'
                                        }
                                    ]}
                                />
                            </Form.Item>


                            <Form.Item
                                label="Категория"
                                name="category"
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                label="Статус покупки"
                                name="is_presence"
                            >
                                <Select
                                    options={[
                                        {
                                            label: 'Куплено',
                                            value: 'Куплено'
                                        },
                                        {
                                            label: 'Не куплено',
                                            value: 'Не куплено'
                                        }
                                    ]}
                                />
                            </Form.Item>


                            <Form.Item
                                label="Статус прочтения"
                                name="is_read"
                            >
                                <Select
                                    options={[
                                        {
                                            label: 'Прочитано',
                                            value: 'Прочитано'
                                        },
                                        {
                                            label: 'Не прочитано',
                                            value: 'Не прочитано'
                                        }
                                    ]}
                                />
                            </Form.Item>


                            <Form.Item
                                label="Ссылка на обложку"
                                name="image"
                            >
                                <Input
                                    placeholder="https://..."
                                />
                            </Form.Item>

                        </Form>

                    </div>

                </div>

            </Modal>


            {/* ========================================
                УДАЛЕНИЕ
            ======================================== */}

            <Modal
                title="Удаление карточки"
                open={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onOk={handleDelete}
                okText="Удалить"
                cancelText="Отмена"
                okButtonProps={{
                    danger: true
                }}
                centered
            >

                <p>
                    Вы действительно хотите удалить карточку
                    <strong>
                        {' '}{book.book_name}
                    </strong>
                    ?
                </p>

                <p className="delete-warning">
                    Это действие нельзя будет отменить.
                </p>

            </Modal>

        </>
    );
};


export default ModalButtonMirf;