import {BankOutlined, BookOutlined,AreaChartOutlined,
   StarOutlined, DesktopOutlined,WalletOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import {useNavigate } from 'react-router-dom'

import "./menu.css"

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Главная страница', 'sub6', <AreaChartOutlined />),

    getItem('Кредиты', 'sub1', <BankOutlined />, [
      getItem('Ипотека', 'g1', null, [
        getItem('График платежей', '/payments'), 
        getItem('Досрочные погашения', '/early_payments'),
        getItem('Charts', '/chart_credit')]),
  ]),

    getItem('Книги', 'sub2', <BookOutlined />, [
      getItem('Warhammer', 'sub2-2', null , [
        getItem('Ересь Хоруса', 'g2', null, [
          getItem('Все книги', '/books_heresy'), 
          getItem('Порядок чтения', '/write_heresy'),
          getItem('Charts', '/chart_heresy')]),
        
        getItem('Осада Терры', 'g3', null, [
          getItem('Все книги', '/books_siege'), 
          getItem('Порядок чтения', '/write_siege'),
          getItem('Charts', '/chart_siege')]),

          getItem('Примархи', 'g6', null, [
            getItem('Все книги', '/books_primarch'), 
            getItem('Порядок чтения', '/write_primarch'),
            getItem('Charts', '/chart_primarch')]),

            getItem('Ариман', 'g7', null, [
              getItem('Все книги', '/books_ahriman'), 
              getItem('Порядок чтения', '/write_ahriman'),
              getItem('Charts', '/chart_ahriman')]),

              getItem('Черный Легион', 'g10', null, [
                getItem('Все книги', '/books_black_legion'), 
                getItem('Порядок чтения', '/write_black_legion'),
                getItem('Charts', '/chart_black_legion')]),

                getItem('Фабий Байл', 'g8', null, [
                  getItem('Все книги', '/books_fabius'), 
                  getItem('Порядок чтения', '/write_fabius'),
                  getItem('Charts', '/chart_fabius')]),

                  
        getItem('Пришествие Зверя', 'g11', null, [
          getItem('Все книги', '/books_coming'), 
          getItem('Порядок чтения', '/write_coming'),
          getItem('Charts', '/chart_coming')]),

        getItem('Инквизиция', 'g4', null, [
          getItem('Все книги', '/books_inquisition'), 
          getItem('Порядок чтения', '/write_inquisition'),
          getItem('Charts', '/chart_inquisition')]),
  
        getItem('Комиссар Каин', 'g5', null, [
          getItem('Все книги', '/books_comissar'), 
          getItem('Порядок чтения', '/write_comissar'),
          getItem('Charts', '/chart_comissar')]),

          getItem('Кузницы Марса', 'g14', null, [
            getItem('Все книги', '/books_mars'), 
            getItem('Порядок чтения', '/write_mars'),
            getItem('Charts', '/chart_mars')]),

            getItem('Испивающие Души', 'g17', null, [
              getItem('Все книги', '/books_soul_drinkers'), 
              getItem('Порядок чтения', '/write_soul_drinkers'),
              getItem('Charts', '/chart_soul_drinkers')]),

              getItem('Тёмная Ересь', 'g18', null, [
                getItem('Все книги', '/books_dark_heresy'), 
                getItem('Порядок чтения', '/write_dark_heresy'),
                getItem('Charts', '/chart_dark_heresy')]),

                getItem('Несущие Слово', 'g19', null, [
                  getItem('Все книги', '/books_word_bearers'), 
                  getItem('Порядок чтения', '/write_word_bearers'),
                  getItem('Charts', '/chart_word_bearers')]),

            getItem('Кровавые Ангелы', 'g13', null, [
              getItem('Все книги', '/books_mephiston'), 
              getItem('Порядок чтения', '/write_mephiston'),
              getItem('Charts', '/chart_mephiston')]),

              getItem('Повелители Ночи', 'g12', null, [
                getItem('Все книги', '/books_night_lords'), 
                getItem('Порядок чтения', '/write_night_lords'),
                getItem('Charts', '/chart_night_lords')]),   

          getItem('Огненная Заря', 'g16', null, [
            getItem('Все книги', '/books_dawn_of_fire'), 
            getItem('Порядок чтения', '/write_dawn_of_fire'),
            getItem('Charts', '/chart_dawn_of_fire')]),

          getItem('Отдельные романы', 'g15', null, [
            getItem('Все книги', '/books_ohter'), 
            getItem('Порядок чтения', '/write_ohter'),
            getItem('Charts', '/chart_ohter')])
      ]),
      ]),

    getItem('Игры', 'sub3', <DesktopOutlined />, [
      getItem('Steam', '/steam_games'), 
      getItem('Ubisoft Connect', '/ubi_games'),
      getItem('Charts', '/chart_games')]),

    getItem('Работа', 'sub4', <WalletOutlined />, [
      getItem('Зарплата', '/salary'), 
      getItem('Переработка', '/bonus'),
      getItem('Charts', '/chart_work')]),

    getItem('Хобби', 'sub5', <StarOutlined />, [
        getItem('Миниатюры', '/hobby/miniatures/'), 
        getItem('Краска', '/hobby/colors'),
        getItem('Charts', '/chart_hobby')]),
];
const MenuMain = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key);
  };


  return (
    <>
        <Menu
        onClick={onClick}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      style={{
        marginTop: 5,
        backgroundColor: '#f8f2f2'
      }}
    />
    </>
  );
};
export default MenuMain;

