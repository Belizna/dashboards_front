import React from "react";

import WriteBooks from "../../../../components/Book/WriteBooks";


import './pageWriteBooks.css'

const filter_json = [
    {
        text: 'Бремя верности',
        value: 'Бремя верности'
      },
      {
        text: 'Безмолвная война',
        value: 'Безмолвная война'
      },
      {
        text: 'Вестники Осады',
        value: 'Вестники Осады'
      },
      {
        text: 'Гарро. Оружие судьбы',
        value: 'Гарро. Оружие судьбы'
      },
      {
        text: 'Заветы предательства',
        value: 'Заветы предательства'
      },
      {
        text: 'Интернет',
        value: 'Интернет'
      },
      {
        text: 'Коракс',
        value: 'Коракс'
      },
      {
        text: 'Легенды Ереси',
        value: 'Легенды Ереси'
      },
      {
        text: 'Нет войне конца',
        value: 'Нет войне конца'
      },
      {
        text: 'Око Терры',
        value: 'Око Терры'
      },
      {
        text: 'Отметка Калта',
        value: 'Отметка Калта'
      },
      {
        text: 'Примархи',
        value: 'Примархи'
      },
      {
        text: 'Рожденные в пламени',
        value: 'Рожденные в пламени'
      },
      {
        text: 'Разбитые Легионы',
        value: 'Разбитые Легионы'
      },
      {
        text: 'Талларн',
        value: 'Талларн'
      },
      {
        text: 'Тени предательства',
        value: 'Тени предательства'
      },
      {
        text: 'Эпоха Тьмы',
        value: 'Эпоха Тьмы'
      },
    ]
const PageWriteBooks = (name_book) => {
    return (
        <div className="pageBooks">
            <div className="tableBooks">
            <WriteBooks name_book={name_book} filter_json={filter_json}/>
            </div>
            </div>
            )
}
export default PageWriteBooks;