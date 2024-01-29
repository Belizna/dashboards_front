import React, {useEffect, useState} from "react";
import axios from "axios";
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoLineGames from "../../../components/ChartsCredit/LineGames"
import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Card,Spin} from 'antd';

const {Title, Text} = Typography;


const PageChartsDarkHeresy = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}books/static/Тёмная Ересь`)
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
                <Title style={{marginTop: -10}} level={5}>Процент прочитанных книг</Title>
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

export default PageChartsDarkHeresy