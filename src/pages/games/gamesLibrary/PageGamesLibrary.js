import React from "react";

import Games from "../../../components/Games/Games";

import './pageGamesLibrary.css'

const PageGamesLibrary = () => {

    return (
      <div className="pageGamesLibrary">
            <div className="tableGamesLibrary">
            <Games/>
            </div>
        </div>
    )
}
export default PageGamesLibrary;