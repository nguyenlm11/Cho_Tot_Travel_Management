import React, { useState } from 'react';
import { Table, Card, Input, Typography, Button, Dropdown, Avatar, Tag } from 'antd';
import { SearchOutlined, EllipsisOutlined, EyeFilled, MessageFilled, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';

const { Search } = Input;
const { Title, Text } = Typography;

const CustomerList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const data = [
        {
            key: '1',
            customerId: 'KH001',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '0901234567',
            lastCheckout: '2024-03-15',
            lastRoom: '101 - Deluxe Room',
            gender: 'male',
        },
        {
            key: '2',
            customerId: 'KH002',
            name: 'Trần Thị B',
            email: 'tranthib@gmail.com',
            phone: '0912345678',
            lastCheckout: '2024-03-10',
            lastRoom: '202 - Suite Room',
            gender: 'female',
        },
        {
            key: '3',
            customerId: 'KH003',
            name: 'Lê Văn C',
            email: 'levanc@gmail.com',
            phone: '0923456789',
            lastCheckout: '2024-03-05',
            lastRoom: '303 - Standard Room',
            gender: 'male',
        },
    ];

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.phone.includes(searchText)
    );

    const columns = [
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
                <Tag color={gender === 'male' ? '#30B53E' : '#f5222d'} style={{ padding: '2px 10px' }}>
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
            width: 80,
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
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
                        ],
                    }}
                    trigger={['click']}
                >
                    <Button type="text" icon={<EllipsisOutlined />} />
                </Dropdown>
            ),
        },
    ];

    const handleMessage = (customer) => {
        console.log('Message to:', customer.name);
    };

    return (
        <div className="customer-list-container">
            <Card className="customer-card">
                <Title level={3} style={{ margin: 0 }}>Danh sách khách hàng</Title>
                <div className="toolbar">
                    <Search
                        placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={loading}
                    pagination={{
                        total: filteredData.length,
                        pageSize: 10,
                        showTotal: (total) => `Tổng: ${total} khách hàng`,
                    }}
                    rowClassName="table-row"
                />
            </Card>
        </div>
    );
};

export default CustomerList;