import { Area } from '@ant-design/plots';
import React from 'react';

const LineHistory = ({data}) => {
  const config = {
    data: data,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
  };
  return <Area {...config} />;
};

export default LineHistory;