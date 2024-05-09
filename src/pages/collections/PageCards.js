import React from "react";
import Cards from "../../components/Collections/Cards";

const PageCards = ({collection_card}) => {
    return (
        <div className="pageBooks">
            <div className="tableBooks">
            <Cards collection_card={collection_card}/>
            </div>
            </div>
            )
}
export default PageCards;