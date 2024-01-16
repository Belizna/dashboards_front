import React from "react";
import WriteBooks from "../../../../components/Book/WriteBooks";


const PageWriteBooksComing = (name_book) => {

    return (
        <div className="pageBooks">
            <div className="tableBooks">
            <WriteBooks name_book={name_book}/>
            </div>
            </div>
            )
}
export default PageWriteBooksComing ;