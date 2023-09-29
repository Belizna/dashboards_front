import React, {useEffect, useState} from "react";
import axios from "axios";
import DemoLiquid from "../../components/ChartsCredit/Liquid";
import DemoPie from "../../components/ChartsCredit/Pie";
import DemoLineGames from "../../components/ChartsCredit/LineGames";

import { Typography, Card} from 'antd';

import './pageMiniature.css'
const {Title, Text} = Typography;


const PageChartsHobby = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}hobby/static/`)
        .then(res => setStaticData(res.data))
      }, [])

      const [staticData, setStaticData] = useState(0)

    return(
        <>
        <div className="pageChartGames">
            <div className="liquid">
                <DemoLiquid percentPay={staticData.procent_miniatures_colors}/>
                <Title style={{marginTop: -10}} level={5}>Процент покрашенных миниатюр</Title>
            </div>
            <div className="pieGroupHobby">
              {
                staticData && staticData.test.map((obj) => <div className="pieHobby">
                <DemoPie data={obj}/>
                    <Title style={{marginTop: -10}} level={5}>Процент покрашенных {obj[0].name}</Title>
                </div>
                )
              }
            </div>
            <div className="lineGames">
                {staticData && <>
                  <DemoLineGames data={staticData.columnHobby}/>
                <Title level={5}>Общая сводка</Title> 
                </>
                }
            </div>
            <div className="table">
            <Card style={{width: 210, marginRight: 10}}>
                <Title style={{marginTop: -10}} level={4}>Потрачено всего</Title>
                <Text style={{marginLeft: 65}} strong type="danger">{staticData.summ_hobby}р.</Text>
                </Card>
                <Card style={{width: 210, marginRight: 10}}>
                <Title style={{marginTop: -10}} level={4}>На миньки</Title>
                <Text style={{marginLeft: 65}} strong type="danger">{staticData.summ_miniatures}р.</Text>
                </Card>
                <Card style={{width: 210, marginRight: 10}}>
                <Title style={{marginTop: -10}} level={4}>На краску</Title>
                <Text style={{marginLeft: 65}} strong type="danger">{staticData.summ_color}р.</Text>
                </Card>
            </div>
        </div>
    </>
    )
}

export default PageChartsHobby