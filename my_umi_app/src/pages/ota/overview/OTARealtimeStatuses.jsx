// import { ChartCard, Field } from '@/pages/dashboard/analysis_source/components/Charts';
import { ChartCard, Field, StatusSwitch, Trend } from './components';
// import Trend from '@/pages/dashboard/analysis_source/components/Trend';
// import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import { useModel } from 'umi';
import styles from './style.less';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

export default () => {
  const { OTA_FIELDS = [] } = useModel('OTA_Fields');

  return (
    <Row gutter={24}>
      {OTA_FIELDS.map(
        ({
          OTA_CURRENT_VERSION = 1.0,
          OTA_LATES_UPDATE = NaN,
          OTA_FILETYPE = 'Local',
          OTA_DEVICE_TYPE = 'ESP32',
          OTA_ENABLE = true,
        }) => {
          const key = `${OTA_DEVICE_TYPE} ${OTA_FILETYPE}`;
          return (
            <Col {...topColResponsiveProps} key={key}>
              <ChartCard
                key={key}
                // bordered={false}
                title={key}
                total={`Version: ${numeral(OTA_CURRENT_VERSION).format('0.0')}`}
                footer={
                  <Field
                    key={key}
                    label="OTA Status: "
                    value={
                      <StatusSwitch
                        OTA_ENABLE={OTA_ENABLE}
                        OTA_DEVICE_TYPE={OTA_DEVICE_TYPE}
                        OTA_FILETYPE={OTA_FILETYPE}
                      />
                    }
                  />
                }
                contentHeight={46}
              >
                <Trend
                  key={key}
                  // flag="up"
                  style={{
                    marginRight: 16,
                  }}
                >
                  Lates Update:
                  <span key={key} className={styles.trendText}>
                    {moment(OTA_LATES_UPDATE).fromNow()}
                  </span>
                </Trend>
              </ChartCard>
            </Col>
          );
        },
      )}
    </Row>
  );
};
