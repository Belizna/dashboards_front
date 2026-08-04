import React from "react";
import { Tabs } from 'antd';
import Author from "../../../components/Book/Author";
import BooksFilter from "../../../components/Book/BooksFilter";


const PageAdminsBooks = () => {

    return (

        <>
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'Циклы книг',
                    children:
                        <>
                            <BooksFilter />
                        </>
                },
                {
                    key: '2',
                    label: 'Авторы',
                    children: <>
                        <Author />
                    </>
                }
            ]} />
        </>
    )
}

export default PageAdminsBooks