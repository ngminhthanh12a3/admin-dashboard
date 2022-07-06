import { EllipsisOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { FooterToolbar, PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Input, message, Popconfirm, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import { FileAddForm, FileAddStepForm, SendCustomBrokerResuest } from './components';
import { API_Inits, requestToAPI } from '@/handlers';
import { API_DELETE_OTA_FILES_URL } from '@/constants';
import moment from 'moment';

const TagColorType = {
  ESP32: 'processing',
  STM32: 'success',
};
const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'File name',
    dataIndex: 'file_name',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: 'Version',
    dataIndex: 'version',
    sorter: (a, b) => {
      return b.version - a.version;
    },
  },
  {
    title: 'Upload time',
    dataIndex: 'ctimeMs',
    // valueType: 'dateTime',
    sorter: (a, b) => {
      return a.ctimeMs - b.ctimeMs;
    },
    render: (_, record) => {
      const dateTime = moment(record.ctimeMs).format('YYYY-MM-DD HH:mm:ss');
      const dateTimeFromNow = moment(record.ctimeMs).fromNow();
      return (
        <Tooltip title={dateTime}>
          <span>{dateTimeFromNow}</span>
        </Tooltip>
      );
    },
    hideInSearch: true,
  },
  {
    title: 'Upload time',
    dataIndex: 'ctimeMs',
    valueType: 'dateTimeRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: 'Devices type',
    dataIndex: 'devicetype',
    filters: true,
    onFilter: true,
    hideInSearch: true,
    valueEnum: {
      // all: { text: 'All', status: 'Default' },
      ESP32: {
        text: 'ESP32',
        // status: 'Default',
      },
      STM32: {
        text: 'STM32',
        // status: 'Processing',
      },
    },
    render: (_, record) => {
      const { devicetype } = record;
      return (
        <Space>
          <Tag color={TagColorType[devicetype]} key={record.file_name}>
            {devicetype}
          </Tag>
        </Space>
      );
    },
  },
  {
    title: 'File type',
    dataIndex: 'filetype',
    filters: true,
    onFilter: true,
    hideInSearch: true,
    valueEnum: {
      Local: {
        text: 'Local',
        status: 'Default',
      },
      Global: {
        text: 'Global',
        status: 'Processing',
      },
    },
  },
  {
    title: 'Commit message',
    dataIndex: 'commit_message',
    ellipsis: true,
    search: false,
  },

  //   {
  //     title: 'Operate',
  //     valueType: 'option',
  //     key: 'option',
  //     render: (text, record, _, action) => [
  //       <a
  //         key="editable"
  //         onClick={() => {
  //           var _a;
  //           (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null ||
  //           _a === void 0
  //             ? void 0
  //             : _a.call(action, record.id);
  //         }}
  //       >
  //         Edit
  //       </a>,
  //       <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
  //         Check
  //       </a>,
  //       <TableDropdown
  //         key="actionGroup"
  //         onSelect={() => (action === null || action === void 0 ? void 0 : action.reload())}
  //         menus={[
  //           { key: 'copy', name: 'Copy' },
  //           { key: 'delete', name: 'Delete' },
  //         ]}
  //       />,
  //     ],
  //   },
];

export default () => {
  // const actionRef = useRef();
  // const fileListData = []
  const { filterFileListOBJ, handleProTableRequest, tableActionRef } = useModel('OTA_Filelist');

  const [selectedRowsState, setSelectedRows] = useState([]);

  const onDeleteFiles = async () => {
    const { msg, type } = await requestToAPI(
      API_DELETE_OTA_FILES_URL,
      API_Inits({
        body: [...selectedRowsState],
      }),
    );
    const messageType = message[type];
    messageType(msg);
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={tableActionRef}
        cardBordered
        request={handleProTableRequest}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          // onChange(value) {
          //   console.log('value: ', value);
          // },
        }}
        rowKey="file_name"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return Object.assign(Object.assign({}, values), {
                ctimeMs: [values.startTime, values.endTime],
              });
            }
            return values;
          },
        }}
        pagination={{
          // pageSize: 5,
          onChange: (page) => console.log(page),
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="Files List"
        toolBarRender={() => [<SendCustomBrokerResuest />, <FileAddStepForm />]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            const filesName = selectedRows.map((row) => row['file_name']);
            setSelectedRows(filesName);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Chosen{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              file &nbsp;&nbsp;
            </div>
          }
        >
          <Button onClick={onDeleteFiles} type="primary">
            Delete
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};
