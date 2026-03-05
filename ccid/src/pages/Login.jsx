import { useState } from "react";
import { Form, Input, Button, Card, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../service/auth";
import "../styles/Login.css";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await login(values.username, values.password);
      console.log("Login response:", response);

      if (response.success) {
        message.success("Đăng nhập thành công!");

        const user = response.data.user;

        // Redirect theo role
        if (user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        message.error(response.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error.response?.data?.message ||
          "Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div style={{ textAlign: "center" }}>
          <h2>Đăng nhập</h2>
          <p style={{ color: "#666" }}>
            Hệ thống quản lý hợp pháp hóa lãnh sự
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập tên đăng nhập"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" initialValue>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;