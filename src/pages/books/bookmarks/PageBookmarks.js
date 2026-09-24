import { useState, useEffect } from 'react';
import { Card, Image, Rate, Button } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import axios from 'axios';

import ModalButtonMarks from '../../../components/Book/ModalButtonMarks';
import CreateBookmarkModal from '../../../components/Book/CreateBookmarkModal';

import "./pageBookmarks.css"


const PageBookmarks = () => {

    const [countSave, setCountSave] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/bookmarks/`)
            .then((res) => setData(res.data.bookmarks))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countSave])

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleCreateBookmark = async (values) => {

        await axios.post(`${process.env.REACT_APP_API_URL}/bookmarks/add`, values)
        setCountSave(countSave + 1)
        setCreateModalOpen(false);
    };

    const handleUpdate = async (updatedBook) => {
        console.log('Обновление:', updatedBook);
        await axios.patch(`${process.env.REACT_APP_API_URL}/bookmarks/edit/${updatedBook._id}`, updatedBook)
        setCountSave(countSave + 1)
    };

    const handleDelete = async (book) => {
        console.log('Удаление:', book._id);
        await axios.delete(`${process.env.REACT_APP_API_URL}/bookmarks/delete/${book._id}`)
        setCountSave(countSave + 1)

    };

    const handleCreateCard = async (book) => {
        console.log('Создать новую карточку:', book);
        await axios.post(`${process.env.REACT_APP_API_URL}/bookmarks/add/filter/`, book)
        setCountSave(countSave + 1)
    };

    const handleAddToNovels = async (book) => {
        console.log('Добавить в романы:', book);

        await axios.post(`${process.env.REACT_APP_API_URL}/bookmarks/add/romans/`, book)
        setCountSave(countSave + 1)
    };

    return (
        <div className="bookmarks">
            <div className="bookmarks_header">

                <div className="bookmarks_count">
                    Всего записей: <strong>{data.length}</strong>
                </div>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setCreateModalOpen(true)}
                >
                    Добавить закладку
                </Button>

            </div>
            <div className="bookmarks_cards">
                {
                    data.map(arr =>
                        <div className="card_bookmarks">
                            <Card
                                hoverable
                                cover={
                                    <Image
                                        width={205}
                                        height={275}
                                        alt="basic"
                                        src={arr.image}
                                    />
                                }
                            >
                                <Card.Meta title={
                                    <div className="card_bookmarks_title">
                                        <div className="card_bookmarks_author">{arr.author}</div>
                                        <div className="card_bookmarks_cycle">{arr.cycle}</div>
                                        <Rate allowHalf disabled value={arr.rating} />
                                    </div>
                                } />
                                <ModalButtonMarks book={arr}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                    onCreateCard={handleCreateCard}
                                    onAddToNovels={handleAddToNovels} />
                            </Card>
                        </div>

                    )
                }
            </div>
            <CreateBookmarkModal
                open={createModalOpen}
                onCancel={() => setCreateModalOpen(false)}
                onCreate={handleCreateBookmark}
            />
        </div>
    )
}

export default PageBookmarks