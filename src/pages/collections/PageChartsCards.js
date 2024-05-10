import React, {useEffect, useState} from "react";
import axios from "axios";
import DemoLiquid from "../../components/ChartsCredit/Liquid";
import DemoPie from "../../components/ChartsCredit/Pie";
import DemoLineGames from "../../components/ChartsCredit/LineGames";
import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Card, Spin, Tree, message} from 'antd';

const {Title, Text} = Typography;


const PageChartsCards = ({collection_card}) => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}cards/static/${collection_card}`)
        .then(res => setStaticData(res.data))
      }, [collection_card])

      const [staticData, setStaticData] = useState(0)
      const [messageApi, contextHolder] = message.useMessage();

      const onSelect = (selectedKeys, info) => {
        console.log(info.node.title);
        navigator.clipboard.writeText(info.node.title)
        messageApi.open({
          type: 'success',
          content: `"${info.node.title}" copy`
        })
      };

    return(
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
                <DemoLiquid percentPay={staticData.procentCard}/>
                <Title style={{marginTop: -10}} level={5}>Процент собранной коллекции {collection_card}</Title>
            </div>
            <div className="pieGroupHobby">
              {
                staticData && staticData.cardPie.map((obj) => <div className="pieHobby">
                <DemoPie data={obj}/>
                    <Title style={{marginTop: -10}} level={5}>Процент собранных {obj[0].key} карт</Title>
                </div>
                )
              }
            </div>
            <div className="lineGames">
                {staticData && <>
                  <DemoLineGames data={staticData.cardColumn}/>
                <Title level={5}>Общая сводка</Title> 
                </>
                }
            </div>
            <div className="table">
                <Card style={{width: 245}}>
                <Title style={{marginTop: -10}} level={5}>Собранная коллекция</Title>
                <Text style={{marginLeft: 71}} strong type="danger">
                  {staticData.countYes} / {staticData.countAllCard}</Text>
                </Card>
                <Card style={{width: 390}}>
                <Title style={{marginTop: -10}} level={5}>Найти карт: 
                <Text style={{marginLeft: 5}} strong type="danger">{staticData.countNotYes}</Text></Title>
                <Tree style={{width: 390}}
                      onSelect={onSelect}
                      showLine
                      defaultExpandAll={false}
                      treeData={staticData.cardPrice}
                    />
                </Card>
              </div>
          </div>
        </>}
    </>
    )
}

export default PageChartsCards