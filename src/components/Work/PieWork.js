import React from 'react';
import { Pie} from '@ant-design/plots';

const PieWork = (staticData) => {


      var data = []

      staticData.staticData === undefined ? data = [{_id : '0', sum: 1 }] :
      data = staticData.staticData

      const config = {
        appendPadding: 10,
        data,
        angleField: 'sum',
        colorField: '_id',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };
  return <Pie {...config} />;
};

export default PieWork;