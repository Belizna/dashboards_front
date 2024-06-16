import React from "react";
import Comics from "../../components/Comics/Comics";

const PageComics = ({comics_collect}) => {
    return(
        <div className="pageEarlyPayments">
            <div className="tableMiniature">
            <Comics comics_collect={comics_collect} />
            </div>
        </div>
    )
}   

export default PageComics;