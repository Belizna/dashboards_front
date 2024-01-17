import React, { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import axios from "axios";

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
                <Tree style={{width: 450, fontSize: 15}}
            showLine
            switcherIcon={<DownOutlined />}
            treeData={staticData.books}/>
            </div>
        }
        </>
    )
}

export default BookList