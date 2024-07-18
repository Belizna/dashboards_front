import React from "react";
import { Image, Typography, Dropdown, Space } from 'antd';

const PageCardsImage = ({ collection_card, card }) => {

  const { Title, Text } = Typography;

  const filters = [
    { cards: 'Боевая четверка', key: '123' },
    { cards: 'Воины тени', key: '274' },
    { cards: 'Братья по оружию', key: '838' },
    { cards: 'Герои и Злодеи', key: '38' },
    { cards: 'Герои и Злодеи. 2-я часть.', key: '106' },
    { cards: 'Герои и Злодеи. 3-я часть.', key: '166' },
    { cards: 'Отчаянные бойцы', key: '264' },
    { cards: 'Новая Вестроя', key: '594' },
    { cards: 'Beyblade Metal Fusion', key: '934' },
    { cards: 'Transformers Prime', key: '991' },
  ]

  var cards = ''

  const items = [
    {
      key: '1',
      label: (
        <Image
              width={218} height={300}
              src={`https://www.laststicker.ru/i/cards/123/1.jpg`}
          />
      ),
    },
  ];

  filters.map(obj => obj.cards === collection_card ? cards = obj.key : '')
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
      >
          <Space>
            Hover me
          </Space>
      </Dropdown>
      <div className="cardListImage">
        {
          card && card.map((obj) => <div className="cardImage">
            <Title style={{ marginBottom: -2 }} level={2}>{obj.number_card}</Title>
            <Image
              width={218} height={300}
              src={`https://www.laststicker.ru/i/cards/${cards}/${obj.number_card}.jpg`}
            />
            <Text strong>{obj.name_card}</Text>
          </div>
          )

        }
      </div>
    </>
  )
}
export default PageCardsImage;