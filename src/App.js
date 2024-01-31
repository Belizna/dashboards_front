import { Layout, Form, Input , Button} from 'antd';
import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import MenuMain from './components/Menu/MenuMain';
import PagePayments from './pages/credit/PagePayments/PagePayments';
import PageEarlyPayments from './pages/credit/PageEarlyPaymens/PageEarlyPayments';
import PageChartCredit from './pages/credit/PageChartCredit/PageChartCredit';
import PageBooks from './pages/books/horus_heresy/books/PageBooks';
import PageWriteBooks from './pages/books/horus_heresy/write_books/PageWriteBooks';
import PageGamesLibrary from './pages/games/gamesLibrary/PageGamesLibrary';
import PageGamesLibraryUbi from './pages/games/gamesLibrary/PageGamesLibrary_Ubi';
import PageGamesLibraryCharts from './pages/games/gamesLibrary/PageGamesLibraryCharts'
import PageChartsHobby from './pages/hobby/PageChartsHobby';
import PageSalary from './pages/work/PageSalary';
import PageBonus from './pages/work/PageBonus';
import PageChartsWork from './pages/work/PageCartsWork';
import PageMain from './pages/main/PageMain';
import PageMinuiatures from './pages/hobby/pageMiniatures';
import {useState } from 'react';
import axios from 'axios'
import PageChartsBooks from './pages/books/chartsBooks/PageChartsBooks';
import PageColor from './pages/hobby/pageColor';

const { Sider, Content } = Layout;

const App = () => {
  const onFinish = (values) => {
    axios.post(`${process.env.REACT_APP_API_URL}auth/login/`,values)
    .then(res => setAuth(res.data))
}
  const [auth, setAuth] = useState(null)
  return (
    <>
    {!auth ?

      <Routes>
      <Route path="/auth" element={
        <div className="form_auth">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
        <Form onFinish={onFinish} className="login-form">
        <Form.Item name={['email']}>
      <Input placeholder="Email"/>
        </Form.Item>
          <Form.Item name={['password']}>
            <Input.Password placeholder="Пароль"/>
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit">
              Войти в аккаунт
            </Button>
                </Form.Item>
              </Form>
          </div>
      } exact/>
        <Route
           path="*"
           element={<Navigate to="/auth" replace />}
         />
        </Routes>
        :
        <Layout hasSider>
        <Sider width={250}
          style={{
            background: '#f5f5f5',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <MenuMain/>
        </Sider>
        <Layout
          style={{
            marginLeft: 250,
          }}
        >
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <Routes>
            <Route path='/' element={<PageMain year={'2024'}/>} exact/>
              <Route path='/payments' element={<PagePayments/>} exact/>
              <Route path='/early_payments' element={<PageEarlyPayments/>} exact/>
              <Route path='/chart_credit' element={<PageChartCredit/>} exact/>

              <Route path='/books_heresy' element={<PageBooks name_book='Ересь Хоруса'/>} exact/>
              <Route path='/write_heresy' element={<PageWriteBooks name_book='Ересь Хоруса'/>} exact/>
              <Route path='/chart_heresy' element={<PageChartsBooks name_book='Ересь Хоруса'/>} exact/>

              <Route path='/books_siege' element={<PageBooks name_book='Осада Терры'/>} exact/>
              <Route path='/write_siege' element={<PageWriteBooks name_book='Осада Терры'/>} exact/>
              <Route path='/chart_siege' element={<PageChartsBooks name_book='Осада Терры'/>} exact/>

              <Route path='/books_inquisition' element={<PageBooks name_book='Инквизитор'/>} exact/>
              <Route path='/write_inquisition' element={<PageWriteBooks name_book='Инквизитор'/>} exact/>
              <Route path='/chart_inquisition' element={<PageChartsBooks name_book='Инквизитор'/>} exact/>

              <Route path='/books_comissar' element={<PageBooks name_book='Комиссар Каин'/>} exact/>
              <Route path='/write_comissar' element={<PageWriteBooks name_book='Комиссар Каин'/>} exact/>
              <Route path='/chart_comissar' element={<PageChartsBooks name_book='Комиссар Каин'/>} exact/>

              <Route path='/books_primarch' element={<PageBooks name_book='Примархи'/>} exact/>
              <Route path='/write_primarch' element={<PageWriteBooks name_book='Примархи'/>} exact/>
              <Route path='/chart_primarch' element={<PageChartsBooks name_book='Примархи'/>} exact/>

              <Route path='/books_ahriman' element={<PageBooks name_book='Ариман'/>} exact/>
              <Route path='/write_ahriman' element={<PageWriteBooks name_book='Ариман'/>} exact/>
              <Route path='/chart_ahriman' element={<PageChartsBooks name_book='Ариман'/>} exact/>

              <Route path='/books_fabius' element={<PageBooks name_book='Фабий Байл'/>} exact/>
              <Route path='/write_fabius' element={<PageWriteBooks name_book='Фабий Байл'/>} exact/>
              <Route path='/chart_fabius' element={<PageChartsBooks name_book='Фабий Байл'/>} exact/>

              <Route path='/books_dark_imperium' element={<PageBooks name_book='Темный Империум'/>} exact/>
              <Route path='/write_dark_imperium' element={<PageWriteBooks name_book='Темный Империум'/>} exact/>
              <Route path='/chart_dark_imperium' element={<PageChartsBooks name_book='Темный Империум'/>} exact/>

              <Route path='/books_black_legion' element={<PageBooks name_book='Черный Легион'/>} exact/>
              <Route path='/write_black_legion' element={<PageWriteBooks name_book='Черный Легион'/>} exact/>
              <Route path='/chart_black_legion' element={<PageChartsBooks name_book='Темный Империум'/>} exact/>

              <Route path='/books_coming' element={<PageBooks name_book='Пришествие зверя'/>} exact/>
              <Route path='/write_coming' element={<PageWriteBooks name_book='Пришествие зверя'/>} exact/>
              <Route path='/chart_coming' element={<PageChartsBooks name_book='Пришествие зверя'/>} exact/>

              <Route path='/books_night_lords' element={<PageBooks name_book='Повелители Ночи'/>} exact/>
              <Route path='/write_night_lords' element={<PageWriteBooks name_book='Повелители Ночи'/>} exact/>
              <Route path='/chart_night_lords' element={<PageChartsBooks name_book='Повелители Ночи'/>} exact/>

              <Route path='/books_dark_heresy' element={<PageBooks name_book='Тёмная Ересь'/>} exact/>
              <Route path='/write_dark_heresy' element={<PageWriteBooks name_book='Тёмная Ересь'/>} exact/>
              <Route path='/chart_dark_heresy' element={<PageChartsBooks name_book='Тёмная Ересь'/>} exact/>

              <Route path='/books_mephiston' element={<PageBooks name_book='Мефистон'/>} exact/>
              <Route path='/write_mephiston' element={<PageWriteBooks name_book='Мефистон'/>} exact/>
              <Route path='/chart_mephiston' element={<PageChartsBooks name_book='Тёмная Ересь'/>} exact/>

              <Route path='/books_mars' element={<PageBooks name_book='Кузницы Марса'/>} exact/>
              <Route path='/write_mars' element={<PageWriteBooks name_book='Кузницы Марса'/>} exact/>
              <Route path='/chart_mars' element={<PageChartsBooks name_book='Кузницы Марса'/>} exact/>

              <Route path='/books_ohter' element={<PageBooks name_book='Отдельные романы'/>} exact/>
              <Route path='/write_ohter' element={<PageWriteBooks name_book='Отдельные романы'/>} exact/>
              <Route path='/chart_ohter' element={<PageChartsBooks name_book='Отдельные романы'/>} exact/>

              <Route path='/books_dawn_of_fire' element={<PageBooks name_book='Огненная Заря'/>} exact/>
              <Route path='/write_dawn_of_fire' element={<PageWriteBooks name_book='Огненная Заря'/>} exact/>
              <Route path='/chart_dawn_of_fire' element={<PageChartsBooks name_book='Огненная Заря'/>} exact/>

              <Route path='/books_word_bearers' element={<PageBooks name_book='Несущие Слово'/>} exact/>
              <Route path='/write_word_bearers' element={<PageWriteBooks name_book='Несущие Слово'/>} exact/>
              <Route path='/chart_word_bearers' element={<PageChartsBooks name_book='Несущие Слово'/>} exact/>

              <Route path='/books_soul_drinkers' element={<PageBooks name_book='Испивающие Души'/>} exact/>
              <Route path='/write_soul_drinkers' element={<PageWriteBooks name_book='Испивающие Души'/>} exact/>
              <Route path='/chart_soul_drinkers' element={<PageChartsBooks name_book='Испивающие Души'/>} exact/>

              <Route path='/books_war_horus' element={<PageBooks name_book='Хорусианские Войны'/>} exact/>
              <Route path='/write_war_horus' element={<PageWriteBooks name_book='Хорусианские Войны'/>} exact/>
              <Route path='/chart_war_horus' element={<PageChartsBooks name_book='Хорусианские Войны'/>} exact/>

              <Route path='/steam_games' element={<PageGamesLibrary library_name='Steam'/>} exact/>
              <Route path='/ubi_games' element={<PageGamesLibraryUbi library_name='Ubisoft Connect'/>} exact/>
              <Route path='/chart_games' element={<PageGamesLibraryCharts/>} exact/>

              <Route path='/salary' element={<PageSalary/>} exact/>
              <Route path='/bonus' element={<PageBonus/>} exact/>
              <Route path='/chart_work' element={<PageChartsWork/>} exact/>
              <Route path='/hobby/miniatures/' element={<PageMinuiatures/>} exact/>
              <Route path='/hobby/colors/' element={<PageColor/>} exact/>
              <Route path='/chart_hobby' element={<PageChartsHobby/>} exact/>
              
              <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    }
    </>
  );
};
export default App;