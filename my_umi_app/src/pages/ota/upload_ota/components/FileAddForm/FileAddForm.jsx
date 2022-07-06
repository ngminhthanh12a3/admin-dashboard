import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React from 'react';
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  return (
    <ModalForm
      title="Add file"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Add file
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Contract customer name"
          tooltip="Up to 24 bits"
          placeholder="Please enter a name"
        />

        <ProFormText
          width="md"
          name="company"
          label="Our company name"
          placeholder="Please enter a name"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="Contract title"
          placeholder="Please enter a name"
        />
        <ProFormDateRangePicker name="contractTime" label="Contract effective time" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          width="xs"
          name="useMode"
          label="How the contract comes into effect"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: 'Termination after performance',
            },
          ]}
          name="unusedMode"
          label="How the contract will expire"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="Main contract number" />
      <ProFormText name="project" disabled label="Project name" initialValue="xxxx item" />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="Business manager"
        initialValue="Start"
      />
    </ModalForm>
  );
};
