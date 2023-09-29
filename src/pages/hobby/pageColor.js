import React from "react";
import Color from "../../components/Hobby/Color.js";

import './pageMiniature.css'

const filter_json = [
    {
        text:'Citadel',
        value: 'Citadel'
    },
    {
        text:'Vallejo',
        value: 'Vallejo'
    },
]

const PageColor = () => {
    return(
        <div className="pageEarlyPayments">
            <div className="tableColor">
            <Color filter_json={filter_json}/>
            </div>
        </div>
    )
}   

export default PageColor;