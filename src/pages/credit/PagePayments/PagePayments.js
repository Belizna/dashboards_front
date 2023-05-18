import React from "react";

import Payments from "../../../components/Payments/Paymens";


import './pagePayments.css'

const PagePayments = () => {
    return(
        <div className="pagePayments">
            <div className="tablePayments">
            <Payments/>
            </div>
        </div>
    )
}

export default PagePayments;