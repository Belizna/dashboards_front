import React, { useEffect, useState } from "react";
import axios from "axios";
import DemoLiquid from "../../components/ChartsCredit/Liquid";
import DemoPie from "../../components/ChartsCredit/Pie";
import DemoLineGames from "../../components/ChartsCredit/LineGames";
import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Card, Spin, Statistic } from 'antd';

import './pageMiniature.css'
const { Title } = Typography;


const PageChartsHobby = () => {

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/hobby/static/`)
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
            <DemoLiquid percentPay={staticData.procent_miniatures_colors} />
            <Title style={{ marginTop: -10 }} level={5}>Процент покрашенных миниатюр</Title>
          </div>
          <div className="pieGroupHobby">
            {
              staticData && staticData.test.map((obj) => <div className="pieHobby">
                <DemoPie data={obj} />
                <Title style={{ marginTop: -10 }} level={5}>Процент покрашенных {obj[0].key}</Title>
              </div>
              )
            }
          </div>
          <div className="lineGames">
            {staticData && <>
              <DemoLineGames data={staticData.columnHobby} />
              <Title level={5}>Общая сводка</Title>
            </>
            }
          </div>
          <div className="table">
            <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="Потрачено всего"
                value={staticData.summ_hobby}
                valueStyle={{
                  color: '#cf1322',
                  fontSize: 20
                }}
                suffix="р."
              />
            </Card>
            <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="На миниатюры"
                value={staticData.summ_miniatures}
                valueStyle={{
                  color: '#cf1322',
                  fontSize: 20
                }}
                suffix="р."
              />
            </Card>
            <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="На краску"
                value={staticData.summ_color}
                valueStyle={{
                  color: '#cf1322',
                  fontSize: 20
                }}
                suffix="р."
              />
            </Card>
          </div>
        </div>
      </>}
    </>
  )
}

export default PageChartsHobby