import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message, Table } from 'antd';
import { useState } from 'react';
import ProForm, {
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';
import MyTableForm from './components/MyTableForm';
const fieldLabels = {
  name: 'Warehouse name',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};
const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

const AdvancedForm = () => {
  const [error, setError] = useState([]);

  const getErrorInfo = (errors) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;

    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = (fieldKey) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);

      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }

      const key = err.name[0];
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="Form validation information"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode;
            }

            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values) => {
    setError([]);

    try {
      await fakeSubmitForm(values);
      message.success('提交成功');
    } catch {
      // console.log
    }
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.errorFields);
  };

  const columns = [
    {
      title: 'Member name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Job number',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
    },
    {
      title: 'Operate',
      key: 'action',
      valueType: 'option',
      render: (aa, record, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              console.log(aa, record, index, action, action?.startEditable(record.key));
              // action?.startEditable(record.key);
            }}
          >
            Edit
          </a>,
        ];
      },
    },
  ];
  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{
        members: tableData,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="Advanced forms are commonly used in scenarios where large batches of data are entered and submitted at one time.">
        {/* <Card title="仓库管理" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name}
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入仓库名称',
                  },
                ]}
                placeholder="请输入仓库名称"
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormText
                label={fieldLabels.url}
                name="url"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                  addonBefore: 'http://',
                  addonAfter: '.com',
                }}
                placeholder="请输入"
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.owner}
                name="owner"
                rules={[
                  {
                    required: true,
                    message: '请选择管理员',
                  },
                ]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
                placeholder="请选择管理员"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver}
                name="approver"
                rules={[
                  {
                    required: true,
                    message: '请选择审批员',
                  },
                ]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
                placeholder="请选择审批员"
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormDateRangePicker
                label={fieldLabels.dateRange}
                name="dateRange"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: '请选择生效日期',
                  },
                ]}
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.type}
                name="type"
                rules={[
                  {
                    required: true,
                    message: '请选择仓库类型',
                  },
                ]}
                options={[
                  {
                    label: '私密',
                    value: 'private',
                  },
                  {
                    label: '公开',
                    value: 'public',
                  },
                ]}
                placeholder="请选择仓库类型"
              />
            </Col>
          </Row>
        </Card>
        <Card title="任务管理" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name2}
                name="name2"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormText
                label={fieldLabels.url2}
                name="url2"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.owner2}
                name="owner2"
                rules={[
                  {
                    required: true,
                    message: '请选择管理员',
                  },
                ]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver2}
                name="approver2"
                rules={[
                  {
                    required: true,
                    message: '请选择审批员',
                  },
                ]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
                placeholder="请选择审批员"
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormTimePicker
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                placeholder="提醒时间"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.type2}
                name="type2"
                rules={[
                  {
                    required: true,
                    message: '请选择仓库类型',
                  },
                ]}
                options={[
                  {
                    label: '私密',
                    value: 'private',
                  },
                  {
                    label: '公开',
                    value: 'public',
                  },
                ]}
                placeholder="请选择仓库类型"
              />
            </Col>
          </Row>
        </Card> */}
        <Card title="Member management" bordered={false}>
          <ProForm.Item name="members">
            <EditableProTable
              rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
                lang: 'en',
                creatorButtonText: 'Add row',
              }}
              columns={columns}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
        <Card title="Member management 2" bordered={false}>
          <ProForm.Item name="members">
            <MyTableForm />
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
