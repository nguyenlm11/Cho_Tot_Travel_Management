import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Button, Switch, Upload, Typography } from 'antd';
import { UserOutlined, UploadOutlined, SettingFilled, MailFilled, LockFilled } from '@ant-design/icons';
import './Setting.css';

const { Sider, Content } = Layout;
const { Title } = Typography;

const Setting = () => {
    const [selectedKey, setSelectedKey] = useState('general');

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case 'general':
                return (
                    <Form
                        layout="vertical"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        initialValues={{
                            hotelName: 'Deshika HMS',
                            hotelAddress: '323 Hinde Real Road, Cambridge, Massachusetts',
                            copyright: '© 2024. DataViz. All Rights Reserved.',
                            mainSite: 'www.shribo.com',
                            facebook: 'www.facebook.com',
                            instagram: 'www.instagram.com',
                            maintenanceMode: false,
                        }}
                    >
                        <Form.Item label="Hotel Name" name="hotelName">
                            <Input placeholder="Enter your Hotel Name" />
                        </Form.Item>

                        <Form.Item label="Hotel Logo" name="hotelLogo">
                            <Upload>
                                <Button icon={<UploadOutlined />}>Choose file</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Hotel Address" name="hotelAddress">
                            <Input placeholder="Enter your Hotel Address" />
                        </Form.Item>

                        <Form.Item label="Copyright" name="copyright">
                            <Input placeholder="Enter copyright info" />
                        </Form.Item>

                        <Form.Item label="Main Site" name="mainSite">
                            <Input placeholder="Enter main site URL" />
                        </Form.Item>

                        <Form.Item label="Facebook" name="facebook">
                            <Input placeholder="Enter Facebook URL" />
                        </Form.Item>

                        <Form.Item label="Instagram" name="instagram">
                            <Input placeholder="Enter Instagram URL" />
                        </Form.Item>

                        <Form.Item label="Maintenance Mode" name="maintenanceMode" valuePropName="checked">
                            <Switch />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                );

            case 'email':
                return (
                    <div>
                        <h3>Email Settings</h3>
                        <p>Ví dụ: Form cấu hình email server, SMTP, v.v.</p>
                    </div>
                );

            case 'security':
                return (
                    <div>
                        <h3>Security Settings</h3>
                        <p>Ví dụ: Cài đặt mật khẩu, xác thực 2 bước, v.v.</p>
                    </div>
                );

            case 'account':
                return (
                    <div>
                        <h3>Account Activity</h3>
                        <p>Ví dụ: Nhật ký hoạt động tài khoản, login history, v.v.</p>
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
