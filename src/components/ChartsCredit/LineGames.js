import React from 'react';
import { Column } from '@ant-design/plots';

const DemoLineGames = (static_paid) => {
  
    const data = static_paid.data

  const config = {
    data,
    isGroup: true,
    xField: 'key',
    yField: 'value',
    seriesField: 'name',
    color : ['#61D9AA', '#6294F9','#647697' ],
    columnStyle: {
        radius: [20, 20, 0, 0],
      },
      label: {
        position: 'middle',
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