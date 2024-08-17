import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Image, Progress, Typography } from 'antd';


const PageChartsBooksGroup = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/books/charts_group_list/`)
            .then((res) => [setStaticData(res.data.booksListGroup)])
    }, [])

    const [staticData, setStaticData] = useState(0)
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
                <>
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
                </>
            }
        </>
    )
}

export default PageChartsBooksGroup