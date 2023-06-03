import { Layout, Form, Input , Button, Calendar} from 'antd';
import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import MenuMain from './components/Menu/MenuMain';
import PagePayments from './pages/credit/PagePayments/PagePayments';
import PageEarlyPayments from './pages/credit/PageEarlyPaymens/PageEarlyPayments';
import PageChartCredit from './pages/credit/PageChartCredit/PageChartCredit';
import PageBooks from './pages/books/horus_heresy/books/PageBooks';
import {useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios'

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
      <Layout>
        <Sider width={250}
            style={{background: '#FDD0AF'}}>
          <MenuMain/>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '47px 26px',
              padding: 24,
              background: '#8ECDC7',
            }}
          >
            <Routes>
            <Route path='/' element={<Calendar 
            style={{paddingRight: 45, paddingLeft: 45, paddingTop:45, paddingBlock: 45}} value={value} 
            onSelect={onSelect} onPanelChange={onPanelChange}/>} exact/>
              <Route path='/payments' element={<PagePayments/>} exact/>
              <Route path='/early_payments' element={<PageEarlyPayments/>} exact/>
              <Route path='/chart_credit' element={<PageChartCredit/>} exact/>
              <Route path='/books_heresy' element={<PageBooks/>} exact/>
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