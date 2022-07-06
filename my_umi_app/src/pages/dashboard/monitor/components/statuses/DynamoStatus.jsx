import { Badge, Card, Col, Typography } from 'antd';
const { Text } = Typography;
export default ({ text, status, xl, lg, sm, xs }) => {
  const type = status.includes('DEACTIVE');
  const badgeStatus = type ? 'error' : 'success';
  const textType = type ? 'danger' : 'success';
  return (
    <Col xl={xl} lg={lg} sm={sm} xs={xs} style={{ marginBottom: 24 }}>
      <Card title={<Badge status={badgeStatus} text={text} />}>
        <Text type={textType}>{status}</Text>
      </Card>
    </Col>
  );
};
