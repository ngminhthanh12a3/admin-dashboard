import { PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useState } from 'react';
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        Step by step form new
      </Button>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          setVisible(false);
          message.success('Submitted successfully');
        }}
        formProps={{
          validateMessages: {
            required: 'This is required',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="Step-by-step form"
              width={800}
              onCancel={() => setVisible(false)}
              visible={visible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="Create an experiment"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="Experiment name"
            tooltip="Up to 24 bits, unique id for calibration"
            placeholder="Please enter a name"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="日期" />
          <ProForm.Group title="Time selection">
            <ProFormDateTimePicker name="dateTime" label="Starting time" />
            <ProFormDatePicker name="date" label="End Time" />
          </ProForm.Group>
          <ProFormTextArea
            name="remark"
            label="Remark"
            width="lg"
            placeholder="Please enter a note"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="Setting parameters">
          <ProFormCheckbox.Group
            name="checkbox"
            label="Migration type"
            width="lg"
            options={[
              'Structural Migration',
              'Full migration',
              'Incremental migration',
              'Full check',
            ]}
          />
          <ProForm.Group>
            <ProFormText width="md" name="dbname" label="Business DB Username" />
            <ProFormDatePicker name="datetime" label="Record keeping time" width="sm" />
            <ProFormCheckbox.Group
              name="checkbox"
              label="Migration type"
              options={['Whole LOB', 'Out of sync LOB', 'Restricted LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="Publish an experiment">
          <ProFormCheckbox.Group
            name="checkbox"
            label="Deployment unit"
            rules={[
              {
                required: true,
              },
            ]}
            options={['Deployment Unit 1', 'Deployment Unit 2', 'Deployment Unit 3']}
          />
          <ProFormSelect
            label="Deploy a grouping strategy"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            initialValue="1"
            options={[
              {
                value: '1',
                label: 'Strategy one',
              },
              { value: '2', label: 'Strategy two' },
            ]}
          />
          <ProFormSelect
            label="Pod scheduling strategy"
            name="remark2"
            width="md"
            initialValue="2"
            options={[
              {
                value: '1',
                label: 'Strategy one',
              },
              { value: '2', label: 'Strategy two' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
