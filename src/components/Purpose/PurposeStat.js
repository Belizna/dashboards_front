import { Progress, Typography, Card } from 'antd';

import './purpose.css'

const { Text} = Typography;

const PurposeStat = ({ purposeStatistic }) => {
    return (
        <div className="purpose_stat">
            <Card title={`Направление: ${purposeStatistic.purpose}`} variant="borderless">
                <div className="purpose_stat_body">
                    <Text strong>{purposeStatistic.purpose_name}</Text>
                    <div className="purpose_stat_text">
                        <Text>Цель: {purposeStatistic.target}</Text>
                        <Text>Факт: {purposeStatistic.actual}</Text>
                    </div>
                    <Progress percent={purposeStatistic.progress} 
                    percentPosition={{ align: 'center', type: 'inner' }} size={[300, 20]} />
                </div>
            </Card>
        </div>
    );
};
export default PurposeStat;

