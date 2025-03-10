import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, notification, Spin } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Register.css';

const { Title, Text } = Typography;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        // Animation cho các phần tử khi trang được load
        const timeout = setTimeout(() => {
            document.querySelector('.register-form-container').classList.add('visible');
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const onFinish = (values) => {
        setLoading(true);

        // Giả lập API call
        setTimeout(() => {
            setLoading(false);

            notification.success({
                message: 'Đăng ký thành công',
                description: 'Vui lòng kiểm tra email của bạn để xác thực tài khoản.',
                placement: 'topRight',
                duration: 3
            });

            // Chuyển hướng người dùng đến trang xác thực email
            navigate('/verify-email');
        }, 1500);
    };

    const onFinishFailed = (errorInfo) => {
        notification.error({
            message: 'Đăng ký thất bại',
            description: 'Vui lòng kiểm tra lại thông tin đăng ký của bạn.',
            placement: 'topRight'
        });
    };

    return (
        <div className="register-page">
            <div className="register-background">
                <div className="register-overlay"></div>
            </div>

            <motion.div
                className="register-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="register-content">
                    <div className="register-left">
                        <div className="register-branding">
                            <motion.div
                                className="register-logo"
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
                                <Title level={2} className="register-title">Cho Tot Travel</Title>
                                <Text className="register-subtitle">Tham gia cùng chúng tôi</Text>
                            </motion.div>

                            <motion.div
                                className="register-features"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="feature-item">
                                    <div className="feature-icon">✓</div>
                                    <div className="feature-text">Đăng ký miễn phí</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">✓</div>
                                    <div className="feature-text">Quản lý homestay dễ dàng</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">✓</div>
                                    <div className="feature-text">Tiếp cận khách hàng nhanh chóng</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="register-right">
                        <div className="register-form-container">
                            <Title level={3} className="form-title">Đăng ký tài khoản</Title>
                            <Text type="secondary" className="form-subtitle">
                                Vui lòng điền đầy đủ thông tin để tạo tài khoản
                            </Text>

                            <Form
                                form={form}
                                name="register"
                                className="register-form"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                            >
                                <Form.Item
                                    name="fullName"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                    label="Họ và tên"
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Nhập họ và tên của bạn"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
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
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                                    ]}
                                    label="Số điện thoại"
                                >
                                    <Input
                                        prefix={<PhoneOutlined />}
                                        placeholder="Nhập số điện thoại của bạn"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                                        {
                                            validator: (_, value) => {
                                                if (value && value.includes(' ')) {
                                                    return Promise.reject('Mật khẩu không được chứa dấu cách!');
                                                }
                                                return Promise.resolve();
                                            }
                                        }
                                    ]}
                                    label="Mật khẩu"
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Nhập mật khẩu"
                                        size="large"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                        {
                                            validator: (_, value) => {
                                                if (value && value.includes(' ')) {
                                                    return Promise.reject('Mật khẩu xác nhận không được chứa dấu cách!');
                                                }
                                                return Promise.resolve();
                                            }
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Mật khẩu xác nhận không khớp!');
                                            },
                                        }),
                                    ]}
                                    label="Xác nhận mật khẩu"
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Xác nhận mật khẩu"
                                        size="large"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="register-form-button"
                                        block
                                        size="large"
                                        icon={<UserAddOutlined />}
                                        loading={loading}
                                    >
                                        Đăng ký
                                    </Button>
                                </Form.Item>

                                <div className="login-link">
                                    <Text type="secondary">Đã có tài khoản? </Text>
                                    <Link to="/login">Đăng nhập ngay</Link>
                                </div>
                            </Form>

                            {loading && (
                                <div className="register-loading-overlay">
                                    <Spin tip="Đang xử lý..." size="large" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
