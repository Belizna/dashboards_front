import React from "react";
import { useParams } from "react-router-dom"
import Games from "../../components/Games/Games";

import './pageGamesLibrary.css'

const PageGamesLibrary = () => {

    const { library_name } = useParams()

    return (
        <div className="pageGamesLibrary">
            <div className="tableGamesLibrary">
                <Games library_name={library_name} />
            </div>
        </div>
    )
}
export default PageGamesLibrary;