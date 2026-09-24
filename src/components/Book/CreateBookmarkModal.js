import React from 'react';

import {
    Modal,
    Form,
    Input,
    Rate
} from 'antd';


const CreateBookmarkModal = ({
    open,
    onCancel,
    onCreate
}) => {

    const [form] = Form.useForm();


    const handleCreate = async () => {

        try {

            const values = await form.validateFields();

            onCreate(values);

            form.resetFields();

        } catch (error) {

            console.log('Ошибка:', error);

        }

    };


    return (
        <Modal
            title="Добавление закладки"
            open={open}
            onCancel={onCancel}
            onOk={handleCreate}
            okText="Создать"
            cancelText="Отмена"
            width={700}
            centered
        >

            <div className="create-book-modal">

                <div className="create-book-form">

                    <Form
                        form={form}
                        layout="vertical"
                    >

                        <Form.Item
                            label="Автор"
                            name="author"
                        >
                            <Input
                                placeholder="Например: Адриан Чайковски"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Цикл"
                            name="cycle"
                        >
                            <Input
                                placeholder="Например: Дети времени"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Оценка"
                            name="rating"
                            initialValue={0}
                        >
                            <Rate allowHalf />
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
    );
};


export default CreateBookmarkModal;