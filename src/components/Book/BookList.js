import React, { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Tree, message } from 'antd';
import axios from "axios";


const BookList =() => {

    const [staticData, setStaticData] = useState(0)

    const [messageApi, contextHolder] = message.useMessage();

 const fetchStatic = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}books_list`)
    .then(res => setStaticData(res.data))
  }
  useEffect(() => {
    fetchStatic()
  }, [])


  const onSelect = (selectedKeys, info) => {
    navigator.clipboard.writeText(info.node.title)
    messageApi.open({
      type: 'success',
      content: `"${info.node.title}" Скопировано!`
    })
  };

    return (
        <>
        {contextHolder}
        {
            staticData && 
            <div className="list">   
                <Tree style={{width: 450}}
            showLine
            onSelect={onSelect}
            defaultExpandAll={true}
            switcherIcon={<DownOutlined />}
            treeData={staticData.books}/>
            </div>
        }
        </>
    )
}

export default BookList