import React, { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Dropdown, Space, Button, Input, Divider } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Search } = Input;

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
            <div className="notification-header">
                <span>Thông báo</span>
                <Button type="link">Đánh dấu đã đọc tất cả</Button>
            </div>
            <Divider style={{ margin: '0' }} />
            {notifications.map((notification) => (
                <Menu.Item key={notification.id} className="notification-item">
                    <div className={`notification ${notification.unread ? 'unread' : ''}`}>
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-description">
                            {notification.description}
                        </div>
                        <div className="notification-time">{notification.time}</div>
                    </div>
                </Menu.Item>
            ))}
            <Divider style={{ margin: '0' }} />
            <Menu.Item className="notification-footer">
                <Button type="link" block>
                    Xem tất cả
                </Button>
            </Menu.Item>
        </Menu>
    );

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                Thông tin cá nhân
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                Cài đặt
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <AntHeader className="header">
            <div className="header-right">
                <Space size="large">
                    <Dropdown
                        overlay={notificationMenu}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Badge count={notifications.filter(n => n.unread).length}>
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                className="notification-button"
                            />
                        </Badge>
                    </Dropdown>

                    <Dropdown overlay={userMenu} trigger={['click']}>
                        <Space className="user-info">
                            <Avatar size="large" icon={<UserOutlined />} />
                            <span className="user-name">
                                {userRole === 'admin' ? 'Admin' : 'Owner'} Name
                            </span>
                        </Space>
                    </Dropdown>
                </Space>
            </div>
        </AntHeader>
    );
};

export default Header; 