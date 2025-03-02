import React from 'react';
import { Column } from '@ant-design/plots';

const DemoLineGames = ({ data }) => {

  const config = {
    data,
    appendPadding: 10,
    isGroup: true,
    xField: 'key',
    yField: 'value',
    seriesField: 'name',
    height: 500, // adjust height
    autoFit: true,
    legend: {
      position: "bottom",
      flipPage: false
    },
    color: ['#2389FF', '#0DCCCC'],
    label: {
      position: 'top',
      // 'top', 'middle', 'bottom'
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return <Column {...config} />;
};

export default DemoLineGames;