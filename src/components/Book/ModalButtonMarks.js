import { useState } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    Rate,
    Tooltip
} from 'antd';

import {
    CheckOutlined,
    CloseOutlined,
    EditOutlined
} from '@ant-design/icons';

import './books.css';

const ModalButtonMarks = ({ book, onUpdate, onDelete, onCreateCard, onAddToNovels }) => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [readModalOpen, setReadModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [form] = Form.useForm();

    const handleEditOpen = () => {
        form.setFieldsValue({
            author: book.author,
            cycle: book.cycle,
            rating: book.rating,
            image: book.image
        });

        setEditModalOpen(true);
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();

            onUpdate?.({
                ...book,
                ...values
            });

            setEditModalOpen(false);
        } catch (error) {
            console.log('Ошибка валидации:', error);
        }
    };

    const handleCreateCard = () => {
        setReadModalOpen(false);

        onCreateCard?.(book);
    };

    const handleAddToNovels = () => {
        setReadModalOpen(false);

        onAddToNovels?.(book);
    };

    const handleDelete = () => {
        setDeleteModalOpen(false);

        onDelete?.(book);
    };

    return (
        <>
            <div className="card_bookmarks_actions">
                <Tooltip title="Покупаю">
                    <Button
                        type="text"
                        icon={<CheckOutlined />}
                        className="mac-button mac-green"
                        onClick={() => setReadModalOpen(true)}
                    />
                </Tooltip>
                <Tooltip title="Удалить">
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        className="mac-button mac-red"
                        onClick={() => setDeleteModalOpen(true)}
                    />
                </Tooltip>
                <Tooltip title="Редактировать">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="mac-button mac-yellow"
                        onClick={handleEditOpen}
                    />
                </Tooltip>
            </div>

            <Modal
                title="Редактирование"
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                onOk={handleEditSave}
                okText="Сохранить"
                cancelText="Отмена"
                width={700}
                centered
            >
                <div className="edit-book-modal">
                    <div className="edit-book-cover">
                        <img
                            src={book.image}
                            alt={book.author}
                        />
                    </div>
                    <div className="edit-book-form">
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Автор"
                                name="author"
                            >
                                <Input placeholder="Например: Адриан Чайковски" />
                            </Form.Item>
                            <Form.Item
                                label="Цикл"
                                name="cycle"
                            >
                                <Input placeholder="Например: Дети времени" />
                            </Form.Item>
                            <Form.Item
                                label="Ссылка"
                                name="image"
                            >
                                <Input placeholder="Например: https://fantlab.ru/images/editions/orig/215264?r=1580300812" />
                            </Form.Item>
                            <Form.Item
                                label="Оценка"
                                name="rating"
                            >
                                <Rate allowHalf />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Modal>

            <Modal
                title="Что сделать с этой закладкой?"
                open={readModalOpen}
                onCancel={() => setReadModalOpen(false)}
                footer={null}
                centered
            >

                <div className="read-modal">
                    <Button
                        type="primary"
                        block
                        onClick={handleCreateCard}
                    >
                        Создать новую карточку
                    </Button>

                    <Button
                        type="primary"
                        block
                        onClick={handleAddToNovels}
                    >
                        Добавить в цикл Романы
                    </Button>

                </div>

            </Modal>

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
                    Вы действительно хотите удалить эту карточку?
                </p>

                <p className="delete-warning">
                    Это действие нельзя будет отменить.
                </p>

            </Modal>

        </>
    );
};

export default ModalButtonMarks;