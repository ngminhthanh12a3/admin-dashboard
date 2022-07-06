import { Select, Tooltip } from 'antd';
import { useModel } from 'umi';
const { Option } = Select;
export default () => {
  const { DeviceKey, deviceInfo } = useModel('deviceInfo');
  const { currentSelectDevice, setCurrentSelectDevice, currentDeviceInfo } =
    useModel('currentSelectDevice');

  const onChange = (value) => {
    setCurrentSelectDevice(value);
  };
  // select style
  const selectDeviceStyle =
    currentDeviceInfo['wifi_status'] === 'ACTIVE' ? { border: '2px solid lightGreen' } : {};

  // options style
  const optionStyle = {};
  DeviceKey.forEach((key) => {
    if (deviceInfo[key]['wifi_status'] === 'ACTIVE')
      optionStyle[key] = { backgroundColor: 'lightGreen' };
    else optionStyle[key] = {};
  });
  return (
    <Tooltip title="Select a device">
      <Select
        style={{ ...selectDeviceStyle, minWidth: '137px' }}
        value={currentSelectDevice === -1 ? null : currentSelectDevice}
        showSearch
        placeholder="Select a device"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {DeviceKey.map((key) => (
          <Option key={key} style={optionStyle[key]} value={key}>
            {key}
          </Option>
        ))}
      </Select>
    </Tooltip>
  );
};
