import { notification, Switch } from 'antd';
import { API_SET_OTA_STATUS_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';

export default ({ OTA_DEVICE_TYPE, OTA_FILETYPE, OTA_ENABLE: OTA_STATUS = true }) => {
  const statusChange = async () => {
    // console.log(OTA_SET_ENABLE);
    const { type, message, description } = await requestToAPI(
      API_SET_OTA_STATUS_URL,
      API_Inits({ body: { OTA_DEVICE_TYPE, OTA_FILETYPE, OTA_ENABLE: !OTA_STATUS } }),
    );

    notification[type]({ message, description });
  };
  return (
    <Switch
      key={`${OTA_DEVICE_TYPE} ${OTA_FILETYPE}`}
      checkedChildren="Enable"
      unCheckedChildren="Disable"
      checked={OTA_STATUS}
      onClick={statusChange}
    />
  );
};
