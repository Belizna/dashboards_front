import React, { useEffect, useState } from "react";
import axios from "axios";
import DemoLiquid from "../../components/ChartsCredit/Liquid";
import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Card, Spin, Tree, Button, Statistic, message, Progress } from 'antd';

const { Title } = Typography;

const PageChartsBeyblades = () => {

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/beyblades/static/`)
      .then(res => setStaticData(res.data))
  }, [])

  const [staticData, setStaticData] = useState(0)
  const [messageApi, contextHolder] = message.useMessage();

  const onSelect = (selectedKeys, info) => {
    navigator.clipboard.writeText(info.node.title)
    messageApi.open({
      type: 'success',
      content: `"${info.node.title}" copy`
    })
  }

  return (
    <>
      {contextHolder}
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
            <DemoLiquid percentPay={staticData.procentAllBeyblades} />
            <Title style={{ marginTop: -10 }} level={5}>Процент собранной коллекции волчков</Title>
          </div>
          <div className="processGroup">
            {
              staticData && staticData.staticBeyblades.map((obj) => <div className="process">
                <Title style={{ marginTop: -10 }} level={5}>Собранно {obj.key} волчков {obj.yesBeyblades}/{obj.notBeyblades}</Title>
                <Title style={{ marginTop: -10 }} level={5}>Потрачено на {obj.key} волчков: {obj.sumBeyblades}р.</Title>
                <Title style={{ marginTop: -10 }} level={5}>Остаток {obj.key} волчков:
                  <Button style={{ width: 10 }} onClick={() => {
                    navigator.clipboard.writeText(obj.name_beyblade)
                    messageApi.open({
                      type: 'success',
                      content: `Волчки скопированы`
                    })
                  }} type="text" danger>{obj.countBeyblades - obj.yesBeyblades}</Button></Title>
                <Progress percent={obj.procentYesBeyblades} />
              </div>
              )
            }
          </div>
          {/* <div className="lineGames">
            {staticData && <>
              <DemoLineGames data={staticData.cardColumn} />
              <Title level={5}>Общая сводка</Title>
            </>
            }
          </div> */}
          <div className="table">
            <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="Собранная коллекция"
                value={`${staticData.yesProcent} / ${staticData.yesProcent + staticData.notProcent}`}
                valueStyle={{
                  color: '#3f8600',
                  fontSize: 20
                }}
              />
            </Card>
            {
              staticData && staticData.beybladePrice.map((obj) =>
                <Card style={{ width: 280, marginRight: 10 }} size='small' bordered={false}>
                  <Statistic
                    title={obj.title}
                    value={obj.countNotYes}
                    valueStyle={{
                      color: '#cf1322',
                      fontSize: 20
                    }}
                  />
                  <Tree style={{ width: 360 }}
                    onSelect={onSelect}
                    showLine
                    defaultExpandAll={false}
                    treeData={obj.beybladePrices}
                  />
                </Card>)
            }
            <Card style={{ width: 195 }} size='small' bordered={false}>
              <Statistic
                title="Потрачено"
                value={staticData.beybladeSummCollection}
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

export default PageChartsBeyblades