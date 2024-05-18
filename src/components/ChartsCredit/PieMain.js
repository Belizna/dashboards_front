import { Pie , G2 } from "@ant-design/plots";


const PieMain = ({data}) => {

    const G = G2.getEngine('canvas');
    const cfg = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        color : ['#204CA3', '#6783BB', '#6396FA', '#8AB1FD', '#A9C5FD'],
        radius: 0.75,
        legend: false,
        label: {
          type: 'spider',
          labelHeight: 40,
          formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
              type: 'circle',
              attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                r: 5,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              attrs: {
                x: 10,
                y: 8,
                text: `${data.type}`,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              attrs: {
                x: 0,
                y: 25,
                text: `${data.value}个 ${(data.percent * 100).toFixed(2)}%`,
                fill: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 700,
              },
            });
            return group;
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
      };
      const config = cfg;
      return <Pie style={{width: 700}} {...config}/>
}

export default PieMain