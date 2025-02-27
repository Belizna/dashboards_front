import React from 'react';
import { Column } from '@ant-design/plots';

const DemoLine = ({data}) => {
  const config = {
    data,
    xField: '_id',
    yField: 'sum',
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#000000',
        opacity: 0.9,
      },
    },
    color : ['#61D9AA', '#6294F9'],
    columnStyle: {
      radius: [20, 20, 0, 0],
      fill: '#61D9AA',
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