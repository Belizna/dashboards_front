import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import axios from 'axios';

const DemoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/credit/early_payment/`)
    .then((res) => setData(res.data.early_payment))
  }, []);

  const config = {
    data,
    xField: 'date_earlyPayment',
    yField: 'summ_earlyPayment',
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#000000',
        opacity: 0.9,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return <Column {...config} />;
};

export default DemoLine;