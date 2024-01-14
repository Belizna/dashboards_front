import React from 'react';
import { Column } from '@ant-design/plots';

const DemoLine = ({data}) => {
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
    columnStyle: {
      radius: [20, 20, 0, 0],
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