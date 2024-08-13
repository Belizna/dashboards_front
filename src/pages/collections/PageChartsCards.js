import React, { useEffect, useState } from "react";
import axios from "axios";
import DemoLiquid from "../../components/ChartsCredit/Liquid";
import { FieldNumberOutlined, UnorderedListOutlined, LoadingOutlined } from '@ant-design/icons';
import { Typography, Card, Spin, Tree, Button, Statistic, message, Progress} from 'antd';

const { Title } = Typography;

const PageChartsCards = ({ collection_card }) => {

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/cards/static/${collection_card}`)
      .then(res => setStaticData(res.data))
  }, [collection_card])

  const [staticData, setStaticData] = useState(0)
  const [messageApi, contextHolder] = message.useMessage();

  const onSelect = (selectedKeys, info) => {
    navigator.clipboard.writeText(info.node.title)
    messageApi.open({
      type: 'success',
      content: `"${info.node.title}" copy`
    })
  };
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
            <DemoLiquid percentPay={staticData.procentCard} />
            <Title style={{ marginTop: -10 }} level={5}>Процент собранной коллекции {collection_card}</Title>
          </div>
          <div className="processGroup">
            {
              staticData && staticData.staticCards.map((obj) => <div className="process">
                <Title style={{ marginTop: -10 }} level={5}>Собранно {obj.key} карт {obj.yesCards}/{obj.countCards}</Title>
                <Title style={{ marginTop: -10 }} level={5}>Потрачено на {obj.key} карт: {obj.sumCards}р.</Title>
                <Title style={{ marginTop: -10 }} level={5}>Остаток {obj.key} карт: 
                <Button style={{ width: 10 }} onClick={() => {
                  navigator.clipboard.writeText(obj.numberCard)
                  messageApi.open({
                    type: 'success',
                    content: `Номера скопированы`
                  })
                }} type="text" danger>{obj.countCards - obj.yesCards}</Button></Title>
                <Progress percent={obj.procentYesCards} />
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
                value={`${staticData.countYes} / ${staticData.countAllCard}`}
                valueStyle={{
                  color: '#3f8600',
                  fontSize: 20
                }}
              />
            </Card>
            <Card style={{ width: 390, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="Недостающие карточки"
                value={staticData.countNotYes}
                valueStyle={{
                  color: '#cf1322',
                  fontSize: 20
                }}
              />
              <Tree style={{ width: 360 }}
                onSelect={onSelect}
                showLine
                defaultExpandAll={false}
                treeData={staticData.cardPrice}
              />
            </Card>
            <Card style={{ width: 390, marginRight: 10 }} size='small' bordered={false}>
              <Statistic
                title="Карточки под замену"
                value={staticData.countReplace}
                valueStyle={{
                  color: '#cf1322',
                  fontSize: 20
                }}
              />
              <Tree style={{ width: 360 }}
                onSelect={onSelect}
                showLine
                defaultExpandAll={false}
                treeData={staticData.cardPriceReplace}
              />
            </Card>
            <Card style={{ width: 260, marginRight: 10 }}>
              <Title style={{ marginTop: -10 }} level={5}>Скопировать: </Title>
              <Button
                icon={<UnorderedListOutlined />}
                onClick={() => {
                  navigator.clipboard.writeText(staticData.cardList)
                  messageApi.open({
                    type: 'success',
                    content: `Список скопирован`
                  })
                }}
              >
                Список
              </Button>
              <Button
                icon={<FieldNumberOutlined />}
                onClick={() => {
                  navigator.clipboard.writeText(staticData.cardNumber)
                  messageApi.open({
                    type: 'success',
                    content: `Номера скопированы`
                  })
                }}
              >
                Номера
              </Button>
            </Card>
            <Card style={{ width: 195 }} size='small' bordered={false}>
              <Statistic
                title="Потрачено на коллекцию"
                value={staticData.cardSummCollection}
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

export default PageChartsCards