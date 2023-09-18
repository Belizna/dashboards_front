import React from "react";
import Miniatures from "../../components/Hobby/Miniatures";

import './pageMiniature.css'

const filter_json = [
    {
        text:'Ultramarine',
        value: 'Ultramarine'
    },
    {
        text:'Black Legion',
        value: 'Black Legion'
    },
    {
        text:'Death Guard',
        value: 'Death Guard'
    },
]

const PageMinuiatures = () => {
    return(
        <div className="pageEarlyPayments">
            <div className="tableMiniature">
            <Miniatures filter_json={filter_json} />
            </div>
        </div>
    )
}   

export default PageMinuiatures;