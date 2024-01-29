import React, {useEffect, useState} from "react";
import axios from "axios";
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoPie from "../../../components/ChartsCredit/Pie";
import DemoLineGames from "../../../components/ChartsCredit/LineGames"
import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Card,Spin} from 'antd';
import './pageHorusHeresyCharts.css'

const {Title, Text} = Typography;


const PageChartsSoulDrinkers = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}books/static/Испивающие Души`)
        .then(res => setStaticData(res.data))
      }, [])

      const [staticData, setStaticData] = useState(0)

      const data1 = [
        {
          type: 'Прочитано',
          value: staticData.read_novel,
        },
        {
          type: 'Осталось',
          value: staticData.not_read_novel,
        }
      ];
      const data2 = [
        {
          type: 'Прочитано',
          value: staticData.read_big_story,
        },
        {
          type: 'Осталось',
          value: staticData.not_read_big_story,
        }
      ];

      const data4 = [
        {
            key: 'Романов',
            name: 'Всего',
            value: staticData.not_read_novel + staticData.read_novel,
          },
          {
              key: 'Романов',
              name: 'Прочитано',
              value: staticData.read_novel,
          },
            {
              key: 'Романов',
              name: 'Осталось',
              value: staticData.not_read_novel,
            },
            {
              key: 'Повестей',
              name: 'Всего',
              value: staticData.not_read_big_story + staticData.read_big_story ,
            },
            {
              key: 'Повестей',
              name: 'Прочитано',
              value: staticData.read_big_story,
            },
            {
              key: 'Повестей',
              name: 'Осталось',
              value: staticData.not_read_big_story,
            },
          {
            key: 'Общее количество',
            name: 'Всего',
            value: staticData.read_all_books + staticData.not_read_all_books,
          },
          {
            key: 'Общее количество',
            name: 'Прочитано',
            value: staticData.read_all_books,
          },
          {
            key: 'Общее количество',
            name: 'Осталось',
            value: staticData.not_read_all_books,
          },
        ]   

    return(
        <>{staticData === 0 ? <><div className="loader">
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
                <DemoLiquid percentPay={staticData.procentStaticBooks}/>
                <Title style={{marginTop: -10}} level={5}>Процент прочитанного цикла</Title>
            </div>
            <div className="pieGroup">
                <div className="pie">
                <DemoPie data={data1}/>
                    <Title style={{marginTop: -10}} level={5}>Процент прочитанных романов</Title>
                </div>
                <div className="pie">
                <DemoPie data={data2}/>
                    <Title style={{marginTop: -30}} level={5}>Процент прочитанных повестей</Title>
                </div>
            </div>
            <div className="lineGames">
                <DemoLineGames data={data4}/>
                <Title level={5}>Общая сводка</Title> 
            </div>
            <div className="table">
            <Card >
                <Title style={{marginTop: -10}} level={4}>Потрачено на книги</Title>
                <Text style={{marginLeft: 65}} strong type="danger">{staticData.books_summ}р.</Text>
                </Card>

                <Card style={{width: 245}}>
                <Title style={{marginTop: -10}} level={4}>Приобретено книг</Title>
                <Text style={{marginLeft: 71}} strong type="danger">
                  {staticData.books_there_is_count} / {staticData.books_all_there_is_count}</Text>
                </Card>
            </div>
        </div></>}
    </>
    )
}

export default PageChartsSoulDrinkers