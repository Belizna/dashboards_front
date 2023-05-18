import React from 'react';
import { Liquid } from '@ant-design/plots';


const DemoLiquid = (percentPay) => {
  const config = {
    percent: percentPay.percentPay/100,
    outline: {
      border: 2,
      distance: 1,
    },
    wave: {
      length: 128,
    },
  };
  return <Liquid {...config} />;
};

export default DemoLiquid;
