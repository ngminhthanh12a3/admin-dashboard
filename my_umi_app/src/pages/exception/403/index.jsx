import { Link } from 'umi';
import { Result, Button, Space } from 'antd';
const buttonStyle = { minWidth: '118px' };
export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, you don't have access to this page."
    extra={
      <>
        <Space wrap>
          <Link to="/">
            <Button type="primary" style={buttonStyle}>
              Back to home
            </Button>
          </Link>
          <Link to="/user/login">
            <Button type="primary" style={buttonStyle}>
              Back to login
            </Button>
          </Link>
        </Space>
      </>
    }
  />
);
