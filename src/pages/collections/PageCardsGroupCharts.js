import React, { useEffect, useState } from "react";
import axios from "axios";
import CardsBlock from "../../components/Collections/CardsBlock";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './pageCardsGroup.css'

const PageCardsGroupCharts = () => {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/collection/cards/`)
            .then(res => setStaticData(res.data.cardListGroup))
    }, [])
    const [staticData, setStaticData] = useState(0)

    return (
        <>
            {staticData === 0 ? <><div className="loader">
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 80,
                            }}
                            spin
                        />
                    }
                />
            </div></> :
                <>
                    <div className="mapBlockCollection">
                        {
                            staticData.map(obj => <CardsBlock staticData={obj} />)
                        }
                    </div>
                </>}
        </>
    )
}

export default PageCardsGroupCharts