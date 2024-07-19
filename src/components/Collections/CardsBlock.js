import React from "react";
import { Typography, Image, Progress, Popover } from 'antd';

const CardsBlock = ({ staticData }) => {
    const { Title, Link, Text } = Typography;

    return (
        <div className="blockCardCollection">
            <div className="cardName">
                <Image
                    width={80} height={97}
                    src={`https://www.laststicker.ru/i/album/${staticData.keyCards}.jpg`}
                />
                <Title style={{ marginLeft: 25 }} level={4}>{staticData.nameCollection}</Title>
            </div>
            <div className="cardProcent">
                <Text type="secondary">Собрано.. {staticData.procent}%</Text>
                <Progress size={[350, 10]} percent={staticData.procent} showInfo={false} />
            </div>
            <div className="cardNumber">
                <Text style={{ fontSize: 15 }} strong>Осталось ({staticData.countNotCard}): </Text>
                {
                    staticData.items.map(obj =>
                        <Popover placement="bottomLeft" content={<Image
                            width={218} height={300}
                            src={`https://www.laststicker.ru/i/cards/${staticData.keyCards}/${obj}.jpg`}
                        />}>
                            <Link style={{ fontSize: 15}} target="_blank">
                                , {obj}
                            </Link >
                        </Popover>)
                }
            </div>
        </div>
    )
}
export default CardsBlock;