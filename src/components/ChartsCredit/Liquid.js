import React from 'react';
import { Liquid } from '@ant-design/plots';


const DemoLiquid = ({percentPay}) => {
  const config = {
    percent: percentPay/100,
    outline: {
      border: 2,
      distance: 1,
    },
    wave: {
      length: 128,
    },
    liquidStyle: () => ({
      fill: percentPay > 80 ? '#61D9AA' : 
            percentPay > 50 ? '#6294F9' : 
            '#FAAD14',
    })
  };
  return <Liquid {...config} />;
};

export default DemoLiquid;
