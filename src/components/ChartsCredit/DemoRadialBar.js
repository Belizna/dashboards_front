import { RadialBar } from '@ant-design/plots';

const DemoRadialBar = () => {
    const data = [
        {
            name: 'Цель',
            star: 5,
        },
        {
            name: 'Текущее',
            star: 1,
        },
    ];
    const config = {
        data,
        xField: 'name',
        yField: 'star',
        maxAngle: 360,
        //最大旋转角度,
        radius: 0.8,
        innerRadius: 0.8,
        colorField: 'star',
        color: ({ star }) => {
            if (star === data[0].star) {
                return '#46b920ff';
            } else if (star < (data[0].star / 2)) {
                return '#ff93a7';
            }
            else if (star > (data[0].star *0.85) && star < data[0].star) {
                return '#aef1a6ff';
            }
            else if (star > data[0].star) {
                return '#10f600ff';
            }

            return '#ed722aff';
        },
        barBackground: {},
        barStyle: {
            lineCap: 'round',
        },
        xAxis: false,
        annotations: [
            {
                type: 'text',
                position: ['50%', '50%'],
                content: data[0].star,
                style: {
                    textAlign: 'center',
                    fontSize: 85,
                    fill: '#ffffffff'
                },
            },
        ],
    };
    return <RadialBar {...config} />;
};

export default DemoRadialBar;