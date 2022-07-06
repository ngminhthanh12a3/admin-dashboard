import { EditableProTable, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import { Table } from 'antd';
import React, { useState } from 'react';
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const defaultData = [
  {
    id: 624748504,
    title: 'Event name one',
    readonly: 'Event name one',
    decs: 'This activity is so fun',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: 'Event name two',
    readonly: 'Event name two',
    decs: 'This activity is so fun',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [position, setPosition] = useState('bottom');
  const columns = [
    {
      title: 'Event name',
      dataIndex: 'title',
      tooltip: 'Read-only, no value can be obtained using form.getFieldValue',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: 'This is required' }] : [],
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '15%',
    },
    {
      title: 'Event name two',
      dataIndex: 'readonly',
      tooltip: 'Read-only, use form.getFieldValue to get the value',
      readonly: true,
      width: '15%',
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: 'All', status: 'Default' },
        open: {
          text: 'Unsolved',
          status: 'Error',
        },
        closed: {
          text: 'Solved',
          status: 'Success',
        },
      },
    },
    {
      title: 'Describe',
      dataIndex: 'decs',
      fieldProps: (from, { rowKey, rowIndex }) => {
        if (from.getFieldValue([rowKey || '', 'title']) === 'Not fun') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: 'Activity time',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: 'Operate',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            var _a;
            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null ||
            _a === void 0
              ? void 0
              : _a.call(action, record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];
  return (
    <>
      <EditableProTable
        rowKey="id"
        headerTitle="Editable form"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position,
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                lang: 'en',
                creatorButtonText: 'Add row',
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: 'Add to top',
                value: 'top',
              },
              {
                label: 'Add to bottom',
                value: 'bottom',
              },
              {
                label: 'Hide',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="Tabular data" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
