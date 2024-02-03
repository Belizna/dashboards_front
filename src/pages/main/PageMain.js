import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card ,Spin, Select, Tabs, Tree, message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LineMain from "../../components/ChartsCredit/LinePulse";
import PieMain from "../../components/ChartsCredit/PieMain";


import "./pageMain.css"

const { Title, Text } = Typography;
const {TabPane} = Tabs

const PageMain = ({year}) => {

  const [staticData, setStaticData] = useState(null)
  const [messageApi, contextHolder] = message.useMessage();

 const fetchStatic = async (years) => {
  console.log(`${process.env.REACT_APP_API_URL}main/static/${years}`)
      await axios.get(`${process.env.REACT_APP_API_URL}main/static/${years}`)
    .then(res => setStaticData(res.data))
  }
  useEffect(() => {
    fetchStatic(year)
  }, [year])

  const handleChange = async (value) => {
    await axios.get(`${process.env.REACT_APP_API_URL}main/static/${value}`)
    .then(res => setStaticData(res.data))
  }

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
  
        <Tabs defaultActiveKey="1">
        <TabPane tab="Статистика" key="1">
        {
        staticData &&
              <div className="tabMain">
                <div className="tab">
                  <div className="tab1_1">
                  <Title level={5}>Сводка за <Select
                      defaultValue={year}
                      onChange={handleChange}
                      style={{ width: 85}}
                      options={[
                        { value: '2024', label: '2024 г.' },
                        { value: '2025', label: '2025 г.' },
                  ]}
                        /> </Title>
                  </div>
                  <div className="tab1_2">
                    <Card style={{height: 230, marginTop:10, marginRight: 10}}>
                   <div className="card">
                      <Text style={{marginTop: -10, marginBottom: 15}}>Покрашено миниатюр: <Text type="success">{staticData.summMiniatures}</Text> </Text>
                      <LineMain data = {staticData.sortedMiniatures}/> 
                      <Text level={5} style={{marginTop: 2,marginBottom: 15}}>Потрачено на миньки: <Text type="success">{staticData.sum_miniatures_nowyear} р.</Text> </Text>
                      <Text level={5} style={{marginTop: -5, marginBottom: 15}}>Потрачено на краску: <Text type="success">{staticData.sum_color_nowyear} р.</Text> </Text>
                      </div>
                    </Card>
                    <Card style={{height: 230, marginTop:10}}>
                   <div className="card">
                      <Text style={{marginTop: -10, marginBottom: 15}}>Прочитано книг: <Text type="success">{staticData.summBooks}</Text> </Text>
                      <LineMain data = {staticData.sortedBooks}/> 
                      <Text level={5} style={{marginTop: 2,marginBottom: 15}}>Потрачено на книги: <Text type="success">{staticData.sum_books_nowyear} р.</Text> </Text>
                      <Text level={5} style={{marginTop: -5,marginBottom: 15}}>Приобретено книг: <Text type="success">{staticData.count_books_price}</Text> </Text>
                      </div>
                    </Card>
                    <Card style={{height: 230, marginTop:10, marginRight: 10}}>
                   <div className="card">
                      <Text style={{marginTop: -10, marginBottom: 15}}>Заработок: <Text type="success">{(staticData.summ_salary_year).toFixed(2)} р.</Text></Text>
                      <LineMain data = {staticData.sortedSalary}/> 
                      <Text level={5} style={{marginTop: 2,marginBottom: 15}}>Оклад: <Text type="success">{(staticData.summ_delta).toFixed(2)} р.</Text></Text>
                      <Text level={5} style={{marginTop: -5, marginBottom: 15}}>Подработки: <Text type="success">{(staticData.summ_bonus_year).toFixed(2)} р.</Text></Text>
                      </div>
                    </Card>
                    <Card style={{height: 230, marginTop:10}}>
                   <div className="card">
                      <Text style={{marginTop: -10, marginBottom: 15}}>Выплачено ипотеки: <Text type="success">{staticData.summPayments} р.</Text> </Text>
                      <LineMain data = {staticData.sortedPayments}/> 
                      <Text level={5} style={{marginTop: 2,marginBottom: 15}}>Ежемесячные платежи: <Text type="success">{staticData.summ_payments} р.</Text> </Text>
                      <Text level={5} style={{marginTop: -5, marginBottom: 15}}>Досрочные платежи: <Text type="success">{staticData.summ_early_payment} р.</Text> </Text>
                      </div>
                    </Card>
                    <Card style={{height: 260, marginTop:10}}>
                   <div className="card_game">
                      <Text style={{marginTop: -10, marginBottom: 15}}>Пройдено игр: <Text type="success">{staticData.summGames}</Text> </Text>
                      <LineMain style={{height: 100}} data = {staticData.sortedGames}/> 
                      
                      <Text level={5} style={{marginTop: 2}}>Потрачено на игры: <Text type="success">{staticData.sum_games_nowyear} р.</Text> </Text>
                      <Text level={5} style={{marginTop: 10}}>Затрачено времени: <Text type="success">{staticData.time_games_nowyear} ч.</Text> </Text>
                      <Text level={5} style={{marginTop: 10}}>Приобретено игр: <Text type="success">{staticData.count_games_price}</Text> </Text>
                      </div>
                    </Card>
                  </div>
                  <div className="tab2_2">
                  <PieMain data={staticData.dataPieCount} />
                  <PieMain data={staticData.dataPiePrice} />
                  </div>
                </div>
              </div>
      }
        </TabPane>
        <TabPane tab="Движения" key="2">
          {staticData &&
          
        <div className="tabMain">
                <div className="tab">
                  <div className="mainTree">
                  <div className="tree">
      
                  <Text style={{marginTop: -10, marginBottom: 15}}>Пройдено игр: <Text type="success">{staticData.summGames}</Text> </Text>
                <Tree style={{width: 380}}
                 onSelect={onSelect}
                      showLine
                      defaultExpandAll={true}
                      treeData={staticData.games_pulse}
                    />
                </div>
             <div className="tree">
             <Text style={{marginTop: -10, marginBottom: 15}}>Прочитано книг: <Text type="success">{staticData.summBooks}</Text> </Text>
                <Tree style={{width: 380}}
                 onSelect={onSelect}
                      showLine
                      defaultExpandAll={true}
                      treeData={staticData.books_pulse}
                    />
                </div>
                <div className="tree">
                <Text style={{marginTop: -10, marginBottom: 15}}>Покрашено миниатюр: <Text type="success">{staticData.summMiniatures}</Text> </Text>
                <Tree style={{width: 380}}
                 onSelect={onSelect}
                      showLine
                      defaultExpandAll={true}
                      treeData={staticData.miniature_pulse}
                    />
                </div>
                <div className="tree">
                <Text level={5} style={{marginTop: -5,marginBottom: 15}}>Приобретено игр: <Text type="success">{staticData.count_games_price}</Text> </Text>
                <Tree style={{width: 380}}
                 onSelect={onSelect}
                      showLine
                      defaultExpandAll={true}
                      treeData={staticData.games_price_pulse}
                    />
                </div>
                <div className="tree">
                <Text level={5} style={{marginTop: -5,marginBottom: 15}}>Приобретено книг: <Text type="success">{staticData.count_books_price}</Text> </Text>
                <Tree style={{width: 380}}
                 onSelect={onSelect}
                      showLine
                      defaultExpandAll={true}
                      treeData={staticData.books_price_pulse}
                    />
                </div>
                <div className="tree">
                <Text level={5} style={{marginTop: -5,marginBottom: 15}}>Приобретено миниатюр: <Text type="success">{staticData.count_miniatures_price}</Text> </Text>
                <Tree style={{width: 380}}
                onSelect={onSelect}
                      showLine
                      defaultExpandAll={true}
                      treeData={staticData.miniatures_price_pulse}
                    />
                </div>
                  </div>
                  </div> 
                  </div>
}
        </TabPane>
        <TabPane tab="Задачи" key="3">
        {staticData &&
          
          <div className="tabMain">
                  <div className="tab">
                    <div className="mainTree">
                    <div className="tree">
      
      <Text style={{marginTop: -10, marginBottom: 15}}>Книги к покупке: <Text type="success">{staticData.books_list_count}</Text> </Text>
    <Tree style={{width: 380}}
     onSelect={onSelect}
          showLine
          treeData={staticData.books_price}
        />
    </div>
 <div className="tree">
 <Text style={{marginTop: -10, marginBottom: 15}}>Игры к прохождению: <Text type="success">{staticData.game_over_count}</Text> </Text>
    <Tree style={{width: 380}}
     onSelect={onSelect}
          showLine
          treeData={staticData.game_over}
        />
    </div>

    <div className="tree">
 <Text style={{marginTop: -10, marginBottom: 15}}>Книги к прочтению: <Text type="success">{staticData.books_write_count}</Text> </Text>
    <Tree style={{width: 380}}
     onSelect={onSelect}
          showLine
          treeData={staticData.books_write}
        />
    </div>

                      </div>
                      </div>
                      </div>}
        </TabPane>
        </Tabs>
        </>}
      </>
      
    )
}
export default PageMain