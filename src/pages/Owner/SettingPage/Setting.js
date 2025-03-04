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
const { Title } = Typography;

const Setting = () => {
    const [selectedKey, setSelectedKey] = useState('general');

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    // Handle form submit cho General Settings
    const handleGeneralSubmit = (values) => {
        console.log('General settings values:', values);
    };

    // Handle form submit cho Email Settings
    const handleEmailSubmit = (values) => {
        console.log('Email settings values:', values);
    };

    // Handle form submit cho Security Settings
    const handleSecuritySubmit = (values) => {
        console.log('Security settings values:', values);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case 'general':
                return (
                    <Form
                        className="custom-form"
                        layout="horizontal"
                        onFinish={handleGeneralSubmit}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ pan: 16, offset: 4 }}
                        style={{ maxWidth: 800 }}
                        initialValues={{ remember: true, }}
                    >
                        <Form.Item label="Tên nhà nghỉ/nhà cho thuê" name="hotelName">
                            <Input placeholder="Nhập tên nhà nghỉ/nhà cho thuê" />
                        </Form.Item>

                        <Form.Item label="Ảnh nhà nghỉ:" name="hotelLogo">
                            <Upload>
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Địa chỉ" name="hotelAddress">
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

                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form>
                );

            case 'email':
                return (
                    <Form
                        className="custom-form"
                        layout="horizontal"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ pan: 16, offset: 4 }}
                        style={{ maxWidth: 800 }}
                        initialValues={{ remember: true, }}
                        onFinish={handleEmailSubmit}
                    >
                        <Form.Item
                            label="Email: "
                            name="emailServer"
                            rules={[{ required: true, message: 'Vui lòng nhập email của nhà nghỉ' }]}
                        >
                            <Input placeholder="smtp.example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Tên người dùng"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
                        >
                            <Input placeholder="user@example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            label="Mã hóa mật khẩu"
                            name="encryption"
                            rules={[{ required: true, message: 'Vui lòng chọn loại mã hóa' }]}
                        >
                            <Input placeholder="TLS" />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form>
                );

            case 'security':
                return (
                    <>
                        {/* <h1>Cài đặt bảo mật</h1> */}
                        <Form
                            className="custom-form"
                            layout="horizontal"
                            onFinish={handleSecuritySubmit}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ pan: 16, offset: 4 }}
                            style={{ maxWidth: 800 }}
                            initialValues={{ remember: true, }}
                        >
                            <Form.Item
                                label="Mật khẩu hiện tại"
                                name="currentPassword"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                            >
                                <Input.Password placeholder="Mật khẩu hiện tại" />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
                            >
                                <Input.Password placeholder="Mật khẩu mới" />
                            </Form.Item>

                            <Form.Item
                                label="Xác nhận mật khẩu:"
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu của bạn' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Hai mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu mới" />
                            </Form.Item>

                            <Button type="primary" htmlType="submit" >
                                Cập nhật
                            </Button>
                        </Form>
                    </>
                );

            case 'account':
                return (
                    <div>
                        <h3>Account Activity</h3>
                        <p>Account activity logs and login history details...</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', padding: 0 }}>
            <Sider width={250} className="sider-custom">
                <Title level={4} className="setting-text">Cài đặt</Title>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={handleMenuClick}
                >
                    <Menu.Item key="general" icon={<SettingFilled />}>
                        Tổng quan
                    </Menu.Item>
                    <Menu.Item key="email" icon={<MailFilled />}>
                        Email
                    </Menu.Item>
                    <Menu.Item key="security" icon={<LockFilled />}>
                        Bảo mật
                    </Menu.Item>
                    <Menu.Item key="account" icon={<UserOutlined />}>
                        Hoạt động
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
                <Content className="content-custom">
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Setting;
