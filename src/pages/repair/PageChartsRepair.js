import React, { useEffect, useState } from "react";
import axios from "axios";
import { Liquid, Column } from '@ant-design/plots';
import { Typography, Spin, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { InputNumber, Select, Button, Statistic } from 'antd';

import './pageChartsRepair.css'

const { Option } = Select;
const { Text } = Typography;

const PageChartsRepair = () => {

  const [countSave, setCountSave] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/repair/static`)
      .then(res => setStaticData(res.data))
  }, [countSave])

  const [staticData, setStaticData] = useState(null)
  const [valueInput, setValueInput] = useState(0)
  const [dataOption, setDataOption] = useState("-")

  const handleAdd = async () => {
    const value = {
      option: dataOption,
      sum: valueInput
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/repair/outlay/edit_sum`, value)
    setCountSave(countSave + 1)
  }

  const configColumn = {
    data: staticData?.data,
    xField: '_id',
    yField: 'sales',
    columnWidthRatio: 0.4,
    label: {
      position: 'top',
      style: {
        fill: '#000000',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  const config = {
    percent: staticData?.percent,
    outline: {
      border: 2,
      distance: 1,
    },
    wave: {
      length: 128,
    },
  };

  const selectBefore = (
    <Select
      defaultValue="-"
      style={{
        width: 53,
      }}
      onChange={setDataOption}
    >
      <Option value="+">+</Option>
      <Option value="-">-</Option>
    </Select>
  );

  return (
    <>
      {
        staticData === null ?
          <>
            <div className="loader">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
            </div>
          </> :
          <>
            <div className="pageChartGames">
              <div className="rate_sum">
                <div className="liquid"> </div>
                <div className="liquid">
                  <Liquid  {...config} />
                  <Text strong style={{ marginBottom: 10, fontSize: 19 }}>{`Остаток долга: ${staticData.rate}₽`}</Text>
                </div>
                <div className="liquid"> <div className="input_sum">
                  <Text strong style={{ marginBottom: 10 }}>Бюджет на ремонт</Text>
                  <InputNumber
                    style={{ width: 180, marginBottom: 10 }}
                    addonBefore={selectBefore}
                    addonAfter="₽"
                    defaultValue={valueInput}
                    onChange={setValueInput}
                  />
                  <Button type="primary" onClick={handleAdd}>Добавить</Button>
                </div></div>
              </div>

              <div className="lineGames">
                <Column {...configColumn} />
              </div>
              <div className="tableCard">

                <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                  <Statistic
                    title="Всего"
                    value={staticData.sumData}
                    valueStyle={{
                      color: '#3f8600',
                      fontSize: 20
                    }}
                    suffix="р."
                  />
                </Card>

                {staticData.data.map(arr =>
                  <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                    <Statistic
                      title={arr._id}
                      value={arr.sales}
                      valueStyle={{
                        color: '#3f8600',
                        fontSize: 20
                      }}
                      suffix="р."
                    />
                  </Card>
                )}
              </div>
            </div>
          </>
      }
    </>
  )
}

export default PageChartsRepair;