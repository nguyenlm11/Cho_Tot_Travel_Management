import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Button, Switch, Upload, Typography } from 'antd';
import {
    UserOutlined,
    UploadOutlined,
    SettingFilled,
    MailFilled,
    LockFilled
} from '@ant-design/icons';
import './Setting.css';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const Setting = () => {
    const [selectedKey, setSelectedKey] = useState('general');
    const [form] = Form.useForm();

    const handleMenuClick = (e) => setSelectedKey(e.key);

    const handleSubmit = (values) => {
        console.log(`${selectedKey} settings values:`, values);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case 'general':
                return (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label="Tên nhà nghỉ/nhà cho thuê"
                            name="hotelName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                        >
                            <Input placeholder="Nhập tên nhà nghỉ/nhà cho thuê" />
                        </Form.Item>
                        <Form.Item label="Ảnh nhà nghỉ" name="hotelLogo">
                            <Upload beforeUpload={() => false} listType="picture">
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="hotelAddress"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                        <Form.Item label="Trang website chính" name="mainSite">
                            <Input placeholder="Nhập URL trang web chính" />
                        </Form.Item>
                        <Form.Item label="Facebook" name="facebook">
                            <Input placeholder="Nhập URL Facebook" />
                        </Form.Item>
                        <Form.Item label="Instagram" name="instagram">
                            <Input placeholder="Nhập URL Instagram" />
                        </Form.Item>
                        <Form.Item label="Chế độ bảo trì" name="maintenanceMode" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                );
            case 'email':
                return (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label="Email Server"
                            name="emailServer"
                            rules={[{ required: true, message: 'Vui lòng nhập email server!' }]}
                        >
                            <Input placeholder="smtp.example.com" />
                        </Form.Item>
                        <Form.Item
                            label="Tên người dùng"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                        >
                            <Input placeholder="user@example.com" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            label="Mã hóa mật khẩu"
                            name="encryption"
                            rules={[{ required: true, message: 'Vui lòng nhập loại mã hóa!' }]}
                        >
                            <Input placeholder="TLS" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                );
            case 'security':
                return (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu mới" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                );
            case 'account':
                return (
                    <div>
                        <Title level={4}>Hoạt động tài khoản</Title>
                        <Text type="secondary">Hiện chưa có nhật ký hoạt động nào.</Text>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
            <Sider width={250} className="sider-custom">
                <Title level={4} style={{ color: '#30B53E', margin: '16px' }}>Cài đặt</Title>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                >
                    <Menu.Item key="general" icon={<SettingFilled />}>Tổng quan</Menu.Item>
                    <Menu.Item key="email" icon={<MailFilled />}>Email</Menu.Item>
                    <Menu.Item key="security" icon={<LockFilled />}>Bảo mật</Menu.Item>
                    <Menu.Item key="account" icon={<UserOutlined />}>Hoạt động</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content className="content-custom">
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Setting;