import React, { useState } from 'react';
import { Table, Card, Space, Input, Typography, Button, Dropdown, Avatar, Tag } from 'antd';
import { SearchOutlined, EllipsisOutlined, EyeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';
import '../../../styles/CommonTag.css';

const { Search } = Input;
const { Title, Text } = Typography;

const CustomerList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const data = [
        {
            key: '1',
            customerId: 'KH001',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '0901234567',
            lastCheckout: '2024-03-15',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
            lastRoom: '101 - Deluxe Room',
            gender: 'male'
        },
        {
            key: '2',
            customerId: 'KH002',
            name: 'Trần Thị B',
            email: 'tranthib@gmail.com',
            phone: '0912345678',
            lastCheckout: '2024-03-10',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
            lastRoom: '202 - Suite Room',
            gender: 'female'
        },
        {
            key: '3',
            customerId: 'KH003',
            name: 'Lê Văn C',
            email: 'levanc@gmail.com',
            phone: '0923456789',
            lastCheckout: '2024-03-05',
            avatar: null,
            lastRoom: '303 - Standard Room',
            gender: 'male'
        },
        {
            key: '4',
            customerId: 'KH004',
            name: 'Đặng Văn D',
            email: 'dangvand@gmail.com',
            phone: '0934567890',
            lastCheckout: '2024-03-02',
            avatar: null,
            lastRoom: '404 - Deluxe Room',
            gender: 'male'
        },
        {
            key: '5',
            customerId: 'KH005',
            name: 'Nguyễn Thị E',
            email: 'nguyenthi@gmail.com',
            phone: '0945678901',
            lastCheckout: '2024-02-28',
            avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
            lastRoom: '505 - Premium Room',
            gender: 'female'
        },
    ];

    const columns = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 100,
            render: (avatar) => (
                <Avatar
                    size={40}
                    src={avatar}
                    icon={!avatar && <UserOutlined />}
                />
            ),
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            render: (gender) => (
                <Tag className={`gender-tag ${gender}`}>
                    {gender === 'male' ? 'Nam' : 'Nữ'}
                </Tag>
            ),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'Phòng đã đặt',
            dataIndex: 'lastRoom',
            key: 'lastRoom',
            width: 200,
        },
        {
            title: 'Lần cuối checkout',
            dataIndex: 'lastCheckout',
            key: 'lastCheckout',
            width: 150,
            render: (date) => (
                <Text>{new Date(date).toLocaleDateString('vi-VN')}</Text>
            ),
        },
        {
            key: 'action',
            width: 80,
            align: 'center',
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        icon: <EyeOutlined />,
                        label: 'Chi tiết',
                        onClick: () => navigate(`/homestay/customers/${record.customerId}`),
                    },
                    {
                        key: '2',
                        icon: <MessageOutlined />,
                        label: 'Nhắn tin',
                        onClick: () => handleMessage(record),
                    },
                ];

                return (
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button
                            type="text"
                            icon={<EllipsisOutlined />}
                            className="action-button"
                            size='large'
                        />
                    </Dropdown>
                );
            },
        },
    ];

    const handleMessage = (customer) => {
        // Handle message logic
        console.log('Message to:', customer.name);
    };

    return (
        <div className="customer-list-container">
            <Card className="customer-card">
                <div className="card-header">
                    <Title level={2}>Danh sách khách hàng</Title>
                </div>

                <div className="search-section">
                    <Search
                        placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        className="search-input"
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{
                        total: data.length,
                        pageSize: 10,
                        showTotal: (total) => `Tổng số ${total} khách hàng`,
                        className: "customer-pagination"
                    }}
                    className="customer-table"
                />
            </Card>
        </div>
    );
};

export default CustomerList; 