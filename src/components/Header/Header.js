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

    return (
        <AntHeader className="header">
            <Space size="large">
                <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
                    <Badge count={notifications.filter(n => n.unread).length}>
                        <Button
                            type="text"
                            icon={<BellOutlined />}
                            size="large"
                        />
                    </Badge>
                </Dropdown>
                <Dropdown
                    menu={{
                        items: [
                            { key: 'profile', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
                            { key: 'setting', icon: <SettingOutlined />, label: 'Cài đặt' },
                            { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true },
                        ]
                    }}
                    trigger={['click']} placement="bottomRight"
                >
                    <Space className="user-info">
                        <Avatar size="large" icon={<UserOutlined />} />
                        <Text strong className="user-name">
                            {userRole === 'admin' ? 'Admin' : 'Owner'} Name
                        </Text>
                    </Space>
                </Dropdown>
            </Space>
        </AntHeader>
    );
};

export default Header;