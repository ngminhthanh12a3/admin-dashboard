import { API_Inits, requestToAPI } from '@/handlers';
import { Badge, Card, Col, message, Switch, Tooltip } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import { API_SET_BROKER_REQUEST_URL } from '@/constants';

const StatusSwitch = ({ status, label, title, xl, lg, sm, xs }) => {
  const { currentDeviceWifiStatus, currentSelectDevice } = useModel('currentSelectDevice');
  const checkedState = status === 'ON' ? true : false;
  const badgeStatus = status === 'ON' ? 'success' : 'error';
  // const [loadingStatus, setLoadingStatus] = useState(false);
  const statusChange = async () => {
    if (currentDeviceWifiStatus !== 'ACTIVE') {
      message.error('Device is Offline');
    } else {
      // setLoadingStatus(false);
      const setStatus = status === 'ON' ? 'OFF' : 'ON';
      const { success } = await requestToAPI(
        API_SET_BROKER_REQUEST_URL,
        API_Inits({ body: { topicKey: title, message: setStatus, devID: currentSelectDevice } }),
      );
      message.success(success);
    }
  };
  return (
    <Col xl={xl} lg={lg} sm={sm} xs={xs} style={{ marginBottom: 24 }}>
      <Card title={<Badge status={badgeStatus} text={label} />}>
        <Tooltip title={label}>
          <Switch
            loading={false}
            onClick={statusChange}
            checked={checkedState}
            checkedChildren="ON"
            unCheckedChildren="OFF"
          />
        </Tooltip>
      </Card>
    </Col>
  );
};
export default StatusSwitch;
