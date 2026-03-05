import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import AdminLayout from '../layout/AdminLayout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div>
        <h1>Dashboard</h1>
        <Row gutter={16} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng người dùng"
                value={1234}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đơn hàng"
                value={567}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Doanh thu"
                value={245680000}
                prefix={<DollarOutlined />}
                suffix="₫"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Hoạt động"
                value={89}
                prefix={<TeamOutlined />}
                suffix="%"
                valueStyle={{ color: '#eb2f96' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '24px' }}>
          <Col xs={24} lg={12}>
            <Card title="Thống kê người dùng">
              <p>📊 Biểu đồ thống kê sẽ được thêm vào đây</p>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Hoạt động gần đây">
              <p>📝 Danh sách hoạt động gần đây sẽ được thêm vào đây</p>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
