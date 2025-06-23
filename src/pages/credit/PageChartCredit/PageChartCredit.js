import React, { useEffect, useState } from "react";
import { Typography, Card, Statistic, Spin, Button, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoPie from "../../../components/ChartsCredit/Pie";
import DemoLine from "../../../components/ChartsCredit/Line";
import LineHistory from "../../../components/ChartsCredit/LineHistory";
import axios from "axios";

import './pageChartCredit.css'

const { Title } = Typography;

const PageChartCredit = () => {

  const [staticData, setStaticData] = useState(0)
  const [countSave, setCountSave] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/carts/static`)
      .then(res => setStaticData(res.data))
    // eslint-disable-next-line
  }, [countSave])


  const handleSaveStatistic = async () => {
    var modelStaticHistory = {
      procent_date: staticData.data3,
      procent_summ: staticData.data2,
      procent_econom: staticData.data1
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/credit/history/add`, modelStaticHistory)
    setCountSave(countSave + 1)
  }

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
      </div></> : <>
        {staticData &&
          <div className="pageChartCredit">
            <div className="liquid">
              <DemoLiquid percentPay={staticData.procentStatic} />
              <Title style={{ marginTop: -10 }} level={5}>Процент выплаты</Title>
            </div>
            <Tabs defaultActiveKey="1" items={[
              {
                key: '1',
                label: 'Текущая статистика',
                children: <>
                  <div className="pieGroup">
                    <div className="pie">
                      <DemoPie data={staticData.data3} />
                      <Title style={{ marginTop: -10 }} level={5}>Процент выплаты</Title>
                    </div>
                    <div className="pie">
                      <DemoPie data={staticData.data2} />
                      <Title style={{ marginTop: -30 }} level={5}>Процент суммы выплаты</Title>
                    </div>
                    <div className="pie">
                      <DemoPie data={staticData.data1} />
                      <Title style={{ marginTop: -30 }} level={5}>Процент экономии</Title>
                    </div>
                  </div>
                </>
              },
              {
                key: '2',
                label: 'История',
                children: <>
                  <div className="pieGroup">
                    {staticData.creditHistory[0].procent_date && <>
                      <div className="pie">
                        <LineHistory data={staticData.creditHistory[0].procent_date} />
                        <Title level={5}>Процент выплаты</Title>
                      </div>
                    </>}
                    {staticData.creditHistory[0].procent_summ && <>
                      <div className="pie">
                        <LineHistory data={staticData.creditHistory[0].procent_summ} />
                        <Title level={5}>Процент суммы выплаты</Title>
                      </div>
                    </>}
                    {staticData.creditHistory[0].procent_econom && <>
                      <div className="pie">
                        <LineHistory data={staticData.creditHistory[0].procent_econom} />
                        <Title level={5}>Процент экономии</Title>
                      </div>
                    </>}
                  </div>
                </>
              }
            ]} />
            <div className="line">
              <DemoLine data={staticData.earlyPayGroup} />
              <Title level={5}>Досрочные погашения</Title>
            </div>
            <div className="table">
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Остаток"
                  value={(staticData.remainder).toFixed(2)}
                  valueStyle={{
                    color: '#cf1322',
                    fontSize: 20
                  }}
                  suffix="р."
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Выплачено"
                  value={staticData.paid}
                  valueStyle={{
                    color: '#3f8600',
                    fontSize: 20
                  }}
                  suffix="р."

                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Досрочно"
                  value={staticData.early_sum}
                  suffix="р."
                  valueStyle={{ fontSize: 20 }}
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Экономия"
                  value={staticData.saving}
                  suffix="р."
                  valueStyle={{
                    color: '#3f8600',
                    fontSize: 20
                  }}
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Срок кредита"
                  value={`месяцев: ${staticData.count_month_paid}`}
                  valueStyle={{ fontSize: 20 }}
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Остаток срока"
                  value={`месяцев: ${staticData.count_month_remainder}`}
                  valueStyle={{ color: '#cf1322', fontSize: 20 }}
                />
              </Card>
            </div>
            <Button onClick={handleSaveStatistic} type="primary"
              style={{
                marginLeft: 10,
                marginTop: 10,
                backgroundColor: '#5270A7',
              }}>Сохранить статистику</Button>
          </div>
        }</>}
    </>
  )
}

export default PageChartCredit;
