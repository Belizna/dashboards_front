import React, {useEffect, useState} from "react";
import axios from "axios";
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoLineGames from "../../../components/ChartsCredit/LineGames"

import { Typography, Card} from 'antd';

const {Title, Text} = Typography;


const PageChartsMephiston = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}books/static/Мефистон`)
        .then(res => setStaticData(res.data))
      }, [])

      const [staticData, setStaticData] = useState(0)

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
              key: 'Рассказов',
              name: 'Всего',
              value: staticData.read_story + staticData.not_read_story,
            },
            {
              key: 'Рассказов',
              name: 'Прочитано',
              value: staticData.read_story,
            },
            {
              key: 'Рассказов',
              name: 'Осталось',
              value: staticData.not_read_story,
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
        <>
        <div className="pageChartGames">
            <div className="liquid">
                <DemoLiquid percentPay={staticData.procentStaticBooks}/>
                <Title style={{marginTop: -10}} level={5}>Процент прочитанного цикла</Title>
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
            </div>
        </div>
    </>
    )
}

export default PageChartsMephiston