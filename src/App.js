import { Layout, Form, Input , Button, Calendar} from 'antd';
import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import MenuMain from './components/Menu/MenuMain';
import PagePayments from './pages/credit/PagePayments/PagePayments';
import PageEarlyPayments from './pages/credit/PageEarlyPaymens/PageEarlyPayments';
import PageChartCredit from './pages/credit/PageChartCredit/PageChartCredit';
import PageBooks from './pages/books/horus_heresy/books/PageBooks';
import PageBooksSiege from './pages/books/siege_terra/books/PageBooksSiege';
import PageBooksInquisition from './pages/books/inquisition/books/PageBooksInquisition';
import PageWriteBooks from './pages/books/horus_heresy/write_books/PageWriteBooks';
import PageWriteBooksInq from './pages/books/inquisition/write_books/PageWriteBooksInq';
import PageWriteBooksSie from './pages/books/siege_terra/write_books/PageWriteBooksSie';
import PageGamesLibrary from './pages/games/gamesLibrary/PageGamesLibrary';
import PageGamesLibraryUbi from './pages/games/gamesLibrary/PageGamesLibrary_Ubi';
import PageGamesLibraryCharts from './pages/games/gamesLibrary/PageGamesLibraryCharts'
import PageChartsSiege from './pages/books/chartsBooks/PageChartsSiege';
import PageChartsInquisition from './pages/books/chartsBooks/PageChartsInquisition';
import PageChartsComissar from './pages/books/chartsBooks/PageChartsComissar';
import PageBooksComissar from './pages/books/comissar/books/PageBooksComissar';
import PageWriteBooksComissar  from './pages/books/comissar/write_books/PageWriteComissar';
import PageChartsHobby from './pages/hobby/PageChartsHobby';
import PageSalary from './pages/work/PageSalary';
import PageBonus from './pages/work/PageBonus';
import PageChartsWork from './pages/work/PageCartsWork';
import PageMinuiatures from './pages/hobby/pageMiniatures';
import {useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios'
import PageChartsHorusHeresy from './pages/books/chartsBooks/PageChartsHorusHeresy';
import PageColor from './pages/hobby/pageColor';

const { Sider, Content } = Layout;

const App = () => {

  console.log(process.env.REACT_APP_API_URL)

  const onFinish = (values) => {
    axios.post(`${process.env.REACT_APP_API_URL}auth/login/`,values)
    .then(res => setAuth(res.data))
}

const onSelect = (newValue) => {
  setValue(newValue);
};
const onPanelChange = (newValue) => {
  setValue(newValue);
};

const [value, setValue] = useState(() => dayjs(Date.now()));
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
            marginLeft: 200,
          }}
        >
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <Routes>
            <Route path='/' element={<Calendar
            style={{paddingRight: 45, paddingLeft: 45, paddingTop:45, paddingBlock: 45}} value={value} 
            onSelect={onSelect} onPanelChange={onPanelChange}/>} exact/>
              <Route path='/payments' element={<PagePayments/>} exact/>
              <Route path='/early_payments' element={<PageEarlyPayments/>} exact/>
              <Route path='/chart_credit' element={<PageChartCredit/>} exact/>
              <Route path='/books_heresy' element={<PageBooks name_book='Ересь Хоруса'/>} exact/>
              <Route path='/books_siege' element={<PageBooksSiege name_book='Осада Терры'/>} exact/>
              <Route path='/books_inquisition' element={<PageBooksInquisition name_book='Инквизитор'/>} exact/>
              <Route path='/books_comissar' element={<PageBooksComissar name_book='Комиссар Каин'/>} exact/>
              <Route path='/write_heresy' element={<PageWriteBooks name_book='Ересь Хоруса'/>} exact/>
              <Route path='/write_siege' element={<PageWriteBooksSie name_book='Осада Терры'/>} exact/>
              <Route path='/write_inquisition' element={<PageWriteBooksInq name_book='Инквизитор'/>} exact/>
              <Route path='/write_comissar' element={<PageWriteBooksComissar name_book='Комиссар Каин'/>} exact/>
              <Route path='/steam_games' element={<PageGamesLibrary library_name='Steam'/>} exact/>
              <Route path='/ubi_games' element={<PageGamesLibraryUbi library_name='Ubisoft Connect'/>} exact/>
              <Route path='/chart_games' element={<PageGamesLibraryCharts/>} exact/>
              <Route path='/chart_heresy' element={<PageChartsHorusHeresy/>} exact/>
              <Route path='/chart_inquisition' element={<PageChartsInquisition/>} exact/>
              <Route path='/chart_comissar' element={<PageChartsComissar/>} exact/>
              <Route path='/chart_siege' element={<PageChartsSiege/>} exact/>
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