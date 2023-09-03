import React from "react";

import WriteBooks from "../../../../components/Book/WriteBooks";

const filter_json = [
    {
        text:'Комиссар Каин: Герой Империума',
        value: 'Комиссар Каин: Герой Империума'
    },
    {
        text:'Комиссар Каин: Защитник Империума',
        value: 'Комиссар Каин: Защитник Империума'
    },
    {
        text:'Комиссар Каин: Спаситель Империума',
        value: 'Комиссар Каин: Спаситель Империума'
    },
]

const PageWriteBooksComissar = (name_book) => {

    return (
        <div className="pageBooks">
            <div className="tableBooks">
            <WriteBooks name_book={name_book} filter_json={filter_json}/>
            </div>
            </div>
            )
}
export default PageWriteBooksComissar;