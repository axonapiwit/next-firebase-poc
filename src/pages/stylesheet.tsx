import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Dropdown, Flex, Input, MenuProps, Pagination, Row, Space, Typography } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const StyleSheet: React.FC = () => {

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

  return (

    <>
      <Divider orientation="left">Style Sheet</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title>h1. Ant Design</Title>
          <Title level={2}>h2. Ant Design</Title>
          <Title level={3}>h3. Ant Design</Title>
          <Title level={4}>h4. Ant Design</Title>
          <Title level={5}>h5. Ant Design</Title>
        </Col>
        <Col span={12}>
          <Flex gap="small" wrap>
            <Button type="primary">Primary Button</Button>
            <Button>Success Button</Button>
            <Button danger>Danger Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
          </Flex>
        </Col>
        <Col span={12}>
          <Input placeholder="Basic usage" />
        </Col>
        <Col span={12}>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Col>
        <Col span={12}>
          <Space direction="vertical" size={12}>
            <RangePicker />
            <RangePicker showTime />
            <RangePicker picker="week" />
            <RangePicker picker="month" />
            <RangePicker picker="quarter" />
            <RangePicker
              picker="year"
              id={{
                start: 'startInput',
                end: 'endInput',
              }}
              onFocus={(_, info) => {
                console.log('Focus:', info.range);
              }}
              onBlur={(_, info) => {
                console.log('Blur:', info.range);
              }}
            />
          </Space>
        </Col>
        <Col span={12}>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </>
  )

}

export default StyleSheet