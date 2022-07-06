import { Bullet } from '@ant-design/plots';
import { Card } from 'antd';

const color = {
  voltage: {
    range: ['#bfbfbf', '#FFe0b0', '#bfeec8'],
    measure: '#5B8FF9',
    target: '#39a3f4',
  },
  current: {
    // range: ['#bfbfbf', '#FFe0b0', '#bfeec8'],
    measure: '#5B8FF9',
    target: '#39a3f4',
  },
};
const legend = {
  custom: true,
  position: 'bottom',
  items: [
    {
      value: 'Device OFF',
      name: 'Device OFF',
      marker: {
        symbol: 'square',
        style: {
          fill: '#bfbfbf',
          r: 5,
        },
      },
    },
    {
      value: 'Warning',
      name: 'Warning',
      marker: {
        symbol: 'square',
        style: {
          fill: '#FFe0b0',
          r: 5,
        },
      },
    },
    {
      value: 'Normal',
      name: 'Normal',
      marker: {
        symbol: 'square',
        style: {
          fill: '#bfeec8',
          r: 5,
        },
      },
    },

    {
      value: 'Actual value',
      name: 'Actual value',
      marker: {
        symbol: 'square',
        style: {
          fill: '#5B8FF9',
          r: 5,
        },
      },
    },
    {
      value: 'Target value',
      name: 'Target value',
      marker: {
        symbol: 'line',
        style: {
          stroke: '#39a3f4',
          r: 5,
        },
      },
    },
  ],
};
const DemoBullet = ({ current1, current2, voltage1, voltage2 }) => {
  const data = [
    [
      {
        title: 'Current 2',
        ranges: [15],
        measures: [Number(current2)],
        target: 15,
      },
      {
        title: 'Current 1',
        ranges: [15],
        measures: [Number(current1)],
        target: 15,
      },
    ],
    [
      {
        title: 'Voltage 2',
        ranges: [50, 180, 230],
        // fix error: voltage2 not string
        measures: [Number(voltage2) ? Number(voltage2) : 0],
        target: [50, 180, 230],
      },
      {
        title: 'Voltage 1',
        ranges: [50, 180, 230],
        // fix error: voltage1 not string
        measures: [Number(voltage1) ? Number(voltage1) : 0],
        target: [50, 180, 230],
      },
    ],
  ];
  const config = {
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    xField: 'title',

    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    // 自定义 legend
  };
  return (
    <Card
      bodyStyle={{
        textAlign: 'center',
      }}
      bordered={false}
    >
      <Bullet style={{ height: '110px' }} {...config} data={data[0]} color={color['current']} />
      <Bullet
        legend={legend}
        style={{ height: '135px' }}
        {...config}
        color={color['voltage']}
        data={data[1]}
      />
    </Card>
  );
};
export default DemoBullet;
