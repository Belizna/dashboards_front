import React from "react";

import Computer from "../../components/Computer/Computer";

import './pageComputer.css'

const PageComputer = () => {

  return (
    <div className="pageComputer">
      <div className="tableComputer">
        <Computer />
      </div>
    </div>
  )
}
export default PageComputer;