import axios from "axios";
import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import { useNavigate} from 'react-router-dom'
import "./menu.css"


const MenuMain = () => {

   useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/menu/`)
      .then((res) => [setStaticData(res.data.menuFilter)])
  }, [])

  const [staticData, setStaticData] = useState([])
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key);
  };
  
  return (
    <>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={staticData}
        style={{
          marginTop: 5,
        }}
      />
    </>
  );
};
export default MenuMain;

