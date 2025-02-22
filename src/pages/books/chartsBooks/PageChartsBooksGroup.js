import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Image, Progress, Typography, Tabs } from 'antd';

import './pageHorusHeresyCharts.css'

const PageChartsBooksGroup = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/books/charts_group_list/`)
            .then((res) => [setStaticData(res.data.booksListGroup),
            setStaticDataWrite(res.data.booksWriteListGroup),
            setStaticDataAuthor(res.data.booksAuthorWriteListGroup),
            ])
    }, [])

    const [staticData, setStaticData] = useState(0)
    const [staticDataWrite, setStaticDataWrite] = useState(0)
    const [staticDataAuthor, setStaticDataAuthor] = useState(0)
    const { Title, Link, Text } = Typography;

    return (
        <>
            {staticData === 0 ? <><div className="loader">
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
                <Tabs defaultActiveKey="1" items={[
                    {
                        key: '1',
                        label: 'Покупка книг',
                        children: <>
                            <div className="mapBlockCollection">
                                {
                                    staticData.map(obj =>
                                        <div className="blockCardCollection">
                                            <div className="cardName">
                                                <Image
                                                    width={85} height={117}
                                                    src={obj.keyBooks}
                                                />
                                                <Title style={{ marginLeft: 25 }} level={4}>{obj.nameCompilation}</Title>
                                            </div>
                                            <div className="cardProcent">
                                                <Text type="secondary">Собрано.. {obj.procent}%</Text>
                                                <Progress size={[350, 8]} percent={obj.procent} showInfo={false} />
                                            </div>
                                            <div className="cardNumber">
                                                <Text style={{ fontSize: 15 }} strong>Количество: <Text style={{ fontSize: 15 }} type="success">{obj.countBooks}</Text></Text> <br />
                                                <Text style={{ fontSize: 15 }} strong>Потрачено: <Text style={{ fontSize: 15 }} type="success">{obj.summBooks}р</Text></Text> <br />
                                                <Text style={{ fontSize: 15 }} strong>Осталось ({obj.countNotBooks}): </Text>
                                                {
                                                    obj.items.map(obj =>
                                                        <Link style={{ fontSize: 15 }} target="_blank">
                                                            , {obj}
                                                        </Link >
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>,
                    },
                    {
                        key: '2',
                        label: 'Чтение книг',
                        children: <>
                            <div className="mapBlockCollection">
                                {
                                    staticDataWrite.map(obj =>
                                        <div className="blockCardCollection">
                                            <div className="cardName">
                                                <Image
                                                    width={85} height={117}
                                                    src={obj.keyBooks}
                                                />
                                                <Title style={{ marginLeft: 25 }} level={4}>{obj.nameCompilation}</Title>
                                            </div>
                                            <div className="cardProcent">
                                                <Text type="secondary">Прочитано.. {obj.procent}%</Text>
                                                <Progress size={[350, 8]} percent={obj.procent} showInfo={false} />
                                            </div>
                                            <div className="cardNumber">
                                                {
                                                    obj.group.map(arr =>
                                                        <>
                                                            <Text style={{ fontSize: 15 }} strong>{arr.staticWrite}</Text>
                                                            {
                                                                arr.listWrite.map(obj =>
                                                                    <Link style={{ fontSize: 15 }} target="_blank">
                                                                        {obj},
                                                                    </Link >
                                                                )
                                                            }
                                                            <br></br>
                                                        </>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>,
                    },
                    {
                        key: '3',
                        label: 'Авторы',
                        children: <>
                            <div className="mapBlockCollection">
                                {
                                    staticDataAuthor.map(obj => <div className="blockAutorCollection">
                                        <div className="blockAutor">
                                            <Image
                                                width={160} height={207}
                                                src={obj.keyImage}
                                            />

                                            <div className="blockAutorName">
                                                <Title level={2}>{obj.author}</Title>
                                                <Text style={{ fontSize: 16 }}>Количество циклов: {obj.summCycle} </Text>
                                                <Text style={{ fontSize: 16 }}>Количество романов: {obj.summRomans} </Text>
                                                <Text style={{ fontSize: 16 }}>Количество повестей: {obj.summBigStory}</Text>
                                                <Text style={{ fontSize: 16 }}>Количество рассказов: {obj.summStory} </Text>
                                            </div>
                                        </div>

                                        {
                                            obj.books.map(ob => <div className="blockBookAuthorCollection">
                                                <div className="cardName">
                                                    <Image
                                                        width={85} height={117}
                                                        src={ob.keyBooks}
                                                    />
                                                    <Title style={{ marginLeft: 25 }} level={4}>{ob.nameCompilation}</Title>
                                                </div>
                                                <div className="cardNumber">
                                                    {
                                                        ob.group.map(arr =>
                                                            <>
                                                                <Text style={{ fontSize: 15 }} strong>{arr.staticWrite}</Text>
                                                                {
                                                                    arr.listWrite.map(obj =>
                                                                        <Link style={{ fontSize: 15 }} target="_blank">
                                                                            {obj},
                                                                        </Link >
                                                                    )
                                                                }
                                                                <br></br>
                                                            </>
                                                        )
                                                    }

                                                </div>
                                            </div>)
                                        }
                                        <br />
                                    </div>
                                    )
                                }

                            </div>
                        </>,
                    }
                ]} />
            }
        </>
    )
}

export default PageChartsBooksGroup