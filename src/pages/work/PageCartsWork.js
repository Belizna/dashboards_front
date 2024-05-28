import React, { useEffect, useState } from "react";
import axios from "axios";
import PieWork from "../../components/Work/PieWork";
import DemoDualAxes from "../../components/Work/DualAxesWork"
import { Typography, Spin, Card, Statistic } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './pageChartsWork.css'
const { Title } = Typography;



const PageChartsWork = () => {
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/weekend/work/charts`)
      .then(res => setStaticData(res.data))
  }, [])

  const [staticData, setStaticData] = useState(null)
  return (
    <>
      {staticData === null ? <><div className="loader">
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
          <div className="pieGroup">
            <div className="pie">
              <PieWork staticData={staticData.salaryPieGroupYear} />
              <Title style={{ marginTop: -10 }} level={5}>Процент заработка по годам</Title>
            </div>
            <div className="pie">
              <PieWork staticData={staticData.salaryPieGroupCompany} />
              <Title style={{ marginTop: -10 }} level={5}>Процент заработка по компаниям</Title>
            </div>
            <div className="pie">
              <PieWork staticData={staticData.bonusPieGroupYear} />
              <Title style={{ marginTop: -10 }} level={5}>Процент подработок по годам</Title>
            </div>
          </div>
          <div className="lineWorkGroup">
            <div className="lineWork">
              <DemoDualAxes staticData={staticData.bonusGroupMonth} conf='bonus' />
              <Title style={{ marginTop: 10 }} level={5}>Подработки по месяцам</Title>
            </div>
            <div className="lineWork">
              <DemoDualAxes staticData={staticData.salaryMonth} conf='salary' />
              <Title style={{ marginTop: 10 }} level={5}>Зарплата по месяцам</Title>
            </div>

          </div>
          <div className="table">
            <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="Не выплачено"
                value={staticData.bonusSumm}
                valueStyle={{
                  color: '#cf1322',
                  fontSize: 20
                }}
              />
            </Card>
          </div>
        </div>
      </>}
    </>
  )
}

export default PageChartsWork;