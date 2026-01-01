import { Flex, Progress, Statistic, Card } from 'antd';
import LineMain from "../ChartsCredit/LinePulse";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import './purpose.css'

const Purpose = ({ purposeCollect }) => {
    return (
        <>
            <div className="purpose_main">
                <div className="purpose_bar_1">
                    <text style={{ marginBottom: 50, marginTop: 5, fontSize: 20 }}>
                        {purposeCollect.purpose_name}
                    </text>
                    <Flex gap="small" wrap>
                        <Progress type="circle" size={150} percent={purposeCollect.percentDays}
                            format={() => <span style={{ fontSize: 22 }}>{purposeCollect.days} дней</span>} />
                        <Progress type="circle" size={150} percent={purposeCollect.percentDone} format={() =>
                            <span style={{ fontSize: 22 }}>{purposeCollect.done}</span>} />
                    </Flex>
                </div>
                <div className="purpose_main_2">
                    <div className="purpose_bar_2">
                        <Progress percent={purposeCollect.percentDone} percentPosition={{ align: 'center', type: 'inner' }} size={[500, 20]} />
                    </div>
                    <div className="purpose_cards_static">
                        <Statistic title="Динамика" value={`${purposeCollect.done}`} suffix={`/ ${purposeCollect.purpose_count}`} />
                        <Statistic title="Остаток" value={`${purposeCollect.diff}`} />
                    </div>
                    <div className="purpose_cards_graf">
                        <div className="purpose_cards_dinamic">
                            <Card style={{ width: 195 }} size='small' bordered={false}>
                                <Statistic
                                    title="План на месяц"
                                    value={purposeCollect.planMount}
                                    valueStyle={{ fontSize: 20 }}
                                />
                            </Card>
                            {
                                purposeCollect.nowTempo < purposeCollect.planMount ?
                                    <Card style={{ width: 195 }} size='small' bordered={false}>
                                        <Statistic
                                            title="Текущий темп"
                                            value={purposeCollect.nowTempo}
                                            valueStyle={{ fontSize: 20, color: '#cf1322', }}
                                            prefix={<ArrowDownOutlined />}
                                        />
                                    </Card> :
                                    purposeCollect.nowTempo > purposeCollect.planMount ?
                                        <Card style={{ width: 195 }} size='small' bordered={false}>
                                            <Statistic
                                                title="Текущий темп"
                                                value={purposeCollect.nowTempo}
                                                valueStyle={{ fontSize: 20, color: '#3f8600', }}
                                                prefix={<ArrowUpOutlined />}
                                            />
                                        </Card> :
                                        <Card style={{ width: 195 }} size='small' bordered={false}>
                                            <Statistic
                                                title="Текущий темп"
                                                value={purposeCollect.nowTempo}
                                                valueStyle={{ fontSize: 20 }}
                                            />
                                        </Card>
                            }
                        </div>
                        <div className="cards">
                            <LineMain data={purposeCollect.data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Purpose;

