import { useModel } from 'umi';

export default ({ key, Option, style }) => {
  const { deviceInfo } = useModel('deviceInfo');
  const deviceInfoOption = deviceInfo[key];
  const deviceOptionStatus = deviceInfoOption['wifi_status'];
  const deviceOptionStyle =
    deviceOptionStatus === 'ACTIVE' ? { backgroundColor: 'lightGreen' } : {};
  console.log(deviceOptionStyle);
  return (
    <Option style={deviceOptionStyle} key={key} value={key}>
      {key}
    </Option>
  );
};
