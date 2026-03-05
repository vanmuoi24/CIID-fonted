import React from 'react';
import { Form, Input, Button, Card, Row, Col, message } from 'antd';
import AdminLayout from '../layout/AdminLayout';

const Settings = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Settings:', values);
    message.success('Lưu cài đặt thành công');
  };

  return (
    <AdminLayout>
      <div>
        <h1>Cài đặt</h1>
        <Row gutter={24} style={{ marginTop: '24px' }}>
          <Col xs={24} lg={12}>
            <Card title="Cài đặt chung">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="siteName"
                  label="Tên trang web"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên trang web',
                    },
                  ]}
                  initialValue="Hệ thống Quản lý"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email liên hệ"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email' },
                    { type: 'email', message: 'Email không hợp lệ' },
                  ]}
                  initialValue="admin@example.com"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  initialValue="0123456789"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  initialValue="Hà Nội, Việt Nam"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                <Button type="primary" htmlType="submit" size="large">
                  Lưu cài đặt
                </Button>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Cài đặt bảo mật">
              <Form layout="vertical" style={{ marginTop: '20px' }}>
                <Form.Item
                  name="oldPassword"
                  label="Mật khẩu cũ"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu cũ',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="Mật khẩu mới"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu mới',
                    },
                    {
                      min: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng xác nhận mật khẩu',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Button type="primary" size="large">
                  Cập nhật mật khẩu
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Settings;
