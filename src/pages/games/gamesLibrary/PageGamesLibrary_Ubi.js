import React from "react";

import Games from "../../../components/Games/Games";

import './pageGamesLibrary.css'

const PageGamesLibrary_Ubi = (library_name) => {

    return (
      <div className="pageGamesLibrary">
            <div className="tableGamesLibrary">
            <Games library_name={library_name}/>
            </div>
        </div>
    )
}
export default PageGamesLibrary_Ubi;