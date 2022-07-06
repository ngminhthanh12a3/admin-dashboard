import { API_SEND_CUSTOM_BROKER_REQUEST_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';
import { RedoOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';

export default ({ currentSelectDevice }) => {
  const onClick = async () => {
    const reset_topic = `devID/${currentSelectDevice}/reset`;
    const {
      type = 'info',
      message = 'Fail API',
      description = 'Error Request',
    } = await requestToAPI(
      API_SEND_CUSTOM_BROKER_REQUEST_URL,
      API_Inits({ body: { custom_topic: reset_topic, custom_message: 'rs' } }),
    );

    // const messageType = message[type];
    // messageType(messageText);
    notification[type]({ message, description });
    return true;
  };
  return (
    <Button icon={<RedoOutlined />} onClick={onClick} type="primary">
      Reset
    </Button>
  );
};
