import React, {useEffect, useState} from "react";
import axios from "axios";
import PieWork from "../../components/Work/PieWork";
import DemoDualAxes from "../../components/Work/DualAxesWork"
import { Typography, Spin, Card} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './pageChartsWork.css'
const {Title, Text} = Typography;



const PageChartsWork = () => {
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}weekend/work/charts`)
        .then(res => setStaticData(res.data))
      }, [])

      const [staticData, setStaticData] = useState(null) 
    return(
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
                        <PieWork staticData={staticData.salary_year} />
                        <Title style={{marginTop: -10}} level={5}>Процент заработка по годам</Title>
                </div>
                <div className="pie">
                        <PieWork staticData={staticData.salary_companyy} />
                        <Title style={{marginTop: -10}} level={5}>Процент заработка по компаниям</Title>
                </div>
                <div className="pie">
                        <PieWork staticData={staticData.bonus_year} />
                        <Title style={{marginTop: -10}} level={5}>Процент подработок по годам</Title>
                </div>
            </div>
            <div className="lineWorkGroup">
                <div className="lineWork">
                <DemoDualAxes staticData={staticData.bonus_month} conf='bonus'/>
                <Title style={{marginTop: 10}} level={5}>Подработки по месяцам</Title>
                </div>
                <div className="lineWork">
                <DemoDualAxes staticData={staticData.salary_month} conf='salary'/>
                <Title style={{marginTop: 10}} level={5}>Зарплата по месяцам</Title>
                </div>
        
            </div>
            <div className="table"><Card>
                <Title style={{marginTop: -10}} level={4}>Не выплачено</Title>
                <Text style={{marginLeft: 40}} strong type="danger">{(staticData.summ_bonus).toFixed(2)}р.</Text>
                </Card>
            </div>
        </div>
        </>}
    </>
    )
}   

export default PageChartsWork;