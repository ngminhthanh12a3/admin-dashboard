import { Column, Line } from '@ant-design/charts';
import { useModel } from 'umi';
import { Card, Row, Tabs, Col } from 'antd';
import { Suspense } from 'react';
import { Space } from 'antd';
import { DateSelect } from './components';
import styles from './style.less';

import { GridContent } from '@ant-design/pro-layout';
import DeviceSelect from '@/components/DeviceSelect';
import CurrentSelectDate from './CurrentSelectDate';

const { TabPane } = Tabs;

const offlineCurrentChartData = [];

const Analysis = () => {
  const { currentSelectDeviceAnalysis } = useModel('deviceInfoAnalysis');
  const temperatureAnalysis = currentSelectDeviceAnalysis
    ? currentSelectDeviceAnalysis['temperature']
    : [];
  return (
    <GridContent>
      <Row
        justify="space-around"
        align="middle"
        style={{
          marginBottom: 24,
        }}
      >
        <Col span={24}>
          <Space>
            <DeviceSelect />
            <DateSelect />
          </Space>
        </Col>
      </Row>
      <Suspense fallback={null}>
        <CurrentSelectDate />
      </Suspense>
      <Suspense fallback={null}>
        <Card
          className={styles.offlineCard}
          bordered={false}
          style={{
            marginTop: 32,
          }}
        >
          <Tabs defaultActiveKey="temperature">
            <TabPane tab="Temperature" key="temperature">
              <Column
                height={300}
                forceFit
                data={temperatureAnalysis}
                xField="date"
                yField="value"
                xAxis={{
                  visible: true,
                  title: {
                    visible: false,
                  },
                }}
                yAxis={{
                  visible: true,
                  title: {
                    visible: false,
                  },
                }}
                title={{
                  visible: true,
                  text: 'Temperature',
                  style: {
                    fontSize: 14,
                  },
                }}
                // meta={{
                //   y: {
                //     alias: '销售量',
                //   },
                // }}
              />
            </TabPane>
          </Tabs>
        </Card>

        <Card
          className={styles.offlineCard}
          bordered={false}
          title="Current Analysis"
          style={{
            marginTop: 32,
          }}
        >
          <Line
            forceFit
            height={400}
            data={offlineCurrentChartData}
            responsive
            xField="date"
            yField="value"
            seriesField="type"
            interactions={[
              {
                type: 'slider',
                cfg: {},
              },
            ]}
            legend={{
              position: 'top-center',
            }}
          />
        </Card>
      </Suspense>
    </GridContent>
  );
};

export default Analysis;
