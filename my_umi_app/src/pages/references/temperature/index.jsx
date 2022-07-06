import { Form, InputNumber } from 'antd';

const TemperatureRef = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="TemperatureRef"
        name="temperatureRef"
        rules={[
          {
            required: true,
            message: 'Please input your TemperatureRef!',
          },
        ]}
      >
        <InputNumber
          style={{
            width: 200,
          }}
          defaultValue="1"
          min="17"
          max="41"
          step="1"
          stringMode
        />
      </Form.Item>
    </Form>
  );
};
export default TemperatureRef;
