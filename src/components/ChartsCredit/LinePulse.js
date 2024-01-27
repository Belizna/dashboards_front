import React from 'react';
import { Line } from '@ant-design/plots';

const LineMain = ({data}) => {
    const config = {
        data,
        padding: 'auto',
        xField: 'date_pulse',
        yField: 'count_pulse',
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: {
          showMarkers: false,
        },
        state: {
          active: {
            style: {
              shadowBlur: 4,
              stroke: '#000',
              fill: 'red',
            },
          },
        },
        interactions: [
          {
            type: 'marker-active',
          },
        ],
      };

  return <Line style={{height: 100, width: 400, marginBottom: 5}} {...config}/>;
};

export default LineMain;