import { Form, Button, Upload, message, InputNumber } from 'antd';
import { useModel } from 'umi';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import numeral from 'numeral';
import { API_UPLOAD_FILE_URL } from '@/constants';
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const Demo = () => {
  const { OTA_FIELDS } = useModel('OTA_Fields');
  const { OTA_CURRENT_VERSION } = OTA_FIELDS;
  const defaultVersion = numeral(OTA_CURRENT_VERSION + 0.1).format('0.0');
  const onFinish = async (values) => {
    try {
      const file = values.dragger[0];
      const data = new FormData();
      data.append('bin-file', file.originFileObj);

      const { version } = values;
      data.append('version', version);

      const { status } = await axios
        .post(API_UPLOAD_FILE_URL, data, {
          headers: {
            'Content-Type': 'multipart/form-data/application/json',
          },
        })
        .then((res) => res.data)
        .catch((err) => message.error(`File upload failed.`));
      if (status === 'done') message.success(`File uploaded successfully.`);
    } catch (err) {
      message.error('Submit fail!');
    }
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{ version: defaultVersion }}
    >
      <Form.Item label="Version:" name="version" required>
        <InputNumber
          style={{
            width: 200,
          }}
          step="0.1"
          // onChange={onChange}
          // stringMode
          required
        />
      </Form.Item>

      <Form.Item label="Dragger" required>
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
          required
        >
          <Upload.Dragger name="files" action="/upload.do" maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
