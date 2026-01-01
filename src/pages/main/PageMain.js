import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, Spin, Select, Tabs, Tree, message, Button, Table, Modal, Statistic, Collapse } from 'antd';
import { LoadingOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import LineMain from "../../components/ChartsCredit/LinePulse";
import ColumnCompare from "../../components/ChartsCredit/Column";
import Purpose from "../../components/Purpose/Purpose";

import "./pageMain.css"

const { Title, Text } = Typography;
const { TabPane } = Tabs
const { Panel } = Collapse;

const PageMain = ({ year }) => {

  const [staticData, setStaticData] = useState(null)
  const [staticJobs, setStaticJobs] = useState(undefined)
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCard, setIsModalOpenCard] = useState(false);
  const [isModalData, setIsModalData] = useState(null);
  const [isModalJobs, setIsModalJobs] = useState(true);
  const [isModalTitle, setIsModalTitle] = useState('');
  const [isModalColumn, setIsModalColumn] = useState(null);
  const [isModalYear, setIsModalYear] = useState(year);
  const [isCompareYear1, setIsCompareYear1] = useState(2024);
  const [isCompareYear2, setIsCompareYear2] = useState(2025);
  const [isProductCompare, setIsProductCompare] = useState('games');
  const [isDefaultYearCompare, setIsDefaultYearCompare] = useState({
    year_1: isCompareYear1,
    year_2: isCompareYear2
  })
  const [staticDataCompare, setStaticDataCompare] = useState(null)
  const [staticDataCompareProduct, setStaticDataCompareProduct] = useState(null)

  const fetchStatic = async (years) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/main/static/${years}`)
      .then((res) => [setStaticData(res.data), setStaticJobs(res.data.jobsMonth)])
  }
  useEffect(() => {
    fetchStatic(year)
  }, [year])

  const handleChange = async (value) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/main/static/${value}`)
      .then(res => setStaticData(res.data), setIsModalYear(value))
  }

  const handleCompare = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/main/compare`, isDefaultYearCompare)
      .then(res => setStaticDataCompare(res.data))
  }

  const handleCompareProduct = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/main/compare/column/${isProductCompare}`, isDefaultYearCompare)
      .then(res => setStaticDataCompareProduct(res.data.groupCompare))
  }

  const handleChangeProduct = (value) => {
    setIsProductCompare(value)
  }

  const handleOkJobsMonth = () => {
    setIsModalJobs(false)
    axios.get(`${process.env.REACT_APP_API_URL}/jobs/month/${staticJobs[0]._id}`)
  }

  const handleChangeYear1 = (value) => {
    setIsCompareYear1(value)
    setIsDefaultYearCompare({
      year_1: value,
      year_2: isCompareYear2
    })
  }

  const handleChangeYear2 = (value) => {
    setIsCompareYear2(value)
    setIsDefaultYearCompare({
      year_1: isCompareYear1,
      year_2: value
    })
  }

  const onSelect = (selectedKeys, info) => {
    navigator.clipboard.writeText(info.node.title)
    messageApi.open({
      type: 'success',
      content: `"${info.node.title}" copy`
    })
  };

  const showModal = (data, title, column) => {
    setIsModalOpen(true);
    setIsModalData(data)
    setIsModalTitle(title)
    setIsModalColumn(column)
  };

  const showModalCard = (title) => {
    setIsModalOpenCard(true);
    setIsModalTitle(title)
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenCard(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenCard(false);
  };

  const columns = [
    [
      { title: 'Месяц', dataIndex: 'date_pulse' }, { title: 'Куплено игр', dataIndex: 'buy' },
      { title: 'Потрачено на игры', dataIndex: 'price' }, { title: 'Пройдено игр', dataIndex: 'pulse' }
    ],
    [
      { title: 'Месяц', dataIndex: 'date_pulse' }, { title: 'Куплено книг', dataIndex: 'buy' },
      { title: 'Потрачено на книги', dataIndex: 'price' }, { title: 'Прочитано книг', dataIndex: 'pulse' }
    ],
    [
      { title: 'Месяц', dataIndex: 'date_pulse' }, { title: 'Потрачено на хобби', dataIndex: 'price' },
      { title: 'Покрашено миниатюр', dataIndex: 'pulse' }
    ],
    [
      { title: 'Месяц', dataIndex: 'date_pulse' }, { title: 'Куплено карточек', dataIndex: 'buy' },
      { title: 'Потрачено на карточки', dataIndex: 'price' }
    ],
    [
      { title: 'Месяц', dataIndex: 'date_pulse' }, { title: 'Заработок', dataIndex: 'count_pulse' },
    ],
    [
      { title: 'Месяц', dataIndex: 'date_pulse' }, { title: 'Погашение', dataIndex: 'count_pulse' },
    ],
    [
      { title: 'Месяц', dataIndex: 'date_pulse' }, { title: 'Куплено волчков', dataIndex: 'buy' },
      { title: 'Потрачено на волчки', dataIndex: 'price' }
    ],
  ]

  return (
    <>
      {contextHolder}

      {staticData === null ? <><div className="loader">
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
        {Object.keys(staticJobs).length === 0 ?
          <></> :
          <><Modal title="Итоги месяца" open={isModalJobs} onOk={handleOkJobsMonth} onCancel={handleOkJobsMonth}>
            <Collapse defaultActiveKey={['0']}>
              {
                staticJobs[0].children.map(jobs => <Panel header={jobs.name + " " + jobs.value} key={jobs.key}>
                  {jobs.prefix === '>' ? <Text type="success">{jobs.text}</Text> :
                    jobs.prefix === '<' ?
                      <Text type="danger">{jobs.text}</Text> :
                      <Text>{jobs.text}</Text>}
                </Panel>)
              }
            </Collapse>
          </Modal></>
        }
        <Modal title={isModalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Table columns={isModalColumn} dataSource={isModalData} pagination={false} size="middle" />
        </Modal>

        <Modal style={{
          top: 10,
        }} title={isModalTitle} open={isModalOpenCard} onOk={handleOk} onCancel={handleCancel} width={550}>
          <Card style={{ height: 1465, marginTop: 10, marginRight: 10 }}>
            <div className="cards">
              <Text style={{ marginTop: -10, marginBottom: 10 }}>Приобретено карточек Человек Паук: <Text type="success">{staticData.count_card_priceSpider_Man}</Text> </Text>
              <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyearSpider_Man} р.</Text> </Text>
              <LineMain data={staticData.sortedCardPriceSpider_Man} />
            </div>
            <div className="cards">
              <Text style={{ marginTop: 15, marginBottom: 10 }}>Приобретено карточек Черепашки Ниндзя: <Text type="success">{staticData.count_card_priceTeenage_Mutant_Ninja}</Text> </Text>
              <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyearTeenage_Mutant_Ninja} р.</Text> </Text>
              <LineMain data={staticData.sortedCardPriceTeenage_Mutant_Ninja} />
            </div>
            <div className="cards">
              <Text style={{ marginTop: 15, marginBottom: 10 }}>Приобретено карточек Бакуган: <Text type="success">{staticData.count_card_priceBakugan}</Text> </Text>
              <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyearBakugan} р.</Text> </Text>
              <LineMain data={staticData.sortedCardPriceBakugan} />
            </div>
            <div className="cards">
              <Text style={{ marginTop: 15, marginBottom: 10 }}>Приобретено карточек Бейблейд: <Text type="success">{staticData.count_card_priceBeyblade}</Text> </Text>
              <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyearBeyblade} р.</Text> </Text>
              <LineMain data={staticData.sortedCardPriceBeyblade} />
            </div>
            <div className="cards">
              <Text style={{ marginTop: 15, marginBottom: 10 }}>Приобретено карточек Трансформеры: <Text type="success">{staticData.count_card_priceTransformers}</Text> </Text>
              <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyearTransformers} р.</Text> </Text>
              <LineMain data={staticData.sortedCardPriceTransformers} />
            </div>
            <div className="cards">
              <Text style={{ marginTop: 15, marginBottom: 10 }}>Приобретено карточек Супергонки: <Text type="success">{staticData.count_card_priceSuperRacing}</Text> </Text>
              <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyearSuperRacing} р.</Text> </Text>
              <LineMain data={staticData.sortedCardPriceSuperRacing} />
            </div>
            <div className="cards">
              <Text style={{ marginTop: 15, marginBottom: 10 }}>Приобретено карточек Наруто: <Text type="success">{staticData.count_card_priceNaruto}</Text> </Text>
              <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyearNaruto} р.</Text> </Text>
              <LineMain data={staticData.sortedCardPriceNaruto} />
            </div>
          </Card>
        </Modal>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Статистика" key="1">
            {
              staticData &&
              <div className="tabMain">
                <div className="tab">
                  <div className="tab1_1">
                    <Title level={5}>Сводка за <Select
                      defaultValue={year}
                      onChange={handleChange}
                      style={{ width: 85 }}
                      options={[
                        { value: '2024', label: '2024 г.' },
                        { value: '2025', label: '2025 г.' },
                        { value: '2026', label: '2026 г.' },
                      ]}
                    /> </Title>
                  </div>
                  <div className="tab1_2">
                    <Card style={{ height: 570, marginTop: 10, marginRight: 10 }}>
                      <div className="card_game">
                        <Text style={{ marginTop: -10, marginBottom: 15 }}>Пройдено игр: <Text type="success">{staticData.summGames}</Text> </Text>
                        <LineMain style={{ height: 100 }} data={staticData.sortedGames} />
                        <Text level={5} style={{ marginBottom: 15, marginTop: 11 }}>Приобретено игр: <Text type="success">{staticData.count_games_price}</Text> </Text>
                        <LineMain style={{ height: 100 }} data={staticData.sortedGamesPriceCount} />
                        <Text level={5} style={{ marginBottom: 15, marginTop: 12 }}>Потрачено на игры: <Text type="success">{staticData.sum_games_nowyear} р.</Text> </Text>
                        <LineMain style={{ height: 100 }} data={staticData.sortedGamesPrice} />
                        <Text level={5} style={{ marginTop: 14 }}>Затрачено времени: <Text type="success">{(staticData.time_games_nowyear).toFixed(2)} ч.</Text> </Text>
                        <Button style={{ marginLeft: 365, marginTop: -6 }} type="link" onClick={() => showModal(staticData.gamesAssemble, `Общая статистика по играм за ${isModalYear}`, columns[0])}>Подробнее...</Button>
                      </div>
                    </Card>
                    <Card style={{ height: 490, marginTop: 10, marginRight: 10 }}>
                      <div className="card_game">
                        <Text style={{ marginTop: -10, marginBottom: 15 }}>Приобретено волчков: <Text type="success">{staticData.count_beyblade_price}</Text> </Text>
                        <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на волчки: <Text type="success">{staticData.sum_beyblade_nowyear} р.</Text> </Text>
                        <LineMain data={staticData.sortedBeybladePriceCount} />
                        <Button style={{ marginLeft: 365 }} type="link" onClick={() => showModal(staticData.beybladeAssemble, `Общая статистика по волчкам за ${isModalYear}`, columns[6])}>Подробнее...</Button>

                        <Text style={{ marginTop: 15, marginBottom: 10 }}>Приобретено карточек: <Text type="success">{staticData.count_card_price}</Text> </Text>
                        <Text level={5} style={{ marginTop: -11, marginBottom: 15 }}>Потрачено на карточки: <Text type="success">{staticData.sum_card_nowyear} р.</Text> </Text>
                        <LineMain data={staticData.cardsOtherCollection} />
                        <Button style={{ marginLeft: 355 }} type="link" onClick={() => showModalCard(`Полная статистика по карточкам за ${isModalYear}`)}>Полная статистика...</Button>
                        <Button style={{ marginLeft: 365 }} type="link" onClick={() => showModal(staticData.cardsAssemble, `Общая статистика по карточкам за ${isModalYear}`, columns[3])}>Подробнее...</Button>
                      </div>
                    </Card>
                    <Card style={{ height: 570, marginTop: 10 }}>
                      <div className="card_game">
                        <Text style={{ marginTop: -10, marginBottom: 15 }}>Прочитано книг: <Text type="success">{staticData.summBooks}</Text> </Text>
                        <LineMain data={staticData.sortedBooks} />
                        <Text level={5} style={{ marginBottom: 15, marginTop: 11 }}>Приобретено книг: <Text type="success">{staticData.count_books_price}</Text> </Text>
                        <LineMain data={staticData.sortedbooksPriceCount} />
                        <Text level={5} style={{ marginBottom: 15, marginTop: 12 }}>Потрачено на книги: <Text type="success">{staticData.sum_books_nowyear} р.</Text> </Text>
                        <LineMain data={staticData.sortedbooksPrice} />
                        <Button style={{ marginLeft: 365, marginTop: -2 }} type="link" onClick={() => showModal(staticData.booksAssemble, `Общая статистика по книгам за ${isModalYear}`, columns[1])}>Подробнее...</Button>
                      </div>
                    </Card>
                    <Card style={{ height: 275, marginTop: 10, marginRight: 10 }}>
                      <div className="card">
                        <Text style={{ marginTop: -10, marginBottom: 15 }}>Заработок: <Text type="success">{(staticData.summ_salary_year).toFixed(2)} р.</Text></Text>
                        <LineMain data={staticData.sortedSalary} />
                        <Text level={5} style={{ marginTop: 14, marginBottom: 15 }}>Оклад: <Text type="success">{(staticData.summ_delta).toFixed(2)} р.</Text></Text>
                        <Text level={5} style={{ marginTop: -5 }}>Подработки: <Text type="success">{(staticData.summ_bonus_year).toFixed(2)} р.</Text></Text>
                        <Button style={{ marginLeft: 365, marginTop: -5 }} type="link" onClick={() => showModal(staticData.sortedSalary, `Общая статистика по заработку за ${isModalYear}`, columns[4])}>Подробнее...</Button>
                      </div>
                    </Card>
                    <Card style={{ height: 275, marginTop: 10, marginRight: 10 }}>
                      <div className="card">
                        <Text style={{ marginTop: -10, marginBottom: 15 }}>Выплачено ипотеки: <Text type="success">{staticData.summPayments} р.</Text> </Text>
                        <LineMain data={staticData.sortedPayments} />
                        <Text level={5} style={{ marginTop: 14, marginBottom: 15 }}>Ежемесячные платежи: <Text type="success">{(staticData.summ_payments).toFixed(2)} р.</Text> </Text>
                        <Text level={5} style={{ marginTop: -5 }}>Досрочные платежи: <Text type="success">{staticData.summ_early_payment} р.</Text> </Text>
                        <Button style={{ marginLeft: 365, marginTop: -5 }} type="link" onClick={() => showModal(staticData.sortedPayments, `Общая статистика по ипотеке за ${isModalYear}`, columns[5])}>Подробнее...</Button>
                      </div>
                    </Card>
                    <Card style={{ height: 275, marginTop: 10 }}>
                      <div className="card">
                        <Text style={{ marginTop: -10, marginBottom: 15 }}>Покрашено миниатюр: <Text type="success">{staticData.summMiniatures}</Text> </Text>
                        <LineMain data={staticData.sortedMiniatures} />
                        <Text level={5} style={{ marginTop: 14, marginBottom: 15 }}>Потрачено на миньки: <Text type="success">{staticData.sum_miniatures_nowyear} р.</Text> </Text>
                        <Text level={5} style={{ marginTop: -5 }}>Потрачено на краску: <Text type="success">{staticData.sum_color_nowyear} р.</Text> </Text>
                        <Button style={{ marginLeft: 365, marginTop: -5 }} type="link" onClick={() => showModal(staticData.hobbyAssemble, `Общая статистика по хобби за ${isModalYear}`, columns[2])}>Подробнее...</Button>
                      </div>
                    </Card>

                  </div>
                  {/* <div className="tab2_2">
                    <PieMain data={staticData.dataPieCount} />
                    <PieMain data={staticData.dataPiePrice} />
                  </div> */}
                </div>
              </div>
            }
          </TabPane>
          <TabPane tab="Движения" key="2">
            {staticData &&

              <div className="tabMain">
                <div className="tab">
                  <div className="mainTree">
                    <div className="tree">

                      <Text style={{ marginTop: -10, marginBottom: 15 }}>Пройдено игр: <Text type="success">{staticData.summGames}</Text> </Text>
                      <Tree style={{ width: 380 }}
                        onSelect={onSelect}
                        showLine
                        defaultExpandAll={true}
                        treeData={staticData.games_pulse}
                      />
                    </div>
                    <div className="tree">
                      <Text style={{ marginTop: -10, marginBottom: 15 }}>Прочитано книг: <Text type="success">{staticData.summBooks}</Text> </Text>
                      <Tree style={{ width: 380 }}
                        onSelect={onSelect}
                        showLine
                        defaultExpandAll={true}
                        treeData={staticData.books_pulse}
                      />
                    </div>
                    <div className="tree">
                      <Text style={{ marginTop: -10, marginBottom: 15 }}>Покрашено миниатюр: <Text type="success">{staticData.summMiniatures}</Text> </Text>
                      <Tree style={{ width: 380 }}
                        onSelect={onSelect}
                        showLine
                        defaultExpandAll={true}
                        treeData={staticData.miniature_pulse}
                      />
                    </div>
                    <div className="tree">
                      <Text level={5} style={{ marginTop: -5, marginBottom: 15 }}>Приобретено игр: <Text type="success">{staticData.count_games_price}</Text> </Text>
                      <Tree style={{ width: 380 }}
                        onSelect={onSelect}
                        showLine
                        defaultExpandAll={true}
                        treeData={staticData.games_price_pulse}
                      />
                    </div>
                    <div className="tree">
                      <Text level={5} style={{ marginTop: -5, marginBottom: 15 }}>Приобретено книг: <Text type="success">{staticData.count_books_price}</Text> </Text>
                      <Tree style={{ width: 380 }}
                        onSelect={onSelect}
                        showLine
                        defaultExpandAll={true}
                        treeData={staticData.books_price_pulse}
                      />
                    </div>
                    <div className="tree">
                      <Text level={5} style={{ marginTop: -5, marginBottom: 15 }}>Приобретено миниатюр: <Text type="success">{staticData.count_miniatures_price}</Text> </Text>
                      <Tree style={{ width: 380 }}
                        onSelect={onSelect}
                        showLine
                        defaultExpandAll={true}
                        treeData={staticData.miniatures_price_pulse}
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
          </TabPane>
          <TabPane tab="Сравнение" key="4">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Статистика общая" key="1">
                {staticData &&
                  <div className="tabMain">
                    <div className="statisticMain">
                      <div className="statisticKolbaska">
                        <Title level={5}>Статистика за <Select
                          defaultValue={isCompareYear1}
                          onChange={handleChangeYear1}
                          style={{ width: 85 }}
                          options={[
                            { value: '2024', label: '2024 г.' },
                            { value: '2025', label: '2025 г.' },
                            { value: '2026', label: '2026 г.' },
                          ]}
                        /> </Title>
                        {
                          staticDataCompare && staticDataCompare.statisticYearNumber1.map(arr =>
                            arr.prefix === '<' ? <>
                              <Card bordered={false}>
                                <Statistic
                                  title={arr.name}
                                  value={arr.value.toFixed(0)}
                                  valueStyle={{
                                    color: '#cf1322',
                                    width: 400
                                  }}
                                  prefix={<ArrowDownOutlined />}
                                />
                              </Card>
                            </> : arr.prefix === '>' ? <>
                              <Card bordered={false}>
                                <Statistic
                                  title={arr.name}
                                  value={arr.value.toFixed(0)}
                                  valueStyle={{
                                    color: '#3f8600',
                                    width: 400
                                  }}
                                  prefix={<ArrowUpOutlined />}
                                />
                              </Card>
                            </> : <>
                              <Card bordered={false}>
                                <Statistic
                                  title={arr.name}
                                  value={arr.value.toFixed(0)}
                                  valueStyle={{
                                    width: 400
                                  }}
                                />
                              </Card>
                            </>
                          )
                        }
                      </div>
                      <div>
                        <Button
                          onClick={handleCompare}
                          type="primary"
                          style={{
                            marginTop: 10,
                            backgroundColor: '#5270A7',
                          }}
                        >
                          Сравнить
                        </Button>
                      </div>
                      <div className="statisticKolbaska">
                        <Title level={5}>Статистика за <Select
                          defaultValue={isCompareYear2}
                          onChange={handleChangeYear2}
                          style={{ width: 85 }}
                          options={[
                            { value: '2024', label: '2024 г.' },
                            { value: '2025', label: '2025 г.' },
                            { value: '2026', label: '2026 г.' },
                          ]}
                        /> </Title>
                        {
                          staticDataCompare && staticDataCompare.statisticYearNumber2.map(arr =>
                            arr.prefix === '<' ? <>
                              <Card bordered={false}>
                                <Statistic
                                  title={arr.name}
                                  value={arr.value.toFixed(0)}
                                  valueStyle={{
                                    color: '#cf1322',
                                    width: 400
                                  }}
                                  prefix={<ArrowDownOutlined />}
                                />
                              </Card>
                            </> : arr.prefix === '>' ? <>
                              <Card bordered={false}>
                                <Statistic
                                  title={arr.name}
                                  value={arr.value.toFixed(0)}
                                  valueStyle={{
                                    color: '#3f8600',
                                    width: 400
                                  }}
                                  prefix={<ArrowUpOutlined />}
                                />
                              </Card>
                            </> : <>
                              <Card bordered={false}>
                                <Statistic
                                  title={arr.name}
                                  value={arr.value.toFixed(0)}
                                  valueStyle={{
                                    width: 400
                                  }}
                                />
                              </Card>
                            </>
                          )
                        }
                      </div>
                    </div>
                  </div>}
              </TabPane>
              <TabPane tab="Статистика по продукту" key="2">
                {staticData &&

                  <div className="tabMain">
                    <div className="tabCompare">
                      <div>
                        <Card bordered={false}>

                          <Title level={5}>Продукт <Select
                            onChange={handleChangeProduct}
                            style={{ width: 200 }}
                            options={[
                              { value: 'games', label: 'Пройдено игр' },
                              { value: 'games_price', label: 'Приобретено игр' },
                              { value: 'games_price2', label: 'Потрачено на игры' },

                              { value: 'books', label: 'Прочитано книг' },
                              { value: 'books_price', label: 'Приобретено книг' },
                              { value: 'books_price2', label: 'Потрачено на книги' },

                              { value: 'beyblade_price', label: 'Приобретено волчков' },
                              { value: 'beyblade_price2', label: 'Потрачено на волчки' },

                              { value: 'card_price', label: 'Приобретено карточек' },
                              { value: 'card_price2', label: 'Потрачено на карточки' },

                              { value: 'salary', label: 'Заработок' },

                              { value: 'payments', label: 'Ипотека' },

                              { value: 'miniature', label: 'Покрашено миниатюр' }
                            ]} />
                          </Title>

                          <Title level={5}>Статистика за <Select
                            defaultValue={isCompareYear1}
                            onChange={handleChangeYear1}
                            style={{ width: 85 }}
                            options={[
                              { value: '2024', label: '2024 г.' },
                              { value: '2025', label: '2025 г.' },
                              { value: '2026', label: '2026 г.' },
                            ]}
                          />
                          </Title>

                          <Title level={5}>Статистика за <Select
                            defaultValue={isCompareYear2}
                            onChange={handleChangeYear2}
                            style={{ width: 85 }}
                            options={[
                              { value: '2024', label: '2024 г.' },
                              { value: '2025', label: '2025 г.' },
                              { value: '2026', label: '2026 г.' },
                            ]}
                          />
                          </Title>

                          <Button
                            onClick={handleCompareProduct}
                            type="primary"
                            style={{
                              marginTop: 10,
                              backgroundColor: '#5270A7',
                            }}
                          >
                            Сравнить
                          </Button>
                        </Card>
                      </div>
                      {staticDataCompareProduct &&
                        <div className="compareProduct">
                          <ColumnCompare data={staticDataCompareProduct} />
                        </div>
                      }

                    </div>

                  </div>}
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Цели" key="5">
            <div className="tabPurpose">
              {
                staticData && staticData.purposeCollect.map((obj) =>
                  <Purpose purposeCollect={obj}/>
                )
              }
            </div>
          </TabPane>
        </Tabs>
      </>}
    </>

  )
}
export default PageMain