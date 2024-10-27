import React from "react";
import WriteBooks from "../../../../components/Book/WriteBooks";
import { useParams } from "react-router-dom"

import './pageWriteBooks.css'

const PageWriteBooks = () => {

    const { name_book } = useParams()

    return (
        <div className="pageBooks">
            <div className="tableBooks">
                <WriteBooks name_book={name_book} />
            </div>
        </div>
    )
}
export default PageWriteBooks;