import React from 'react';
import { Column } from '@ant-design/plots';

const LineMain = ({data}) => {
    const config = {
        data,
        padding: 'auto',
        xField: 'date_pulse',
        yField: 'count_pulse',
        label: {
          text: (d) => `${(d.count_pulse).toFixed(1)}%`,
          textBaseline: 'bottom',
        },
      };
      
  return <Column style={{height: 110, width: 450, marginBottom: 5}} {...config}/>;
};

export default LineMain;