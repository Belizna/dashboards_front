import React, { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Tree, Typography } from 'antd';
import axios from "axios";

const { Text } = Typography;

const BookList =() => {

    const [staticData, setStaticData] = useState(0)

 const fetchStatic = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}books_list`)
    .then(res => setStaticData(res.data))
  }
  useEffect(() => {
    fetchStatic()
  }, [])

    return (
        <>
        {
            staticData && 
            <div className="list">
            <Text level={5}>Оставшиеся книги</Text>            
                <Tree style={{width: 450}}
            showLine
            switcherIcon={<DownOutlined />}
            treeData={staticData.books}/>
            </div>
        }
        </>
    )
}

export default BookList