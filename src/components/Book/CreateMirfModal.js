import {
    Modal,
    Form,
    Input,
    AutoComplete,
    Select
} from 'antd';


const CreateMirfModal = ({
    open,
    onCancel,
    onCreate,
    authors
}) => {

    const [form] = Form.useForm();

    const options = authors.map(author => ({
        value: author.author,
        label: author.author,
        author: author
    }));

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
            title="Добавление карточки"
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
                                filterOption={(inputValue, option) =>
                                    option.value
                                        .toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            label="Раздел"
                            name="compilation"
                        >
                            <Select
                                options={[
                                    { label: '116 главных фантастических книг', value: '116 главных фантастических книг' },
                                    { label: 'Главные фантастические книги XXI века', value: 'Главные фантастические книги XXI века' },
                                    { label: 'Фантлаб', value: 'Фантлаб' },
                                    { label: 'Кинг. Книжная полка', value: 'Кинг. Книжная полка' },
                                    { label: 'Хьюго', value: 'Хьюго' },
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
                                    { label: 'Куплено', value: 'Куплено' },
                                    { label: 'Не куплено', value: 'Не куплено' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Статус прочтения"
                            name="is_read"
                        >
                            <Select
                                options={[
                                    { label: 'Прочитано', value: 'Прочитано' },
                                    { label: 'Не прочитано', value: 'Не прочитано' },
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
    );
};


export default CreateMirfModal;