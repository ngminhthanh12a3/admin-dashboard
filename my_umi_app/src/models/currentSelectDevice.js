import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
  const { deviceInfo } = useModel('deviceInfo');
  const [currentSelectDevice, setCurrentSelectDevice] = useState(-1);

  const currentDeviceInfo = deviceInfo[currentSelectDevice] || {};
  const currentDeviceWifiStatus = currentDeviceInfo['wifi_status'] || '';
  const currentDeviceInfoKeys = currentDeviceInfo ? Object.keys(currentDeviceInfo) : [];

  return {
    currentSelectDevice,
    setCurrentSelectDevice,
    currentDeviceInfoKeys,
    currentDeviceInfo,
    currentDeviceWifiStatus,
  };
};
