import {
  BankOutlined, BookOutlined, AreaChartOutlined,
  StarOutlined, DesktopOutlined, WalletOutlined,
  HomeOutlined, HighlightOutlined, DingdingOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'

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
    getItem('Займ', '/credit_loan'),
  ]),

  getItem('Книги', 'sub2', <BookOutlined />, [
    getItem('Warhammer', 'sub2-2', null, [
      getItem('Ересь Хоруса', 'g2', null, [
        getItem('Все книги', '/books_heresy'),
        getItem('Порядок чтения', '/write_heresy'),
        getItem('Charts', '/chart_heresy')]),

      getItem('Осада Терры', 'g3', null, [
        getItem('Все книги', '/books_siege'),
        getItem('Порядок чтения', '/write_siege'),
        getItem('Charts', '/chart_siege')]),

      getItem('Примархи', 'g4', null, [
        getItem('Все книги', '/books_primarch'),
        getItem('Порядок чтения', '/write_primarch'),
        getItem('Charts', '/chart_primarch')]),

      getItem('Персонажи', 'g5', null, [
        getItem('Все книги', '/books_person'),
        getItem('Порядок чтения', '/write_person'),
        getItem('Charts', '/chart_person')]),

      getItem('Ариман', 'g6', null, [
        getItem('Все книги', '/books_ahriman'),
        getItem('Порядок чтения', '/write_ahriman'),
        getItem('Charts', '/chart_ahriman')]),

      getItem('Черный Легион', 'g7', null, [
        getItem('Все книги', '/books_black_legion'),
        getItem('Порядок чтения', '/write_black_legion'),
        getItem('Charts', '/chart_black_legion')]),

      getItem('Фабий Байл', 'g8', null, [
        getItem('Все книги', '/books_fabius'),
        getItem('Порядок чтения', '/write_fabius'),
        getItem('Charts', '/chart_fabius')]),

      getItem('Пришествие Зверя', 'g9', null, [
        getItem('Все книги', '/books_coming'),
        getItem('Порядок чтения', '/write_coming'),
        getItem('Charts', '/chart_coming')]),

      getItem('Инквизиция', 'g10', null, [
        getItem('Все книги', '/books_inquisition'),
        getItem('Порядок чтения', '/write_inquisition'),
        getItem('Charts', '/chart_inquisition')]),

      getItem('Крестовый поход Махариуса', 'g11', null, [
        getItem('Все книги', '/books_Macharian_Crusade'),
        getItem('Порядок чтения', '/write_Macharian_Crusade'),
        getItem('Charts', '/chart_Macharian_Crusade')]),

      getItem('Вольный Торговец', 'g12', null, [
        getItem('Все книги', '/books_Rogue_Trader'),
        getItem('Порядок чтения', '/write_Rogue_Trader'),
        getItem('Charts', '/chart_Rogue_Trader')]),

      getItem('Кархародоны', 'g13', null, [
        getItem('Все книги', '/books_Carcharodons'),
        getItem('Порядок чтения', '/write_Carcharodons'),
        getItem('Charts', '/chart_Carcharodons')]), ,

      getItem('Комиссар Каин', 'g15', null, [
        getItem('Все книги', '/books_comissar'),
        getItem('Порядок чтения', '/write_comissar'),
        getItem('Charts', '/chart_comissar')]),

      getItem('Арбитр', 'g16', null, [
        getItem('Все книги', '/books_Enforcer'),
        getItem('Порядок чтения', '/write_Enforcer'),
        getItem('Charts', '/chart_Enforcer')]),

      getItem('Кузницы Марса', 'g17', null, [
        getItem('Все книги', '/books_mars'),
        getItem('Порядок чтения', '/write_mars'),
        getItem('Charts', '/chart_mars')]),

      getItem('Северина Рейн', 'g18', null, [
        getItem('Все книги', '/books_Severina_Raine'),
        getItem('Порядок чтения', '/write_Severina_Raine'),
        getItem('Charts', '/chart_Severina_Raine')]),

      getItem('Испивающие Души', 'g19', null, [
        getItem('Все книги', '/books_soul_drinkers'),
        getItem('Порядок чтения', '/write_soul_drinkers'),
        getItem('Charts', '/chart_soul_drinkers')]),

      getItem('Люций', 'g20', null, [
        getItem('Все книги', '/books_Lucius'),
        getItem('Порядок чтения', '/write_Lucius'),
        getItem('Charts', '/chart_Lucius')]),

      getItem('Тёмная Ересь', 'g21', null, [
        getItem('Все книги', '/books_dark_heresy'),
        getItem('Порядок чтения', '/write_dark_heresy'),
        getItem('Charts', '/chart_dark_heresy')]),

      getItem('Несущие Слово', 'g22', null, [
        getItem('Все книги', '/books_word_bearers'),
        getItem('Порядок чтения', '/write_word_bearers'),
        getItem('Charts', '/chart_word_bearers')]),

      getItem('Караул Смерти', 'g23', null, [
        getItem('Все книги', '/books_Deathwatch'),
        getItem('Порядок чтения', '/write_Deathwatch'),
        getItem('Charts', '/chart_Deathwatch')]),

      getItem('Саламандры', 'g24', null, [
        getItem('Все книги', '/books_salamanders'),
        getItem('Порядок чтения', '/write_salamanders'),
        getItem('Charts', '/chart_salamanders')]),

      getItem('Железные Воины', 'g25', null, [
        getItem('Все книги', '/books_Iron_Warriors'),
        getItem('Порядок чтения', '/write_Iron_Warriors'),
        getItem('Charts', '/chart_Iron_Warriors')]),

      getItem('Сёстры Битвы', 'g26', null, [
        getItem('Все книги', '/books_Sisters_of_Battle'),
        getItem('Порядок чтения', '/write_Sisters_of_Battle'),
        getItem('Charts', '/chart_Sisters_of_Battle')]),

      getItem('Кровь Асахейма', 'g27', null, [
        getItem('Все книги', '/books_blood_of_Asaheim'),
        getItem('Порядок чтения', '/write_blood_of_Asaheim'),
        getItem('Charts', '/chart_blood_of_Asaheim')]),

      getItem('Война за Фенрис', 'g28', null, [
        getItem('Все книги', '/books_war_Fenris'),
        getItem('Порядок чтения', '/write_war_Fenris'),
        getItem('Charts', '/chart_war_Fenris')]),

      getItem('Мефистон', 'g29', null, [
        getItem('Все книги', '/books_mephiston'),
        getItem('Порядок чтения', '/write_mephiston'),
        getItem('Charts', '/chart_mephiston')]),

      getItem('Повелители Ночи', 'g30', null, [
        getItem('Все книги', '/books_night_lords'),
        getItem('Порядок чтения', '/write_night_lords'),
        getItem('Charts', '/chart_night_lords')]),

      getItem('Огненная Заря', 'g31', null, [
        getItem('Все книги', '/books_dawn_of_fire'),
        getItem('Порядок чтения', '/write_dawn_of_fire'),
        getItem('Charts', '/chart_dawn_of_fire')]),

      getItem('Хорусианские Войны', 'g32', null, [
        getItem('Все книги', '/books_war_horus'),
        getItem('Порядок чтения', '/write_war_horus'),
        getItem('Charts', '/chart_war_horus')]),

      getItem('Хранители Трона', 'g33', null, [
        getItem('Все книги', '/books_Watchers_of_the_Throne'),
        getItem('Порядок чтения', '/write_Watchers_of_the_Throne'),
        getItem('Charts', '/chart_Watchers_of_the_Throne')]),

      getItem('Крипты Терры', 'g34', null, [
        getItem('Все книги', '/books_Vaults_of_Terra'),
        getItem('Порядок чтения', '/write_Vaults_of_Terra'),
        getItem('Charts', '/chart_Vaults_of_Terra')]),

      getItem('Кадия', 'g42', null, [
        getItem('Все книги', '/books_Cadia'),
        getItem('Порядок чтения', '/write_Cadia'),
        getItem('Charts', '/chart_Cadia')]),

      getItem('Криг', 'g43', null, [
        getItem('Все книги', '/books_Krieg'),
        getItem('Порядок чтения', '/write_Krieg'),
        getItem('Charts', '/chart_Krieg')]),

      getItem('Темный Империум', 'g35', null, [
        getItem('Все книги', '/books_dark_imperium'),
        getItem('Порядок чтения', '/write_dark_imperium'),
        getItem('Charts', '/chart_dark_imperium')]),

      getItem('Дважды мёртвый царь', 'g36', null, [
        getItem('Все книги', '/books_twice_dead_king'),
        getItem('Порядок чтения', '/write_twice_dead_king'),
        getItem('Charts', '/chart_twice_dead_king')]),

      getItem('Завоевания Космодесанта', 'g37', null, [
        getItem('Все книги', '/books_Space_Marine'),
        getItem('Порядок чтения', '/write_Space_Marine'),
        getItem('Charts', '/chart_Space_Marine')]),

      getItem('Тёмный клубок', 'g41', null, [
        getItem('Все книги', '/books_Dark_Coil'),
        getItem('Порядок чтения', '/write_Dark_Coil'),
        getItem('Charts', '/chart_Dark_Coil')]),

      getItem('Уфтхак Чёрный Гребень', 'g40', null, [
        getItem('Все книги', '/books_Ufthak'),
        getItem('Порядок чтения', '/write_Ufthak'),
        getItem('Charts', '/chart_Ufthak')]),

      getItem('Ассасинорум', 'g44', null, [
        getItem('Все книги', '/books_Assassinorum'),
        getItem('Порядок чтения', '/write_Assassinorum'),
        getItem('Charts', '/chart_Assassinorum')]),

      getItem('Отступники', 'g45', null, [
        getItem('Все книги', '/books_Renegades'),
        getItem('Порядок чтения', '/write_Renegades'),
        getItem('Charts', '/chart_Renegades')]),

      getItem('Призраки Гаунта', 'g46', null, [
        getItem('Все книги', '/books_GhostGaunt'),
        getItem('Порядок чтения', '/write_GhostGaunt'),
        getItem('Charts', '/chart_GhostGaunt')]),

      getItem('Отдельные романы', 'g38', null, [
        getItem('Все книги', '/books_ohter'),
        getItem('Порядок чтения', '/write_ohter'),
        getItem('Charts', '/chart_ohter')]),

      getItem('Warhammer Crime', 'g39', null, [
        getItem('Все книги', '/books_Crime'),
        getItem('Порядок чтения', '/write_Crime'),
        getItem('Charts', '/chart_Crime')]),
    ]),
    getItem('Charts', '/charts_group_books'),
  ]),

  getItem('Комиксы', 'sub9', <DingdingOutlined />, [
    getItem('Marvel Comics', '/comics_marvel'),
    getItem('DC Comics', '/comics_dc')]),

  getItem('Игры', 'sub3', <DesktopOutlined />, [
    getItem('Steam', '/steam_games'),
    getItem('Ubisoft Connect', '/ubi_games'),
    getItem('PlayStation', '/ps_games'),
    getItem('Charts', '/chart_games')]),

  getItem('Коллекция', 'sub8', <StarOutlined />, [
    getItem('Карточки', 'sub8-2', null, [
      getItem('Черепашки Ниндзя', 'sub8-3', null, [
        getItem('Боевая четверка', 'sub8-3-2', null, [
          getItem('Все карточки', '/all_card_fighting'),
          getItem('Charts', '/chart_card_fighting')]),

        getItem('Воины тени', 'sub8-3-3', null, [
          getItem('Все карточки', '/all_card_shadow'),
          getItem('Charts', '/chart_card_shadow')]),

        getItem('Братья по оружию', 'sub8-3-4', null, [
          getItem('Все карточки', '/all_card_brothers'),
          getItem('Charts', '/chart_card_brothers')]),
      ]),
      getItem('Человек-Паук', 'sub8-4', null, [
        getItem('Герои и Злодеи', 'sub8-4-2', null, [
          getItem('Все карточки', '/all_spider_part_1'),
          getItem('Charts', '/chart_spider_part_1')]),

        getItem('Герои и Злодеи. 2-я часть.', 'sub8-4-3', null, [
          getItem('Все карточки', '/all_spider_part_2'),
          getItem('Charts', '/chart_spider_part_2')]),

        getItem('Герои и Злодеи. 3-я часть', 'sub8-4-4', null, [
          getItem('Все карточки', '/all_spider_part_3'),
          getItem('Charts', '/chart_spider_part_3')]),

        getItem('Герои и Злодеи. 4-я часть', 'sub8-4-5', null, [
          getItem('Все карточки', '/all_spider_part_4'),
          getItem('Charts', '/chart_spider_part_4')]),
      ]),
      getItem('Бакуган', 'sub8-5', null, [

        getItem('Отчаянные бойцы', 'sub8-5-2', null, [
          getItem('Все карточки', '/all_bakugan'),
          getItem('Charts', '/chart_bakugan')]),

        getItem('Отчаянные бойцы - Новая Вестроя', 'sub8-5-3', null, [
          getItem('Все карточки', '/all_bakugan_new_Vestroia'),
          getItem('Charts', '/chart_bakugan_new_Vestroia')]),
      ]),

      getItem('Бейблейд', 'sub6-5', null, [
        getItem('Все карточки', '/all_beyblade'),
        getItem('Charts', '/chart_beyblade'),
      ]),

      getItem('Трансформеры Прайм', 'sub7-5', null, [
        getItem('Все карточки', '/all_transformers'),
        getItem('Charts', '/chart_transformers'),
      ]),

      getItem('Наруто', 'sub9-5', null, [
        getItem('Все карточки', '/all_naruto'),
        getItem('Charts', '/chart_naruto'),
      ]),

      getItem('Супергонки', 'sub10-5', null, [

        getItem('Супергонки. 1 серия.', 'sub10-5-2', null, [
          getItem('Все карточки', '/all_racing_part_1'),
          getItem('Charts', '/chart_racing_part_1')]),

        getItem('Супергонки. 2 серия.', 'sub10-5-3', null, [
          getItem('Все карточки', '/all_racing_part_2'),
          getItem('Charts', '/chart_racing_part_2')]),
      ]),

      getItem('Charts', '/charts_group_cards'),

    ]),
  ]),

  getItem('Работа', 'sub4', <WalletOutlined />, [
    getItem('Зарплата', '/salary'),
    getItem('Переработка', '/bonus'),
    getItem('Charts', '/chart_work')]),

  getItem('Хобби', 'sub5', <HighlightOutlined />, [
    getItem('Миниатюры', '/hobby/miniatures/'),
    getItem('Краска', '/hobby/colors'),
    getItem('Charts', '/chart_hobby')]),

  getItem('Ремонт', 'sub7', <HomeOutlined />, [
    getItem('Смета', '/repair/outlay/'),
    getItem('Charts', '/repair/chart/')]),
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

