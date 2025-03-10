import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Typography, notification, Spin } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation, Links } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin redirect từ location state (nếu có)
  const from = location.state?.from?.pathname || "/homestays";

  useEffect(() => {
    // Animation cho các phần tử khi trang được load
    const timeout = setTimeout(() => {
      document.querySelector('.login-form-container').classList.add('visible');
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const onFinish = (values) => {
    setLoading(true);

    // Giả lập API call
    setTimeout(() => {
      setLoading(false);

      // Giả sử đăng nhập thành công
      localStorage.setItem('userRole', 'owner');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        name: 'Nguyễn Văn A',
        email: values.username,
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=male'
      }));

      notification.success({
        message: 'Đăng nhập thành công',
        description: 'Chào mừng bạn quay trở lại với Cho Tot Travel Management!',
        placement: 'topRight',
        duration: 3
      });

      // Chuyển hướng người dùng
      navigate(from, { replace: true });
    }, 1500);
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Đăng nhập thất bại',
      description: 'Vui lòng kiểm tra lại thông tin đăng nhập của bạn.',
      placement: 'topRight'
    });
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-content">
          <div className="login-left">
            <div className="login-branding">
              <motion.div
                className="login-logo"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <img src="/logo192.png" alt="Logo" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Title level={2} className="login-title">Cho Tot Travel</Title>
                <Text className="login-subtitle">Hệ thống quản lý homestay hiện đại</Text>
              </motion.div>

              <motion.div
                className="login-features"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Quản lý đặt phòng dễ dàng</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Thống kê doanh thu trực quan</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Quản lý đánh giá khách hàng</div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="login-right">
            <div className="login-form-container">
              <Title level={3} className="form-title">Đăng nhập</Title>
              <Text type="secondary" className="form-subtitle">
                Vui lòng đăng nhập để tiếp tục sử dụng hệ thống
              </Text>

              <Form
                form={form}
                name="login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }]}
                  label="Email"
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Nhập email của bạn"
                    size="large"
                    autoComplete="email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                  label="Mật khẩu"
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Nhập mật khẩu"
                    size="large"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    autoComplete="current-password"
                  />
                </Form.Item>

                <Form.Item>
                  <div className="login-options">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>

                    <Link to="/forgot-password" className="login-form-forgot">
                      Quên mật khẩu?
                    </Link>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                    size="large"
                    icon={<LoginOutlined />}
                    loading={loading}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>

                <div className="register-link">
                  <Text type="secondary">Chưa có tài khoản? </Text>
                  <Link to="/register">Đăng ký ngay</Link>
                </div>
              </Form>

              {loading && (
                <div className="login-loading-overlay">
                  <Spin tip="Đang đăng nhập..." size="large" />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 