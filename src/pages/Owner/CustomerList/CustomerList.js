import React, { useState } from 'react';
import { Table, Card, Input, Typography, Button, Dropdown, Avatar, Tag } from 'antd';
import { SearchOutlined, EllipsisOutlined, EyeOutlined, MessageOutlined, UserOutlined, EyeFilled, MessageFilled } from '@ant-design/icons';
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
    ];

    const columns = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            align: 'center',
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
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center',
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
        },
        {
            title: 'Phòng đã đặt',
            dataIndex: 'lastRoom',
            key: 'lastRoom',
        },
        {
            title: 'Lần cuối checkout',
            dataIndex: 'lastCheckout',
            key: 'lastCheckout',
            render: (date) => (
                <Text>{new Date(date).toLocaleDateString('vi-VN')}</Text>
            ),
        },
        {
            key: 'action',
            align: 'center',
            width: 60,
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        icon: <EyeFilled />,
                        label: 'Chi tiết',
                        onClick: () => navigate(`/homestay/customers/${record.customerId}`),
                    },
                    {
                        key: '2',
                        icon: <MessageFilled />,
                        label: 'Nhắn tin',
                        onClick: () => handleMessage(record),
                    },
                ];

                return (
                    <Dropdown
                        menu={{ items }}
                        trigger={['hover']}
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