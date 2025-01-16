import React, { useEffect, useState } from "react";
import axios from "axios";
import CardsBlock from "../../components/Collections/CardsBlock";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Image, Progress, Popover, Typography, Tabs } from 'antd';

import './pageCardsGroup.css'

const PageCardsGroupCharts = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/collection/cards/`)
            .then((res) => [setStaticData(res.data.cardListGroup),
            setStaticDataNaruto(res.data.cardListGroupNaruto[0]),
            setStaticDataBeyblade(res.data.beybladeListGroup)
            ])
    }, [])

    const [staticData, setStaticData] = useState(0)
    const [staticDataNaruto, setStaticDataNaruto] = useState(0)
    const [staticDataBeyblade, setStaticDataBeyblade] = useState(0)

    const { Title, Link, Text } = Typography;

    return (
        <>
            {staticDataNaruto === 0 ? <><div className="loader">
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
                        label: 'Карточки',
                        children:
                            <>
                                <div className="mapBlockCollection">
                                    {
                                        staticData.map(obj => <CardsBlock staticData={obj} />)
                                    }
                                    <div className="blockCardCollection">
                                        <div className="cardName">
                                            <Image
                                                width={80} height={97}
                                                src="https://www.laststicker.ru/i/album/9851.jpg"
                                            />
                                            <Title style={{ marginLeft: 25 }} level={4}>{staticDataNaruto.nameCollection}</Title>
                                        </div>
                                        <div className="cardProcent">
                                            <Text type="secondary">Собрано.. {staticDataNaruto.procent}%</Text>
                                            <Progress size={[350, 8]} percent={staticDataNaruto.procent} showInfo={false} />
                                        </div>
                                        <div className="cardNumber">
                                            <Text style={{ fontSize: 15 }} strong>Количество: <Text style={{ fontSize: 15 }} type="success">{staticDataNaruto.countCards}</Text></Text> <br />
                                            <Text style={{ fontSize: 15 }} strong>Потрачено: <Text style={{ fontSize: 15 }} type="success">{staticDataNaruto.sumCards}р</Text></Text> <br />
                                            <Text style={{ fontSize: 15 }} strong>Осталось ({staticDataNaruto.countNotCard}): </Text>
                                            {
                                                staticDataNaruto.items.map(obj =>
                                                    <Popover placement="bottomLeft" content={<Image
                                                        width={218} height={300}
                                                        src={`https://capsulecorpgear.com/wp-content/uploads/${obj.hash}`}
                                                    />}>
                                                        <Link style={{ fontSize: 15 }} target="_blank">
                                                            ,  {obj.title}
                                                        </Link >
                                                    </Popover>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                    },
                    {
                        key: '2',
                        label: 'Бейблейды',
                        children: <>
                            <div className="mapBlockCollection">
                                {
                                    staticDataBeyblade.map(obj =>
                                        <div className="blockCardCollection">
                                            <div className="cardName">
                                                <Image
                                                    width={85} height={117}
                                                    src={obj.keyBeyblade}
                                                />
                                                <Title style={{ marginLeft: 25 }} level={4}>{obj.nameCompilation}</Title>
                                            </div>
                                            <div className="cardProcent">
                                                <Text type="secondary">Собрано.. {obj.procent}%</Text>
                                                <Progress size={[350, 8]} percent={obj.procent} showInfo={false} />
                                            </div>
                                            <div className="cardNumber">
                                                <Text style={{ fontSize: 15 }} strong>Потрачено: <Text style={{ fontSize: 15 }} type="success">{obj.summBeyblade}р</Text></Text> <br />
                                                <Text style={{ fontSize: 15 }} strong>Осталось ({obj.countNotBeyblade}): </Text>
                                                {
                                                    obj.items.map(obj =>
                                                        <Popover placement="bottomLeft" content={<Image
                                                            width={200} height={200}
                                                            src={`https://static.wikia.nocookie.net/beyblade/images/${obj.hash}`}
                                                        />}>
                                                            <Link style={{ fontSize: 15 }} target="_blank">
                                                                , {obj.title}
                                                            </Link >
                                                        </Popover>)
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    }
                ]} />
            }
        </>

    )
}

export default PageCardsGroupCharts