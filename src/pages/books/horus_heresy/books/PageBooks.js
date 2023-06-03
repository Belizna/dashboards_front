import React from "react";

import Books from "../../../../components/Book/Books";


import './pageBooks.css'

const PageBooks = () => {

    return (
        <div className="pageBooks">
            <div className="tableBooks">
            <Books/>
            </div>
            </div>
            )
}
export default PageBooks;