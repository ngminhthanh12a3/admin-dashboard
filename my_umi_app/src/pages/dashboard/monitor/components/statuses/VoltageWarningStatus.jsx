import { Badge, Card, Col, Typography } from 'antd';
const { Text } = Typography;
export default ({ text, voltage, xl, lg, sm, xs }) => {
  const textFields = { 'Device OFF': '#595959', Warning: '#faad14', Normal: '#52c41a' };
  const warning_text = voltage < 50 ? 'Device OFF' : voltage >= 180 ? 'Normal' : 'Warning';
  const color = textFields[warning_text];
  return (
    <Col xl={xl} lg={lg} sm={sm} xs={xs} style={{ marginBottom: 24 }}>
      <Card title={<Badge color={color} text={text} />}>
        <Text style={{ color: color }}>{warning_text}</Text>
      </Card>
    </Col>
  );
};
