import { Card, List, Row, Statistic } from 'antd';
import { useModel } from 'umi';
export default () => {
  const { currentDeviceInfoKeys, currentDeviceInfo } = useModel('currentSelectDevice');
  return (
    <Row
      style={{
        marginBottom: 24,
      }}
    >
      <Card title="Real-time status" bordered={false} style={{ width: '100%' }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={currentDeviceInfoKeys}
          renderItem={(item) => (
            <List.Item>
              <Statistic title={item} value={currentDeviceInfo[item]} />
            </List.Item>
          )}
        />
      </Card>
    </Row>
  );
};
