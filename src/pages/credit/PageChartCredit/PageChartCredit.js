import React, { useEffect, useState } from "react";
import { Typography, Card } from 'antd';
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoPie from "../../../components/ChartsCredit/Pie";
import DemoLine from "../../../components/ChartsCredit/Line";
import axios from "axios";

import './pageChartCredit.css'

const {Title, Text} = Typography;

const PageChartCredit = () => 
{
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}carts/static`)
        .then(res => setStaticData(res.data))
      }, [])

    const [staticData, setStaticData] = useState(0)
    const data3 = [
        {
          type: 'Выплачено',
          value: staticData.count_month_paid,
        },
        {
          type: 'Осталось',
          value: staticData.count_month_remainder,
        }
      ];
      const data1 = [
        {
          type: 'Переплата',
          value: staticData.overpayment,
        },
        {
          type: 'Экономия',
          value: staticData.saving,
        }
      ];
      const data2 = [
        {
          type: 'Выплачено',
          value: staticData.paid,
        },
        {
          type: 'Осталось',
          value: staticData.remainder,
        }
      ];
    return(
        <>
        
        <div className="pageChartCredit">
            <div className="liquid">
                <DemoLiquid percentPay={staticData.procentStatic}/>
                <Title style={{marginTop: -10}} level={5}>Процент выплаты</Title>
            </div>
            <div className="pieGroup">
                <div className="pie">
                <DemoPie data={data3}/>
                    <Title style={{marginTop: -10}} level={5}>Процент выплаты</Title>
                </div>
                <div className="pie">
                <DemoPie data={data2}/>
                    <Title style={{marginTop: -30}} level={5}>Процент суммы выплаты</Title>
                </div>
                <div className="pie">
                <DemoPie data={data1}/>
                <Title style={{marginTop: -30}} level={5}>Процент экономии</Title>
                </div>
            </div>
            <div className="line">
                <DemoLine />
                <Title level={5}>Досрочные погашения</Title>
            </div>
            <div className="table">
              <Card style={{ width: 280, height: 90, marginRight: 5}}>
                <Title style={{marginTop: -10}} level={4}>Остаток</Title>
                <Text style={{marginLeft: 60}} strong type="danger">{staticData.remainder}</Text>
                </Card>
                <Card style={{ width: 280, height: 90, marginRight: 5}}>
                <Title style={{marginTop: -10}} level={4}>Выплачено</Title>
                <Text style={{marginLeft: 60}} strong type="success">{staticData.paid}</Text>
                </Card>
                <Card style={{ width: 280, height: 90, marginRight: 5}}>
                <Title style={{marginTop: -10}} level={4}>Досрочно</Title>
                <Text style={{marginLeft: 60}} strong>{staticData.early_sum}</Text>
                </Card>
                <Card style={{ width: 280, height: 90, marginRight: 5}}>
                <Title style={{marginTop: -10}} level={4}>Экономия</Title>
                <Text style={{marginLeft: 60}} strong type="success">{staticData.saving}</Text>
                </Card>
                <Card style={{ width: 280, height: 90, marginRight: 5}}>
                <Title style={{marginTop: -10}} level={4}>Срок кредита</Title>
                <Text style={{marginLeft: 60}} strong >месяцев : {staticData.count_month_paid}</Text>
                </Card>
                <Card style={{ width: 280, height: 90, marginRight: 5}}>
                <Title style={{marginTop: -10}} level={4}>Остаток срока</Title>
                <Text style={{marginLeft: 60}} strong >месяцев : {staticData.count_month_remainder}</Text>
                </Card>
            </div>
        </div>
        </>
    )
}

export default PageChartCredit;
