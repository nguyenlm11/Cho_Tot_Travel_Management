import React, { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Dropdown, Space, Button, Typography } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ userRole }) => {
    const [notifications] = useState([
        {
            id: 1,
            title: 'Đơn đặt phòng mới',
            description: 'Có một đơn đặt phòng mới cần xác nhận',
            time: '5 phút trước',
            unread: true,
        },
        {
            id: 2,
            title: 'Đánh giá mới',
            description: 'Khách hàng vừa đánh giá dịch vụ của bạn',
            time: '1 giờ trước',
            unread: true,
        },
    ]);

    const notificationMenu = (
        <Menu className="notification-menu">
            <Menu.ItemGroup title="Thông báo" className="notification-header">
                <Button type="link" size="small">Đánh dấu đã đọc tất cả</Button>
            </Menu.ItemGroup>
            {notifications.map((notification) => (
                <Menu.Item key={notification.id} className="notification-item">
                    <div className={`notification ${notification.unread ? 'unread' : ''}`}>
                        <Text strong>{notification.title}</Text>
                        <Text type="secondary" className="notification-description">
                            {notification.description}
                        </Text>
                        <Text type="secondary" className="notification-time">
                            {notification.time}
                        </Text>
                    </div>
                </Menu.Item>
            ))}
            <Menu.Item className="notification-footer">
                <Button type="link" block>Xem tất cả</Button>
            </Menu.Item>
        </Menu>
    );

    const userMenu = (
        <Menu className="user-menu">
            <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => {}}>
                Thông tin cá nhân
            </Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />} onClick={() => {}}>
                Cài đặt
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={() => {}}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <AntHeader className="site-header">
            <div className="header-content">
                <div className="header-left">
                    <div className="logo-container">
                        <img src="/logo.svg" alt="Logo" className="logo" />
                        <Typography.Title level={4} className="site-title">Cho Tốt Travel</Typography.Title>
                    </div>
                </div>
                
                <div className="header-right">
                    <Space size={16}>
                        <Dropdown
                            overlay={notificationMenu}
                            trigger={['click']}
                            placement="bottomRight"
                            arrow
                        >
                            <Badge count={unreadCount} size="small">
                                <Button
                                    type="text"
                                    icon={<BellOutlined style={{ fontSize: '20px' }} />}
                                    className="notification-button"
                                />
                            </Badge>
                        </Dropdown>
                        
                        <Dropdown
                            overlay={userMenu}
                            trigger={['click']}
                            placement="bottomRight"
                            arrow
                        >
                            <div className="user-profile">
                                <Avatar size={36} icon={<UserOutlined />} className="user-avatar" />
                                <div className="user-info">
                                    <Text strong>Nguyễn Văn A</Text>
                                    <Text type="secondary" className="user-role">{userRole === 'admin' ? 'Quản trị viên' : 'Chủ nhà'}</Text>
                                </div>
                            </div>
                        </Dropdown>
                    </Space>
                </div>
            </div>
        </AntHeader>
    );
};

export default Header;