import { Gauge } from '@ant-design/plots';
import { Card, Col } from 'antd';

const difference = 45 - 10;
const minimum = 10;
const tempToPercent = (temp) => {
  return (temp - minimum) / difference;
};

const percentToTemp = (percent) => {
  return percent * difference + minimum;
};
const TemperatureGauge = ({ temperature, temperature_warning }) => {
  const color = ['#40a9ff', '#95de64', '#ff7875'];
  const ticks = [0, tempToPercent(18), tempToPercent(40), 1];
  const config = {
    forceFit: true,
    height: 180,
    percent: tempToPercent(temperature),
    type: 'meter',
    innerRadius: 0.75,
    range: {
      ticks: ticks,
      color: color,
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          return percentToTemp(Number(v));
        },
      },
      subTickLine: {
        count: 5,
      },
    },
    statistic: {
      title: {
        formatter: () => {
          return temperature + '&#8451';
        },
        style: () => {
          return {
            fontSize: '16px',
            lineHeight: 1,
          };
        },
      },
      content: {
        offsetY: 16,
        style: ({ percent }) => {
          return {
            fontSize: '16px',
            lineHeight: '36px',
            color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
          };
        },
        formatter: () => temperature_warning,
      },
    },
  };
  return (
    <Col
      xl={8}
      lg={24}
      sm={24}
      xs={24}
      style={{
        marginBottom: 24,
      }}
    >
      <Card
        title="Temperature"
        bodyStyle={{
          textAlign: 'center',
          paddingBottom: 32,
        }}
        bordered={false}
      >
        <Gauge {...config} />
      </Card>
    </Col>
  );
};

export default TemperatureGauge;
