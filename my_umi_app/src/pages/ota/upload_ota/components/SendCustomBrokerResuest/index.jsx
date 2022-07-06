import { API_SEND_CUSTOM_BROKER_REQUEST_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import {
  ModalForm,
  //   ProForm,
  //   ProFormDateRangePicker,
  //   ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, notification } from 'antd';
// const waitTime = (time = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };
export default () => {
  const addonBefore = 'custom_topic/';
  const onFinish = async ({ custom_topic = addonBefore, custom_message = '' }) => {
    // await waitTime(2000);
    // console.log(values);
    // const { custom_topic = addonBefore, custom_message = '' } = values;
    0;

    const {
      type = 'info',
      message = 'Fail API',
      description = 'Error Request',
    } = await requestToAPI(
      API_SEND_CUSTOM_BROKER_REQUEST_URL,
      API_Inits({ body: { custom_topic: addonBefore + custom_topic, custom_message } }),
    );

    // const messageType = message[type];
    // messageType(messageText);
    notification[type]({ message, description, duration: 0 });
    return true;
  };
  return (
    <ModalForm
      title="Send Custom Broker Request"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Custom Broker Request
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={onFinish}
      submitter={{
        searchConfig: {
          submitText: 'Send custom request',
          //   resetText: '取消',
        },
        render: (props, defaultDoms) => {
          return [
            ...defaultDoms,
            <Button
              key="reset"
              type="primary"
              icon={<RedoOutlined />}
              onClick={() => {
                onFinish({ custom_topic: 'reset', custom_message: 'rs' });
              }}
            >
              Send Reset Request
            </Button>,
          ];
        },
      }}
    >
      <ProFormText
        width="md"
        name="custom_topic"
        label="Custom Topic Name"
        //   tooltip="最长为 24 位"
        //   placeholder="请输入名称"
        rules={[
          {
            required: true,
          },
        ]}
        addonBefore={addonBefore}
      />

      <ProFormTextArea
        name="custom_message"
        label="Custom message"
        width="lg"
        placeholder="Please enter a message"
      />
    </ModalForm>
  );
};
