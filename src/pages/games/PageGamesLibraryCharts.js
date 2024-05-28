import React, { useEffect, useState } from "react";
import axios from "axios";
import DemoLiquid from "../../components/ChartsCredit/Liquid";
import DemoPie from "../../components/ChartsCredit/Pie";
import DemoLineGames from "../../components/ChartsCredit/LineGames"
import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Card, Spin, Statistic } from 'antd';

import './pageGamesLibraryCharts.css'

const { Title } = Typography;

const PageGamesLibraryCharts = () => {

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/games/static`)
      .then(res => setStaticData(res.data))
  }, [])

  const [staticData, setStaticData] = useState(0)

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
        <div className="pageChartGames">
          <div className="liquid">
            <DemoLiquid percentPay={staticData.procentStaticGames} />
            <Title style={{ marginTop: -10 }} level={5}>Процент пройденных игр</Title>
          </div>
          <div className="pieGroup">
            {staticData && staticData.listData1.map(obj => <div className="pie">
              <DemoPie data={obj} />
              <Title style={{ marginTop: -10 }} level={5}>Процент пройденных игр в {obj[0].key}</Title>
            </div>
            )}
          </div>
          <div className="lineGames">
            <DemoLineGames data={staticData.listData4} />
            <Title level={5}>Общая сводка</Title>
          </div>
          <div className="table">
            <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="Потрачено на игры"
                value={staticData.sumPriceGames.toFixed(2)}
                valueStyle={{
                  color: '#cf1322',
                  fontSize: 20
                }}
                suffix="р."
              />
            </Card>
            <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="Затрачено времени"
                value={staticData.sumTime.toFixed(2)}
                valueStyle={{
                  color: '#3f8600',
                  fontSize: 20
                }}
                suffix="ч."
              />
            </Card>
          </div>
        </div>
      </>}
    </>

  )
}

export default PageGamesLibraryCharts;