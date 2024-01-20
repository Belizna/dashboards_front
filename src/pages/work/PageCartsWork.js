import React, {useEffect, useState} from "react";
import axios from "axios";
import PieWork from "../../components/Work/PieWork";
import DemoDualAxes from "../../components/Work/DualAxesWork"
import { Typography, Card} from 'antd';

import './pageChartsWork.css'
const {Title, Text} = Typography;



const PageChartsWork = () => {
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}weekend/work/charts`)
        .then(res => setStaticData(res.data))
      }, [])

      const [staticData, setStaticData] = useState(0) 
      const salary_year = staticData.salary_year
      const salary_company = staticData.salary_company
      const bonus_year = staticData.bonus_year
      const bonus_month = staticData.bonus_month
      const salary_month = staticData.salary_month
    return(
    <>
        <div className="pageChartGames">
            <div className="pieGroup">
                <div className="pie">
                        <PieWork staticData={salary_year} />
                        <Title style={{marginTop: -10}} level={5}>Процент заработка по годам</Title>
                </div>
                <div className="pie">
                        <PieWork staticData={salary_company} />
                        <Title style={{marginTop: -10}} level={5}>Процент заработка по компаниям</Title>
                </div>
                <div className="pie">
                        <PieWork staticData={bonus_year} />
                        <Title style={{marginTop: -10}} level={5}>Процент подработок по годам</Title>
                </div>
            </div>
            <div className="lineWorkGroup">
                <div className="lineWork">
                <DemoDualAxes staticData={bonus_month} conf='bonus'/>
                <Title style={{marginTop: 10}} level={5}>Подработки по месяцам</Title>
                </div>
                <div className="lineWork">
                <DemoDualAxes staticData={salary_month} conf='salary'/>
                <Title style={{marginTop: 10}} level={5}>Зарплата по месяцам</Title>
                </div>
        
            </div>
            <div className="table"><Card>
                <Title style={{marginTop: -10}} level={4}>Не выплачено</Title>
                <Text style={{marginLeft: 40}} strong type="danger">{(staticData.summ_bonus).toFixed(2)}р.</Text>
                </Card>
            </div>
        </div>
    </>
    )
}   

export default PageChartsWork;