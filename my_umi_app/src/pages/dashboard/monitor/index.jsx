import { useModel } from 'umi';
import { Card, Col, Empty, Row, Space } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import DeviceSelect from '@/components/DeviceSelect';
import {
  SelectDeviceInfo,
  TemperatureGauge,
  GroupBullet,
  StatusSwitch,
  RelayWarningStatus,
  DynamoStatus,
  VoltageWarningStatus,
  ResetButton,
} from './components';
const Monitor = () => {
  const { currentDeviceInfo, currentSelectDevice } = useModel('currentSelectDevice');

  const renderQuerry = currentSelectDevice != -1;
  return (
    <GridContent>
      <>
        <Row
          style={{
            marginBottom: 24,
          }}
        >
          <Space>
            <DeviceSelect />
            {renderQuerry && <ResetButton currentSelectDevice={currentSelectDevice} />}
          </Space>
        </Row>

        {renderQuerry ? (
          <>
            <Row gutter={24}>
              <TemperatureGauge
                temperature={currentDeviceInfo['temperature']}
                temperature_warning={currentDeviceInfo['temperature_warning']}
              />
              <Col
                xl={16}
                lg={24}
                sm={24}
                xs={24}
                style={{
                  marginBottom: 24,
                }}
              >
                <GroupBullet
                  current1={currentDeviceInfo['current1']}
                  current2={currentDeviceInfo['current2']}
                  voltage1={currentDeviceInfo['voltage1']}
                  voltage2={currentDeviceInfo['voltage2']}
                  // voltage1={10}
                  // voltage2={6}
                />
              </Col>
            </Row>
            <Row gutter={24} align="middle" justify="center">
              {/* <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card style={{ minWidth: '184px' }}>
                  <Card.Grid style={gridStyle}>
                    <StatusSwitch status={currentDeviceInfo['status1']} title="status1" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <StatusSwitch status={currentDeviceInfo['status2']} title="status2" />
                  </Card.Grid>
                </Card>
              </Col> */}
              <StatusSwitch
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                label="On/Off Relay 1"
                title="status1"
                status={currentDeviceInfo['status1']}
              />
              <StatusSwitch
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                title="status2"
                label="On/Off Relay 2"
                status={currentDeviceInfo['status2']}
              />
              <RelayWarningStatus
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                text="Relay Status 1"
                status={currentDeviceInfo['relay_warning1'] || ''}
              />
              <RelayWarningStatus
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                text="Relay Status 2"
                status={currentDeviceInfo['relay_warning2'] || ''}
              />
              <DynamoStatus
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                text="Dynamo status"
                status={currentDeviceInfo['dynamo_status'] || ''}
              />
              <DynamoStatus
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                text="Wifi status"
                status={currentDeviceInfo['wifi_status'] || ''}
              />
              <VoltageWarningStatus
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                text="Voltage warning 1"
                voltage={currentDeviceInfo['voltage1'] || 0}
              />
              <VoltageWarningStatus
                xl={6}
                lg={12}
                sm={24}
                xs={24}
                text="Voltage warning 2"
                voltage={currentDeviceInfo['voltage2'] || 0}
              />
            </Row>

            <Row gutter={24}></Row>

            {/* <SelectDeviceInfo /> */}
          </>
        ) : (
          <Card>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Card>
        )}
      </>
    </GridContent>
  );
};

export default Monitor;
