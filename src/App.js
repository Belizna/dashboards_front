import { Layout, Form, Input , Button} from 'antd';
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
import {useState } from 'react';
import axios from 'axios'
import PageChartsBooks from './pages/books/chartsBooks/PageChartsBooks';
import PageColor from './pages/hobby/pageColor';
import PageChartsRepair from './pages/repair/PageChartsRepair';
import PageChartsCards from './pages/collections/PageChartsCards';
import PageComics from './pages/comics/pageComics';

const { Sider, Content } = Layout;

const App = () => {
  const onFinish = (values) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login/`,values)
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
              <Route path='/chart_black_legion' element={<PageChartsBooks name_book='Черный Легион'/>} exact/>

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
              <Route path='/chart_mephiston' element={<PageChartsBooks name_book='Мефистон'/>} exact/>

              <Route path='/books_mars' element={<PageBooks name_book='Кузницы Марса'/>} exact/>
              <Route path='/write_mars' element={<PageWriteBooks name_book='Кузницы Марса'/>} exact/>
              <Route path='/chart_mars' element={<PageChartsBooks name_book='Кузницы Марса'/>} exact/>

              <Route path='/books_Vaults_of_Terra' element={<PageBooks name_book='Крипты Терры'/>} exact/>
              <Route path='/write_Vaults_of_Terra' element={<PageWriteBooks name_book='Крипты Терры'/>} exact/>
              <Route path='/chart_Vaults_of_Terra' element={<PageChartsBooks name_book='Крипты Терры'/>} exact/>

              <Route path='/books_Watchers_of_the_Throne' element={<PageBooks name_book='Хранители Трона'/>} exact/>
              <Route path='/write_Watchers_of_the_Throne' element={<PageWriteBooks name_book='Хранители Трона'/>} exact/>
              <Route path='/chart_Watchers_of_the_Throne' element={<PageChartsBooks name_book='Хранители Трона'/>} exact/>

              <Route path='/books_Sisters_of_Battle' element={<PageBooks name_book='Сёстры Битвы'/>} exact/>
              <Route path='/write_Sisters_of_Battle' element={<PageWriteBooks name_book='Сёстры Битвы'/>} exact/>
              <Route path='/chart_Sisters_of_Battle' element={<PageChartsBooks name_book='Сёстры Битвы'/>} exact/>

              <Route path='/books_Lucius' element={<PageBooks name_book='Люций'/>} exact/>
              <Route path='/write_Lucius' element={<PageWriteBooks name_book='Люций'/>} exact/>
              <Route path='/chart_Lucius' element={<PageChartsBooks name_book='Люций'/>} exact/>

              <Route path='/books_Deathwatch' element={<PageBooks name_book='Караул Смерти'/>} exact/>
              <Route path='/write_Deathwatch' element={<PageWriteBooks name_book='Караул Смерти'/>} exact/>
              <Route path='/chart_Deathwatch' element={<PageChartsBooks name_book='Караул Смерти'/>} exact/>

              <Route path='/books_Iron_Warriors' element={<PageBooks name_book='Железные Воины'/>} exact/>
              <Route path='/write_Iron_Warriors' element={<PageWriteBooks name_book='Железные Воины'/>} exact/>
              <Route path='/chart_Iron_Warriors' element={<PageChartsBooks name_book='Железные Воины'/>} exact/>
              
              <Route path='/books_person' element={<PageBooks name_book='Персонажи'/>} exact/>
              <Route path='/write_person' element={<PageWriteBooks name_book='Персонажи'/>} exact/>
              <Route path='/chart_person' element={<PageChartsBooks name_book='Персонажи'/>} exact/>

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

              <Route path='/books_salamanders' element={<PageBooks name_book='Саламандры'/>} exact/>
              <Route path='/write_salamanders' element={<PageWriteBooks name_book='Саламандры'/>} exact/>
              <Route path='/chart_salamanders' element={<PageChartsBooks name_book='Саламандры'/>} exact/>

              <Route path='/books_Space_Marine' element={<PageBooks name_book='Завоевания Космодесанта'/>} exact/>
              <Route path='/write_Space_Marine' element={<PageWriteBooks name_book='Завоевания Космодесанта'/>} exact/>
              <Route path='/chart_Space_Marine' element={<PageChartsBooks name_book='Завоевания Космодесанта'/>} exact/>

              <Route path='/books_blood_of_Asaheim' element={<PageBooks name_book='Кровь Асахейма'/>} exact/>
              <Route path='/write_blood_of_Asaheim' element={<PageWriteBooks name_book='Кровь Асахейма'/>} exact/>
              <Route path='/chart_blood_of_Asaheim' element={<PageChartsBooks name_book='Кровь Асахейма'/>} exact/>

              <Route path='/books_Enforcer' element={<PageBooks name_book='Арбитр'/>} exact/>
              <Route path='/write_Enforcer' element={<PageWriteBooks name_book='Арбитр'/>} exact/>
              <Route path='/chart_Enforcer' element={<PageChartsBooks name_book='Арбитр'/>} exact/>

              <Route path='/books_Armageddon' element={<PageBooks name_book='Армагеддон'/>} exact/>
              <Route path='/write_Armageddon' element={<PageWriteBooks name_book='Армагеддон'/>} exact/>
              <Route path='/chart_Armageddon' element={<PageChartsBooks name_book='Армагеддон'/>} exact/>

              <Route path='/books_twice_dead_king' element={<PageBooks name_book='Дважды мёртвый царь'/>} exact/>
              <Route path='/write_twice_dead_king' element={<PageWriteBooks name_book='Дважды мёртвый царь'/>} exact/>
              <Route path='/chart_twice_dead_king' element={<PageChartsBooks name_book='Дважды мёртвый царь'/>} exact/>

              <Route path='/books_Crime' element={<PageBooks name_book='Warhammer Crime'/>} exact/>
              <Route path='/write_Crime' element={<PageWriteBooks name_book='Warhammer Crime'/>} exact/>
              <Route path='/chart_Crime' element={<PageChartsBooks name_book='Warhammer Crime'/>} exact/>


              <Route path='/books_war_Fenris' element={<PageBooks name_book='Война за Фенрис'/>} exact/>
              <Route path='/write_war_Fenris' element={<PageWriteBooks name_book='Война за Фенрис'/>} exact/>
              <Route path='/chart_war_Fenris' element={<PageChartsBooks name_book='Война за Фенрис'/>} exact/>

              <Route path='/books_Severina_Raine' element={<PageBooks name_book='Северина Рейн'/>} exact/>
              <Route path='/write_Severina_Raine' element={<PageWriteBooks name_book='Северина Рейн'/>} exact/>
              <Route path='/chart_Severina_Raine' element={<PageChartsBooks name_book='Северина Рейн'/>} exact/>

              <Route path='/books_Carcharodons' element={<PageBooks name_book='Кархародоны'/>} exact/>
              <Route path='/write_Carcharodons' element={<PageWriteBooks name_book='Кархародоны'/>} exact/>
              <Route path='/chart_Carcharodons' element={<PageChartsBooks name_book='Кархародоны'/>} exact/>

              <Route path='/books_Macharian_Crusade' element={<PageBooks name_book='Крестовый поход Махариуса'/>} exact/>
              <Route path='/write_Macharian_Crusade' element={<PageWriteBooks name_book='Крестовый поход Махариуса'/>} exact/>
              <Route path='/chart_Macharian_Crusade' element={<PageChartsBooks name_book='Крестовый поход Махариуса'/>} exact/>

              <Route path='/books_Rogue_Trader' element={<PageBooks name_book='Вольный Торговец'/>} exact/>
              <Route path='/write_Rogue_Trader' element={<PageWriteBooks name_book='Вольный Торговец'/>} exact/>
              <Route path='/chart_Rogue_Trader' element={<PageChartsBooks name_book='Вольный Торговец'/>} exact/>
              
              <Route path='/books_war_horus' element={<PageBooks name_book='Хорусианские Войны'/>} exact/>
              <Route path='/write_war_horus' element={<PageWriteBooks name_book='Хорусианские Войны'/>} exact/>
              <Route path='/chart_war_horus' element={<PageChartsBooks name_book='Хорусианские Войны'/>} exact/>

              <Route path='/steam_games' element={<PageGamesLibrary library_name='Steam'/>} exact/>
              <Route path='/ubi_games' element={<PageGamesLibrary library_name='Ubisoft Connect'/>} exact/>
              <Route path='/ps_games' element={<PageGamesLibrary library_name='PlayStation'/>} exact/>
              <Route path='/chart_games' element={<PageGamesLibraryCharts/>} exact/>

              <Route path='/all_card_fighting' element={<PageCards collection_card='Боевая четверка'/>} exact/>
              <Route path='/all_card_shadow' element={<PageCards collection_card='Воины тени'/>} exact/>
              <Route path='/all_card_brothers' element={<PageCards collection_card='Братья по оружию'/>} exact/>

              <Route path='/chart_card_fighting' element={<PageChartsCards collection_card='Боевая четверка'/>} exact/>
              <Route path='/chart_card_shadow' element={<PageChartsCards collection_card='Воины тени'/>} exact/>
              <Route path='/chart_card_brothers' element={<PageChartsCards collection_card='Братья по оружию'/>} exact/>

              <Route path='/all_spider_part_1' element={<PageCards collection_card='Герои и Злодеи'/>} exact/>
              <Route path='/all_spider_part_2' element={<PageCards collection_card='Герои и Злодеи. 2-я часть.'/>} exact/>
              <Route path='/all_spider_part_3' element={<PageCards collection_card='Герои и Злодеи. 3-я часть.'/>} exact/>
              <Route path='/all_spider_part_4' element={<PageCards collection_card='Герои и Злодеи. 4-я часть.'/>} exact/>

              <Route path='/chart_spider_part_1' element={<PageChartsCards collection_card='Герои и Злодеи'/>} exact/>
              <Route path='/chart_spider_part_2' element={<PageChartsCards collection_card='Герои и Злодеи. 2-я часть.'/>} exact/>
              <Route path='/chart_spider_part_3' element={<PageChartsCards collection_card='Герои и Злодеи. 3-я часть.'/>} exact/>
              <Route path='/chart_spider_part_4' element={<PageChartsCards collection_card='Герои и Злодеи. 4-я часть.'/>} exact/>

              <Route path='/all_bakugan' element={<PageCards collection_card='Отчаянные бойцы'/>} exact/>
              <Route path='/all_bakugan_new_Vestroia' element={<PageCards collection_card='Отчаянные бойцы - Новая Вестроя'/>} exact/>

              <Route path='chart_bakugan' element={<PageChartsCards collection_card='Отчаянные бойцы'/>} exact/>
              <Route path='/chart_bakugan_new_Vestroia' element={<PageChartsCards collection_card='Отчаянные бойцы - Новая Вестроя'/>} exact/>

              <Route path='/all_beyblade' element={<PageCards collection_card='Beyblade Metal Fusion'/>} exact/>
              <Route path='/chart_beyblade' element={<PageChartsCards collection_card='Beyblade Metal Fusion'/>} exact/>

              <Route path='/all_transformers' element={<PageCards collection_card='Transformers Prime'/>} exact/>
              <Route path='/chart_transformers' element={<PageChartsCards collection_card='Transformers Prime'/>} exact/>

              <Route path='/salary' element={<PageSalary/>} exact/>
              <Route path='/bonus' element={<PageBonus/>} exact/>
              <Route path='/chart_work' element={<PageChartsWork/>} exact/>
              <Route path='/hobby/miniatures/' element={<PageMinuiatures/>} exact/>
              <Route path='/hobby/colors/' element={<PageColor/>} exact/>
              <Route path='/chart_hobby' element={<PageChartsHobby/>} exact/>
              
              <Route path='/repair/outlay/' element={<PageRepair/>} exact/>
              <Route path='/repair/chart/' element={<PageChartsRepair/>} exact/>

              <Route path='/comics_marvel/' element={<PageComics comics_collect={'Marvel Comics'}/>} exact/>
              <Route path='/comics_dc/' element={<PageComics comics_collect={'DC Comics'}/>} exact/>
              
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