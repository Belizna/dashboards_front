import React from 'react';
import { Column } from '@ant-design/plots';

const DemoDualAxes = ({staticData, conf }) => {
  
    var data = []
    staticData === undefined ? data = [{_id : '0', sum: 1 }] :
    data = staticData
    var config = {}
    if(conf === 'bonus')
    {
        config = {
            data,
            xField: '_id',
            yField: 'sum',
            xAxis: {
              label: {
                autoRotate: false,
              },
            },
            slider: {
              start: 0.5,
              end: 1,
            },
          };
    }
    else if (conf === 'salary')
    {
        config = {
            data,
            xField: 'date_salary',
            yField: 'summ_salary',
            seriesField: 'company',
            xAxis: {
              label: {
                autoRotate: false,
              },
            },
            slider: {
              start: 1,
              end: 0.8,
            },
          };
    }
  return <Column {...config} />;
};

export default DemoDualAxes