import React from "react";
import Beyblade from "../../components/Collections/Beyblade";

const PageBeyblade = () => {

    const options = [
        { value: 'Metal Fusion', label: 'Metal Fusion' }, 
        { value: 'Metal Masters', label: 'Metal Masters' }, 
        { value: 'Metal Fury', label: 'Metal Fury' }, 
        { value: 'Shogun Steel', label: 'Shogun Steel' },
    ]

    const filters = [
        { value: 'Metal Fusion', text: 'Metal Fusion' }, 
        { value: 'Metal Masters', text: 'Metal Masters' }, 
        { value: 'Metal Fury', text: 'Metal Fury' }, 
        { value: 'Shogun Steel', text: 'Shogun Steel' },
    ]

    return (
        <div className="pageBooks">
            <div className="tableBooks">
                <Beyblade option={options} filter={filters} />
            </div>
        </div>
    )
}
export default PageBeyblade;