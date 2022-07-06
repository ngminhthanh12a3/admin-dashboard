import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import numeral from 'numeral';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Descriptions, Form, message, Modal, Typography } from 'antd';
import React, { forwardRef, useRef, useState } from 'react';
import { API_UPLOAD_FILE_URL } from '@/constants';
import axios from 'axios';
import generateCode from './generateCode';

const { Paragraph, Title } = Typography;
export default () => {
  const SettingParametersFormRef = useRef();
  const [DeviceType, setDeviceType] = useState('ESP32');
  const [FileType, setFileType] = useState('Local');

  const { OTA_GET_FIELD } = useModel('OTA_Fields');
  const OTA_FIELD = OTA_GET_FIELD({
    OTA_FILETYPE: FileType,
    OTA_DEVICE_TYPE: DeviceType,
  });

  const { OTA_CURRENT_VERSION } = OTA_FIELD;

  // const defaultVersion = numeral(OTA_CURRENT_VERSION + 0.1).format('0.0');
  const [visible, setVisible] = useState(false);

  const BrokerTopic = `firmware_version/${DeviceType}_${FileType}`,
    DeviceTypeQuery = `&devicetype=${DeviceType}`,
    FileTypeQuery = `&filetype=${FileType}`;
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        Add file
      </Button>
      <StepsForm
        onFinish={async (values) => {
          // console.log(values);
          // await waitTime(1000);
          // message.success('Submitted successfully');
          try {
            const file = values.dragger[0];
            const data = new FormData();

            const { version, filetype, commit_message, devicetype } = values;
            data.append('filetype', filetype);
            data.append('commit_message', commit_message || '');
            data.append('version', version);
            data.append('upload_time', Date.now());
            data.append('devicetype', devicetype);
            // data.append('brokertopic', BrokerTopic)
            data.append('bin-file', file.originFileObj);

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
          } finally {
            setVisible(false);
            return Promise.resolve(true);
          }
        }}
        formProps={{
          validateMessages: {
            required: 'This is required',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="Add file"
              width={800}
              onCancel={() => {
                setVisible(false);
              }}
              visible={visible}
              footer={submitter}
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="Choose file type"
          onFinish={async () => {
            // await waitTime(2000);
            return true;
          }}
        >
          <ProForm.Group>
            <ProFormSelect
              label="Device type"
              name="devicetype"
              rules={[
                {
                  required: true,
                },
              ]}
              fieldProps={{
                onChange: (value) => {
                  setDeviceType(value);
                },
              }}
              width="md"
              initialValue="ESP32"
              options={[
                { value: 'ESP32', label: 'ESP32' },
                { value: 'STM32', label: 'STM32' },
              ]}
            />
            <ProFormSelect
              label="File type"
              name="filetype"
              rules={[
                {
                  required: true,
                },
              ]}
              fieldProps={{
                onChange: (value) => {
                  setFileType(value);
                },
              }}
              width="md"
              initialValue="Local"
              options={[
                { value: 'Local', label: 'Local' },
                { value: 'Global', label: 'Global' },
              ]}
            />
          </ProForm.Group>
          {/* <ProFormGroup>
            <ProFormText
              name="topic"
              width="md"
              label="Broker Topic"
              fieldProps={{ value: BrokerTopic, }}
            />
          </ProFormGroup> */}
          <Descriptions
            layout="vertical"
            bordered
            // column={{
            //   xxl: 4,
            //   xl: 3,
            //   lg: 3,
            //   md: 3,
            //   sm: 2,
            //   xs: 1,
            // }}
          >
            <Descriptions.Item label="Broker Topic">
              <Title copyable={{ text: BrokerTopic }} level={4} code>
                {BrokerTopic}
              </Title>
            </Descriptions.Item>
            <Descriptions.Item label="Query">
              <Title copyable={{ text: DeviceTypeQuery }} level={4} code>
                {DeviceTypeQuery}
              </Title>
              <Title copyable={{ text: FileTypeQuery }} level={4} code>
                {FileTypeQuery}
              </Title>
            </Descriptions.Item>
            {/* <Descriptions.Item label="Code" span={3}>
              <Paragraph
                copyable={{ text: generateCode({ DeviceTypeQuery, FileTypeQuery }) }}
                // level={4}
                // code
              >
                {generateCode({ DeviceTypeQuery, FileTypeQuery })}
              </Paragraph>
            </Descriptions.Item> */}
          </Descriptions>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox"
          title="Setting parameters"
          formRef={SettingParametersFormRef}
        >
          <ProFormDigit
            label={`${DeviceType}-${FileType} Current Version`}
            width="sm"
            fieldProps={{ value: numeral(OTA_CURRENT_VERSION).format('0.0') }}
            disabled
          />
          <ProFormDigit
            label="Version"
            name="version"
            width="sm"
            // initialValue={defaultVersion || 2.1}
            fieldProps={{ step: 0.1 }}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormUploadDragger
            name="dragger"
            label="Upload file"
            title="Click or drag file to this area to upload"
            description="Support for a single or bulk upload"
            max={1}
            rules={[
              {
                required: true,
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="commit" title="Commit">
          <ProFormTextArea
            name="commit_message"
            label="Commit message"
            width="lg"
            placeholder="Please enter a note"
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
