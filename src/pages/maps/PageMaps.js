import React, { useState, useEffect } from "react";
import { Map, useYMaps, Placemark, FullscreenControl } from '@pbe/react-yandex-maps';
import { Button, DatePicker, Form, Input } from 'antd';
import axios from "axios";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

import './pageMaps.css'

dayjs.extend(utc);
const dateFormat = 'DD-MM-YYYY'
const GEO_CENTER = [55.75, 37.60]
const GEO_ZOOM = 12

const PageMaps = () => {

    const [coordinates, setCoordinates] = useState(null);
    const [coordinatesMaps, setCoordinatesMaps] = useState(null);
    const [adress, setAdress] = useState(null);
    const [saveMap, setSaveMap] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/maps`)
            .then((res) => setCoordinatesMaps(res.data.maps))
        // eslint-disable-next-line
    }, [saveMap])

    const ymaps = useYMaps(["geocode"])

    const onFinish = async (values) => {

        const maps = {
            adress: adress.location + ' ' + adress.route,
            coordinates: coordinates,
            date_maps: values.date,
            image_hash: values.photo
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/maps/add/placemark`, maps)

        setSaveMap(saveMap + 1)
        setCoordinates(null)
        setAdress(null)
    };

    function handleGeoResult(result) {

        const firstGeoObject = result.geoObjects.get(0);

        if (firstGeoObject) {
            const properties = firstGeoObject.properties;

            const location = String(properties.get("description", {}));
            const route = String(properties.get("name", {}));

            const foundAddress = {
                location,
                route
            };

            return foundAddress;
        }
    }

    const handleClickMap = (e) => {
        setAdress(null)

        const coords = e.get("coords")

        if (coords) {
            setCoordinates(coords)
        }

        ymaps?.geocode(coords).then((result) => {
            const foundAddress = handleGeoResult(result)

            if (foundAddress)
                setAdress(foundAddress)

        }).catch((error) => {
            console.log('Ошибка', error)
            setAdress(null)
        })
    }

    return (
        <>
            <div className="main_pageMaps">
                <div>
                    <Map style={{ height: 1000, width: 1400 }}
                        onClick={(e) => handleClickMap(e)}
                        defaultState={{ center: GEO_CENTER, zoom: GEO_ZOOM }}>
                        {coordinates && <Placemark geometry={coordinates} />}
                        {coordinatesMaps && coordinatesMaps.map(coord => <>
                            <Placemark options={
                                {
                                    preset: 'islands#circleDotIcon',
                                    iconColor: 'green',
                                }} geometry={coord.coordinates}
                                properties={{
                                    balloonContentHeader: coord.adress,
                                    balloonContentBody: coord.date_maps,
                                    balloonContentFooter: `<img width="218" height="300" src=${coord.image_hash} />`,
                                }}
                            />
                        </>)}
                        <FullscreenControl />
                    </Map>
                </div>
                {adress &&
                    <div className="mapsForm">
                        <Form name="basic" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item label="Адрес" name="adress" >
                                <Input type="text" defaultValue={adress?.location + " " + adress?.route} />
                            </Form.Item>

                            <Form.Item label="Фото" name="photo" >
                                <Input type="text" />
                            </Form.Item>

                            <Form.Item label="Дата" name="date">
                                <DatePicker format={dateFormat} />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                }
            </div>
        </>
    )
}
export default PageMaps;