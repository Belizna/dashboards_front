import { Layout, Form, Input, Button } from 'antd';
import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import MenuMain from './components/Menu/MenuMain';
import PagePayments from './pages/credit/PagePayments/PagePayments';
import PageEarlyPayments from './pages/credit/PageEarlyPaymens/PageEarlyPayments';
import PageChartCredit from './pages/credit/PageChartCredit/PageChartCredit';
import PageBooks from './pages/books/horus_heresy/books/PageBooks';
import PageWriteBooks from './pages/books/horus_heresy/write_books/PageWriteBooks';
import PageGamesLibrary from './pages/games/PageGamesLibrary';
import PageGamesLibraryCharts from './pages/games/PageGamesLibraryCharts';
import PageRepair from './pages/repair/pageRepair';
import PageChartsHobby from './pages/hobby/PageChartsHobby';
import PageSalary from './pages/work/PageSalary';
import PageBonus from './pages/work/PageBonus';
import PageChartsWork from './pages/work/PageCartsWork';
import PageMain from './pages/main/PageMain';
import PageMinuiatures from './pages/hobby/pageMiniatures';
import PageCards from './pages/collections/PageCards';
import { useState } from 'react';
import axios from 'axios'
import PageChartsBooks from './pages/books/chartsBooks/PageChartsBooks';
import PageColor from './pages/hobby/pageColor';
import PageChartsRepair from './pages/repair/PageChartsRepair';
import PageChartsCards from './pages/collections/PageChartsCards';
import PageComics from './pages/comics/pageComics';
import PageCardsGroupCharts from './pages/collections/PageCardsGroupCharts';
import PageChartsBooksGroup from './pages/books/chartsBooks/PageChartsBooksGroup';
import PageLoan from './pages/credit/PageLoan/pageLoan';
import PageBeyblade from './pages/collections/PageBeyblades';

const { Sider, Content } = Layout;

const App = () => {
  const onFinish = (values) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login/`, values)
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
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name={['password']}>
                  <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Войти в аккаунт
                  </Button>
                </Form.Item>
              </Form>
            </div>
          } exact />
          <Route
            path="*"
            element={<Navigate to="/auth" replace />}
          />
        </Routes>
        :
        <Layout hasSider>
          <Sider width={270}
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
            <MenuMain />
          </Sider>
          <Layout
            style={{
              marginLeft: 270,
            }}
          >
            <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'initial',
              }}
            >
              <Routes>
                <Route path='/' element={<PageMain year={'2024'} />} exact />
                <Route path='/payments' element={<PagePayments />} exact />
                <Route path='/credit_loan' element={<PageLoan />} exact />
                <Route path='/early_payments' element={<PageEarlyPayments />} exact />
                <Route path='/chart_credit' element={<PageChartCredit />} exact />

                <Route path="/books/:name_book" element={<PageBooks />} exact />
                <Route path='/write_books/:name_book' element={<PageWriteBooks />} exact />
                <Route path='/chart_books/:name_book' element={<PageChartsBooks />} exact />

                <Route path='/games/:library_name' element={<PageGamesLibrary />} exact />
                <Route path='/chart_games' element={<PageGamesLibraryCharts />} exact />

                <Route path='/cards/:collection_card' element={<PageCards />} exact />
                <Route path='/chart_cards/:collection_card' element={<PageChartsCards />} exact />
                <Route path='/beyblades/:beyblade_series' element={<PageBeyblade />} exact />

                <Route path='/charts_group_cards' element={<PageCardsGroupCharts />} exact />
                <Route path='/charts_group_books' element={<PageChartsBooksGroup />} exact />

                <Route path='/salary' element={<PageSalary />} exact />
                <Route path='/bonus' element={<PageBonus />} exact />
                <Route path='/chart_work' element={<PageChartsWork />} exact />
                <Route path='/hobby/miniatures/' element={<PageMinuiatures />} exact />
                <Route path='/hobby/colors/' element={<PageColor />} exact />
                <Route path='/chart_hobby' element={<PageChartsHobby />} exact />

                <Route path='/repair/outlay/' element={<PageRepair />} exact />
                <Route path='/repair/chart/' element={<PageChartsRepair />} exact />

                <Route path='/comics:/comics_collect' element={<PageComics />} exact />

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