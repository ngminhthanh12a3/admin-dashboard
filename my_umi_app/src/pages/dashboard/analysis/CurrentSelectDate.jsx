import { Card, Col, Row, Statistic } from 'antd';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
};
export default () => {
  return (
    <Card
      title="Selected Date"
      style={{
        marginBottom: 24,
      }}
    >
      <Row gutter={24}>
        <Col {...topColResponsiveProps}>
          <Statistic title="Hour" value={new Date().getHours()} />
        </Col>
        <Col {...topColResponsiveProps}>
          <Statistic title="Day" value={new Date().getDay()} />
        </Col>
        <Col {...topColResponsiveProps}>
          <Statistic title="Month" value={new Date().getMonth()} />
        </Col>
        <Col {...topColResponsiveProps}>
          <Statistic title="Year" value={new Date().getFullYear() + ' '} />
        </Col>
      </Row>
    </Card>
  );
};
