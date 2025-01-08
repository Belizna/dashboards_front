import React, { useEffect, useState } from "react";
import { Select, Typography, Tabs } from 'antd';
import axios from "axios";
import { G6, MindMap } from '@ant-design/graphs';

import './pagePersonBooks.css'

const { Title } = Typography;
const { TabPane } = Tabs
const { treeToGraphData } = G6;

const PagePersonBooks = () => {

    const [optionsSelector, setOptionsSelector] = useState();
    const [ordens, setOrdens] = useState([{ id: 'Необходимо выбрать класс' }]);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/person`)
            .then((res) => [
                setOrdens(res.data.personTree),
                setOptionsSelector(res.data.personSelectorOptions),
                setData(treeToGraphData(ordens[0]))])
    }, [])

    const handleChangeNameOrden = (value) => {
        setData(treeToGraphData(ordens[value]))
    }

    const options = {
        type: 'boxed',
        autoFit: 'view',
        data,
        transforms: (prev) => [
            ...prev.filter((transform) => transform.type !== 'collapse-expand-react-node'),
            {
                ...prev.find((transform) => transform.type === 'collapse-expand-react-node'),
                enable: true,
            },
        ],
    };

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Статистика" key="1">
                {data &&
                    <>
                        <div className="tabMain">
                            <div className="tab">
                                <div className="pagePerson">
                                    <div className="pagePersonHeader">
                                        <Title level={5}>Статистика по <Select
                                            showSearch
                                            placeholder="Выбрать класс"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            onChange={handleChangeNameOrden}
                                            options={optionsSelector}
                                        /></Title>
                                    </div>
                                    <div className="treePerson">
                                        <MindMap {...options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </TabPane>
            <TabPane tab="Админка" key="2">

            </TabPane>
        </Tabs>
    )
}
export default PagePersonBooks;