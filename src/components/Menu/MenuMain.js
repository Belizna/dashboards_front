import {BankOutlined, BookOutlined, DesktopOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import {useNavigate} from 'react-router-dom'

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
  getItem('Кредиты', 'sub1', <BankOutlined />, [
    getItem('Ипотека', 'g1', null, [
      getItem('График платежей', '/payments'), 
      getItem('Досрочные погашения', '/early_payments'),
      getItem('Charts', '/chart_credit')]),
  ]),
    getItem('Книги', 'sub2', <BookOutlined />, [
      getItem('Ересь Хоруса', 'g2', null, [
        getItem('Все книги', '/books_heresy'), 
        getItem('Порядок чтения', '/write_heresy'),
        getItem('Charts', '/chart_heresy')]),
      
        getItem('Осада Терры', 'g3', null, [
          getItem('Все книги', '/books_siege'), 
          getItem('Порядок чтения', '/write_siege'),
          getItem('Charts', '/chart_siege')]),

          getItem('Инквизиция', 'g4', null, [
            getItem('Все книги', '/books_inquisition'), 
            getItem('Порядок чтения', '/write_inquisition'),
            getItem('Charts', '/chart_inquisition')]),
            getItem('Комиссар Каин', 'g5', null, [
              getItem('Все книги', '/books_comissar'), 
              getItem('Порядок чтения', '/write_comissar'),
              getItem('Charts', '/chart_comissar')])
      ]),
      getItem('Игры', 'sub3', <DesktopOutlined />, [
          getItem('Steam', '/steam_games'), 
          getItem('Ubisoft Connect', '/ubi_games'),
          getItem('Charts', '/chart_games')]),

        getItem('Работа', 'sub4', <DesktopOutlined />, [
            getItem('Зарплата', '/salary'), 
            getItem('Переработка', '/processing'),
            getItem('Charts', '/chart_work')]),
];
const MenuMain = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key);
  };
  return (
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
  );
};
export default MenuMain;