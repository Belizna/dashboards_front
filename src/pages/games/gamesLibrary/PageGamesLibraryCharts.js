import React, { useEffect, useState } from "react";
import axios from "axios";
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoPie from "../../../components/ChartsCredit/Pie";
import DemoLineGames from "../../../components/ChartsCredit/LineGames"

import { Typography, Card} from 'antd';

import './pageGamesLibraryCharts.css'

const {Title, Text} = Typography;

const PageGamesLibraryCharts = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}games/static`)
        .then(res => setStaticData(res.data))
      }, [])

      const [staticData, setStaticData] = useState(0)
    

      const data1 = [
        {
          type: 'Пройдено',
          value: staticData.games_steam_passed,
        },
        {
          type: 'Осталось',
          value: staticData.games_steam_not_passed,
        }
      ];
      const data2 = [
        {
          type: 'Пройдено',
          value: staticData.games_ubi_passed,
        },
        {
          type: 'Осталось',
          value: staticData.games_ubi_not_passed,
        }
      ];
      const data3 = [
        {
          type: 'Пройдено',
          value: staticData.games_all_passed,
        },
        {
          type: 'Осталось',
          value: staticData.games_not_all_passed,
        }
      ];

      const data4 = [
        {
            key: 'Steam',
            name: 'Всего',
            value: staticData.games_all_steam,
          },
          {
              key: 'Steam',
              name: 'Пройдено',
              value: staticData.games_steam_passed,
          },
            {
              key: 'Steam',
              name: 'Осталось',
              value: staticData.games_steam_not_passed,
            },
            {
              key: 'Ubisoft Connect',
              name: 'Всего',
              value: staticData.games_ubi_steam,
            },
            {
              key: 'Ubisoft Connect',
              name: 'Пройдено',
              value: staticData.games_ubi_passed,
            },
            {
              key: 'Ubisoft Connect',
              name: 'Осталось',
              value: staticData.games_ubi_not_passed,
            },
          {
            key: 'Общее количество',
            name: 'Всего',
            value: staticData.games_all_library,
          },
          {
            key: 'Общее количество',
            name: 'Пройдено',
            value: staticData.games_all_passed,
          },
          {
            key: 'Общее количество',
            name: 'Осталось',
            value: staticData.games_not_all_passed,
          },
        ]   
    return(
    
    <>
        <div className="pageChartGames">
            <div className="liquid">
                <DemoLiquid percentPay={staticData.procentStaticGames}/>
                <Title style={{marginTop: -10}} level={5}>Процент пройденных игр</Title>
            </div>
            <div className="pieGroup">
                <div className="pie">
                <DemoPie data={data1}/>
                    <Title style={{marginTop: -10}} level={5}>Процент пройденных игр в Steam</Title>
                </div>
                <div className="pie">
                <DemoPie data={data2}/>
                    <Title style={{marginTop: -30}} level={5}>Процент пройденных игр в Ubisoft Connect</Title>
                </div>
                <div className="pie">
                <DemoPie data={data3}/>
                <Title style={{marginTop: -30}} level={5}>Общий процент пройденных игр</Title>
                </div>
            </div>
            <div className="lineGames">
                <DemoLineGames data={data4}/>
                <Title level={5}>Общая сводка</Title> 
            </div>
            <div className="table">
            <Card >
                <Title style={{marginTop: -10}} level={4}>Потрачено на игры</Title>
                <Text style={{marginLeft: 65}} strong type="danger">{staticData.summ_all_games}р.</Text>
                </Card>
            </div>
        </div>
    </>
    
    )
}

export default PageGamesLibraryCharts;