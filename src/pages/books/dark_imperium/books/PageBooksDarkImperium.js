import React from "react";
import Books from "../../../../components/Book/Books";


const PageBooksDarkImperium = (name_book) => {

    return (
        <div className="pageBooks">
            <div className="tableBooks">
            <Books name_book={name_book}/>
            </div>
            </div>
            )
}
export default PageBooksDarkImperium;