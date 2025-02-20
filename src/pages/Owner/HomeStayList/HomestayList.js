import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Tooltip, Typography, Badge, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, SearchOutlined, StarFilled, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './HomestayList.css';

const { Search } = Input;
const { Title, Text } = Typography;

const HomestayList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const data = [
        {
            key: '1',
            homestayId: 'HS001',
            name: 'Sunset Beach Villa',
            address: '123 Beach Road, Vũng Tàu',
            status: 'active',
            rooms: 5,
            rating: 4.5,
        },
        {
            key: '2',
            homestayId: 'HS002',
            name: 'Mountain View Homestay',
            address: '456 Highland St, Đà Lạt',
            status: 'active',
            rooms: 3,
            rating: 4.8,
        },
        {
            key: '3',
            homestayId: 'HS003',
            name: 'City Center Apartment',
            address: '789 Nguyen Hue, Ho Chi Minh City',
            status: 'inactive',
            rooms: 2,
            rating: 4.2,
        },
    ];

    const columns = [
        {
            title: 'Tên Homestay',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong className="homestay-name">{text}</Text>
                    <Text type="secondary" className="homestay-id">#{record.homestayId}</Text>
                </Space>
            ),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 300,
        },
        {
            title: 'Thông tin',
            key: 'info',
            width: 200,
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <div className="info-item">
                        <span>Số phòng:</span>
                        <Badge count={record.rooms} className="room-badge" />
                    </div>
                    <div className="info-item">
                        <span>Đánh giá:</span>
                        <span className="rating">
                            <StarFilled className="star-icon" />
                            {record.rating}
                        </span>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => (
                <Badge
                    status={status === 'active' ? 'success' : 'error'}
                    text={status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
                    className="status-badge"
                />
            ),
        },
        {
            key: 'action',
            width: 30,
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        icon: <EyeOutlined />,
                        label: 'Quản lý',
                        onClick: () => navigate(`/homestay/${record.homestayId}/dashboard`),
                    },
                    {
                        key: '2',
                        icon: <EditOutlined />,
                        label: 'Chỉnh sửa',
                        onClick: () => navigate(`/homestay/${record.homestayId}/edit-homestay`),
                    },
                    {
                        key: '3',
                        icon: <DeleteOutlined />,
                        label: 'Xóa',
                        danger: true,
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

    return (
        <div className="homestay-list-container">
            <Card className="homestay-card">
                <div className="card-header">
                    <Title level={2}>Danh sách Homestay</Title>
                </div>

                <div className="search-section">
                    <Search
                        placeholder="Tìm kiếm theo tên homestay hoặc địa chỉ..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        className="search-input"
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => navigate('/homestay/new')}
                        className="add-button"
                    >
                        Thêm Homestay
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{
                        total: data.length,
                        pageSize: 5,
                        showTotal: (total) => `Tổng số ${total} homestay`,
                        className: "custom-pagination"
                    }}
                    className="homestay-table"
                />
            </Card>
        </div>
    );
};

export default HomestayList; 