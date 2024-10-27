import React from "react";
import Comics from "../../components/Comics/Comics";
import { useParams } from "react-router-dom"

const PageComics = () => {

    const { comics_collect } = useParams()

    return (
        <div className="pageEarlyPayments">
            <div className="tableMiniature">
                <Comics comics_collect={comics_collect} />
            </div>
        </div>
    )
}

export default PageComics;