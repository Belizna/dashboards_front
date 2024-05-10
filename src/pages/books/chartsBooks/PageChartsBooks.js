import React, {useEffect, useState} from "react";
import axios from "axios";
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoPie from "../../../components/ChartsCredit/Pie";
import DemoLineGames from "../../../components/ChartsCredit/LineGames"
import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Card,Spin} from 'antd';
import './pageHorusHeresyCharts.css'

const {Title, Text} = Typography;


const PageChartsBooks = ({name_book}) => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}books/static/${name_book}`)
        .then(res => setStaticData(res.data))
      }, [name_book])

      const [staticData, setStaticData] = useState(0)

    return(
        <>
        {staticData === 0 ? 
        <>
          <div className="loader">
          <Spin indicator={<LoadingOutlined style={{fontSize: 80}} spin/>}/>
          </div>
        </> : 
          <>
        <div className="pageChartGames">
            <div className="liquid">
                <DemoLiquid percentPay={staticData.booksProcentStatic}/>
                <Title style={{marginTop: -10}} level={5}>Процент прочитанного цикла</Title>
            </div>
            <div className="pieGroup">
                {staticData.booksDataRomans && <div className="pie">
                <DemoPie data={staticData.booksDataRomans}/>
                    <Title style={{marginTop: -10}} level={5}>Процент прочитанных романов</Title>
                </div> }
                {staticData.booksDataBigStory && <div className="pie">
                <DemoPie data={staticData.booksDataBigStory}/>
                    <Title style={{marginTop: -30}} level={5}>Процент прочитанных повестей</Title>
                </div> }
                {staticData.booksDataStory && <div className="pie">
                <DemoPie data={staticData.booksDataStory}/>
                <Title style={{marginTop: -30}} level={5}>Процент прочитанных рассказов</Title>
                </div> }
            </div>
            <div className="lineGames">
                <DemoLineGames data={staticData.booksDataDemoLine}/>
                <Title level={5}>Общая сводка</Title> 
            </div>
            <div className="table">
            <Card style={{width: 245}}>
                <Title style={{marginTop: -10}} level={5}>Потрачено на книги</Title>
                <Text style={{marginLeft: 65}} strong type="danger">{staticData.booksPriceSum}р.</Text>
                </Card>
                <Card style={{width: 245}}>
                <Title style={{marginTop: -10}} level={5}>Приобретено книг</Title>
                <Text style={{marginLeft: 71}} strong type="danger">
                  {staticData.booksPriceCount} / {staticData.booksCount}</Text>
                </Card>
            </div>
        </div>
        </>}
    </>
    )
}

export default PageChartsBooks