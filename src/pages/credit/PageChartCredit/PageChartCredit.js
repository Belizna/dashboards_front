import React, { useEffect, useState } from "react";
import { Typography, Card, Statistic, Spin, Button, Tabs, Table, Modal } from 'antd';
import { LoadingOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DemoLiquid from "../../../components/ChartsCredit/Liquid";
import DemoPie from "../../../components/ChartsCredit/Pie";
import DemoLine from "../../../components/ChartsCredit/Line";
import LineHistory from "../../../components/ChartsCredit/LineHistory";
import axios from "axios";

import './pageChartCredit.css'

const { Title, Text } = Typography;
const { Column } = Table;

const PageChartCredit = () => {

  const [staticData, setStaticData] = useState(0)
  const [countSave, setCountSave] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalData, setIsModalData] = useState(null);
  const [isModalTitle, setIsModalTitle] = useState('');
  const [isModalColor, setIsModalColor] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/carts/static`)
      .then(res => setStaticData(res.data))
    // eslint-disable-next-line
  }, [countSave])


  const handleSaveStatistic = async () => {
    var modelStaticHistory = {
      procent_date: staticData.data3,
      procent_summ: staticData.data2,
      procent_econom: staticData.data1
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/credit/history/add`, modelStaticHistory)
    setCountSave(countSave + 1)
  }

  const showModal = (data, title, isColor) => {
    setIsModalOpen(true);
    setIsModalData(data)
    setIsModalTitle(title)
    setIsModalColor(isColor)
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {staticData === 0 ? <><div className="loader">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 80,
              }}
              spin
            />
          }
        />
      </div></> : <>

        <Modal title={isModalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Table dataSource={isModalData}
            pagination={{
              pageSize: 12,
            }}>
            <Column title="Месяц 1" dataIndex="dateOld" key="dateOld" />
            <Column title="Месяц 2" dataIndex="dateNew" key="dateNew" />
            <Column
              title="Разница"
              dataIndex="diffValue"
              key="diffValue"
              render={diffValue => {
                let color = diffValue > isModalColor ? 'success' : 'default';
                return color === 'success' ? (
                  <Text type={color}> <ArrowDownOutlined /> {diffValue.toFixed(2)}</Text>
                ) : (
                  <Text type={color}>{diffValue.toFixed(2)}</Text>
                );
              }}
            />
          </Table>
        </Modal>

        {staticData &&
          <div className="pageChartCredit">
            <div className="liquid">
              <DemoLiquid percentPay={staticData.procentStatic} />
              <Title style={{ marginTop: -10 }} level={5}>Процент выплаты</Title>
            </div>
            <Tabs defaultActiveKey="1" items={[
              {
                key: '1',
                label: 'Текущая статистика',
                children: <>
                  <div className="pieGroup">
                    <div className="pie">
                      <DemoPie data={staticData.data3} />
                      <Title style={{ marginTop: -10 }} level={5}>Процент выплаты</Title>
                    </div>
                    <div className="pie">
                      <DemoPie data={staticData.data2} />
                      <Title style={{ marginTop: -30 }} level={5}>Процент суммы выплаты</Title>
                    </div>
                    <div className="pie">
                      <DemoPie data={staticData.data1} />
                      <Title style={{ marginTop: -30 }} level={5}>Процент экономии</Title>
                    </div>
                  </div>
                </>
              },
              {
                key: '2',
                label: 'История',
                children: <>
                  <div className="pieGroup">
                    {staticData.creditHistory[0].procent_date && <>
                      <div className="pie">
                        <LineHistory data={staticData.creditHistory[0].procent_date} />
                        <Title level={5}>Изменение срока</Title>
                      </div>
                    </>}
                    {staticData.creditHistory[0].procent_summ && <>
                      <div className="pie">
                        <LineHistory data={staticData.creditHistory[0].procent_summ} />
                        <Title level={5}>Изменение остатка</Title>
                      </div>
                    </>}
                    {staticData.creditHistory[0].procent_econom && <>
                      <div className="pie">
                        <LineHistory data={staticData.creditHistory[0].procent_econom} />
                        <Title level={5}>Изменение экономии</Title>
                      </div>
                    </>}
                  </div>
                </>
              },
              {
                key: '3',
                label: 'Сводка по месяцам',
                children: <>
                  <div className="pieGroup">
                    {staticData.procentDate && <>
                      <div className="pie">
                        <Table dataSource={staticData.procentDate}
                          pagination={{
                            pageSize: 4,
                          }}>
                          <Column title="Месяц 1" dataIndex="dateOld" key="dateOld" />
                          <Column title="Месяц 2" dataIndex="dateNew" key="dateNew" />
                          <Column
                            title="Разница"
                            dataIndex="diffValue"
                            key="diffValue"
                            render={diffValue => {
                              let color = diffValue > 1 ? 'success' : 'default';
                              return color === 'success' ? (
                                <Text type={color}> <ArrowDownOutlined /> {diffValue.toFixed(2)}</Text>
                              ) : (
                                <Text type={color}>{diffValue.toFixed(2)}</Text>
                              );
                            }}
                          />
                        </Table>
                        <Button style={{ marginLeft: 205, marginTop: -6 }} type="link"
                          onClick={() => showModal(staticData.procentDate, `Статистика по изменению срока`, 1)}>
                          Подробнее...
                        </Button>
                        <Title level={5}>Изменение срока</Title>
                      </div>
                    </>}
                    {staticData.procentSumm && <>
                      <div className="pie">
                        <Table dataSource={staticData.procentSumm}
                          pagination={{
                            pageSize: 4,
                          }}>
                          <Column title="Месяц 1" dataIndex="dateOld" key="dateOld" />
                          <Column title="Месяц 2" dataIndex="dateNew" key="dateNew" />
                          <Column
                            title="Разница"
                            dataIndex="diffValue"
                            key="diffValue"
                            render={diffValue => {
                              let color = diffValue === 74667.75 ? 'default' : 'success';
                              return color === 'success' ? (
                                <Text type={color}> <ArrowDownOutlined /> {diffValue.toFixed(2)}</Text>
                              ) : (
                                <Text type={color}>{diffValue.toFixed(2)}</Text>
                              );
                            }}
                          />
                        </Table>
                        <Button style={{ marginLeft: 205, marginTop: -6 }} type="link"
                          onClick={() => showModal(staticData.procentSumm, `Статистика по изменению остатка`,74667.75)}>
                          Подробнее...
                        </Button>
                        <Title level={5}>Изменение остатка</Title>
                      </div>
                    </>}
                    {staticData.procentEconom && <>
                      <div className="pie">
                        <Table dataSource={staticData.procentEconom}
                          pagination={{
                            pageSize: 5,
                          }}>
                          <Column title="Месяц 1" dataIndex="dateOld" key="dateOld" />
                          <Column title="Месяц 2" dataIndex="dateNew" key="dateNew" />
                          <Column
                            title="Разница"
                            dataIndex="diffValue"
                            key="diffValue"
                            render={diffValue => {
                              let color = diffValue > 0 ? 'success' : 'default';
                              return color === 'success' ? (
                                <Text type={color}> <ArrowUpOutlined /> {diffValue.toFixed(2)}</Text>
                              ) : (
                                <Text type={color}>{diffValue.toFixed(2)}</Text>
                              );
                            }}
                          />
                        </Table>
                        <Button style={{ marginLeft: 205, marginTop: -6 }} type="link"
                          onClick={() => showModal(staticData.procentEconom, `Статистика по изменению экономии`,0)}>
                          Подробнее...
                        </Button>
                        <Title level={5}>Изменение экономии</Title>
                      </div>
                    </>}
                  </div>
                </>
              }
            ]} />
            <div className="line">
              <DemoLine data={staticData.earlyPayGroup} />
              <Title level={5}>Досрочные погашения</Title>
            </div>
            <div className="table">
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Остаток"
                  value={(staticData.remainder).toFixed(2)}
                  valueStyle={{
                    color: '#cf1322',
                    fontSize: 20
                  }}
                  suffix="р."
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Выплачено"
                  value={staticData.paid}
                  valueStyle={{
                    color: '#3f8600',
                    fontSize: 20
                  }}
                  suffix="р."

                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Досрочно"
                  value={staticData.early_sum}
                  suffix="р."
                  valueStyle={{ fontSize: 20 }}
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Экономия"
                  value={staticData.saving}
                  suffix="р."
                  valueStyle={{
                    color: '#3f8600',
                    fontSize: 20
                  }}
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Срок кредита"
                  value={`месяцев: ${staticData.count_month_paid}`}
                  valueStyle={{ fontSize: 20 }}
                />
              </Card>
              <Card style={{ width: 195, marginRight: 10 }} size='small' bordered={false}>
                <Statistic
                  title="Остаток срока"
                  value={`месяцев: ${staticData.count_month_remainder}`}
                  valueStyle={{ color: '#cf1322', fontSize: 20 }}
                />
              </Card>
            </div>
            <Button onClick={handleSaveStatistic} type="primary"
              style={{
                marginLeft: 10,
                marginTop: 10,
                backgroundColor: '#5270A7',
              }}>Сохранить статистику</Button>
          </div>
        }</>}
    </>
  )
}

export default PageChartCredit;
