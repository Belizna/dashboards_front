import React from "react";

import WriteBooks from "../../../../components/Book/WriteBooks";


import './pageWriteBooks.css'


const filter_json = [
    {
        text:'Магос. Архивы Грегора Эйзенхорна',
        value: 'Магос. Архивы Грегора Эйзенхорна'
    },
    {
        text:'Инквизитор Эйзенхорн',
        value: 'Инквизитор Эйзенхорн'
    },
    {
        text:'Интернет',
        value: 'Интернет'
    },
    {
        text:'Инквизитор Рейвенор',
        value: 'Инквизитор Рейвенор'
    },
]

const PageWriteBooksInq = (name_book) => {

    return (
        <div className="pageBooks">
            <div className="tableBooks">
            <WriteBooks name_book={name_book} filter_json={filter_json}/>
            </div>
            </div>
            )
}
export default PageWriteBooksInq;