import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Image, Spin, Card, Tabs, Button, Progress, Typography } from 'antd';
import axios from "axios";
import {
  PlusOutlined
} from '@ant-design/icons';

import './pageMirf.css'

import CreateMirfModal from "../../../components/Book/CreateMirfModal";
import ModalButtonMirf from "../../../components/Book/ModalButtonMirf";

const { Title } = Typography;

const PageMirf = ({ year }) => {

  const [countSave, setCountSave] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/mirfbook/`)
      .then((res) => [
        setAuthor(res.data.author),
        setData(res.data.mirfMap),
        setDataStatic(res.data.statisticMirf)
      ])
  }, [countSave, year])

  const [author, setAuthor] = useState([]);
  const [data, setData] = useState([]);
  const [dataStatic, setDataStatic] = useState([]);

  const handleCreateMirf = async (values) => {

    await axios.post(`${process.env.REACT_APP_API_URL}/mirfbook/add`, values)
    setCountSave(countSave + 1)
    setCreateModalOpen(false);
  };

  const handleUpdate = async (updatedBook) => {
    console.log('Обновление:', updatedBook);
    await axios.patch(`${process.env.REACT_APP_API_URL}/mirfbook/edit/${updatedBook._id}`, updatedBook)
    setCountSave(countSave + 1)
  };

  const handleDelete = async (book) => {
    console.log('Удаление:', book._id);
    await axios.delete(`${process.env.REACT_APP_API_URL}/mirfbook/delete/${book._id}`)
    setCountSave(countSave + 1)

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
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalOpen(true)}
          >
            Добавить книгу
          </Button>
          <Tabs
            items={[
              ...data.map(item => (
                {
                  key: item.key,
                  label: item.compilation,
                  children: (
                    <Tabs
                      items={[
                        {
                          key: 'purchase',
                          label: 'Покупка',
                          children: (
                            <div className="groupCardCategory">
                              {item.tabs.purchase.map(category => (
                                <div className="cardCaetegory">
                                  <Card
                                    key={category.category}
                                    title={category.category}
                                  >
                                    <div className="bookmarks_cards">
                                      {
                                        category.cards.map(arr =>
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
                                                  <div className="card_bookmarks_author">{arr.name}</div>
                                                  <div className="card_bookmarks_cycle">{arr.author}</div>
                                                </div>
                                              } />
                                              <ModalButtonMirf
                                                item={item}
                                                category={category}
                                                book={arr}
                                                authors={author}
                                                onUpdate={handleUpdate}
                                                onDelete={handleDelete} />
                                            </Card>
                                          </div>
                                        )
                                      }
                                    </div>
                                  </Card>
                                </div>
                              ))}
                            </div>
                          )
                        },

                        {
                          key: 'reading',
                          label: 'Прочтение',
                          children: (
                            <div className="groupCardCategory">
                              {item.tabs.reading.map(category => (
                                <div className="cardCaetegory">
                                  <Card
                                    key={category.category}
                                    title={category.category}
                                  >
                                    <div className="bookmarks_cards">
                                      {
                                        category.cards.map(arr =>
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
                                                  <div className="card_bookmarks_author">{arr.name}</div>
                                                  <div className="card_bookmarks_cycle">{arr.author}</div>
                                                </div>
                                              } />
                                              <ModalButtonMirf
                                                item={item}
                                                category={category}
                                                book={arr}
                                                authors={author}
                                                onUpdate={handleUpdate}
                                                onDelete={handleDelete} />
                                            </Card>
                                          </div>
                                        )
                                      }
                                    </div>
                                  </Card>
                                </div>
                              ))}
                            </div>
                          )
                        }
                      ]}
                    />
                  )
                })),
              {
                key: 'statistic',
                label: 'Статистика',
                children: <div>
                  <div className="groupCardCategory">
                    {
                      dataStatic.map(stat => (
                        <div className="cardCaetegory">
                          <Card
                            key={stat.key}
                            title={stat.compilation}
                          >
                            <div className="CardStatMirf">


                              <div className="cardGroupMirf">

                                <div className="cardMirf">
                                  <div>
                                    <Title level={5}>Покупка книг</Title>
                                  </div>
                                  <div className="cardMirfProgress">
                                    <div>
                                      <Progress type="circle" percent={stat.percentPurchase} />
                                    </div>
                                    <div >
                                      <Title level={5}>Выполнено: {stat.countBooksPurchase}</Title>
                                      <Title level={5}>Осталось: {stat.countBooksCompilation - stat.countBooksPurchase}</Title>
                                    </div>
                                  </div>
                                </div>

                                <div className="cardMirf">
                                  <div>
                                    <Title level={5}>Чтение книг</Title>
                                  </div>
                                  <div className="cardMirfProgress">
                                    <div>
                                      <Progress type="circle" percent={stat.percentReading} />
                                    </div>
                                    <div>
                                      <Title level={5}>Выполнено: {stat.countBooksReading}</Title>
                                      <Title level={5}>Осталось: {stat.countBooksCompilation - stat.countBooksReading}</Title>
                                    </div>
                                  </div>
                                </div>

                              </div>


                            </div>
                          </Card>
                        </div>))
                    }
                  </div>
                </div>
              }]}
          />

          <CreateMirfModal
            open={createModalOpen}
            onCancel={() => setCreateModalOpen(false)}
            onCreate={handleCreateMirf}
            authors={author}
          />
        </div>
      }
    </>
  )
}
export default PageMirf;