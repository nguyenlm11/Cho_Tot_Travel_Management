import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Tooltip, Typography, Badge, Dropdown, Tag } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, SearchOutlined, StarFilled, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './HomestayList.css';
import '../../../styles/CommonTag.css';

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
        {
            key: '4',
            homestayId: 'HS003',
            name: 'City Center Apartment',
            address: '789 Nguyen Hue, Ho Chi Minh City',
            status: 'inactive',
            rooms: 2,
            rating: 4.2,
        },
        {
            key: '5',
            homestayId: 'HS003',
            name: 'City Center Apartment',
            address: '789 Nguyen Hue, Ho Chi Minh City',
            status: 'inactive',
            rooms: 2,
            rating: 4.2,
        },
        {
            key: '6',
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
            title: 'Mã Homestay',
            dataIndex: 'homestayId',
            key: 'homestayId',
            width: 80,
            render: (text) => <Text type="secondary">#{text}</Text>,
        },
        {
            title: 'Tên Homestay',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Số phòng',
            dataIndex: 'rooms',
            key: 'rooms',
            width: 70,
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => {
                const config = {
                    active: { text: 'Đang hoạt động', class: 'active' },
                    inactive: { text: 'Tạm ngưng', class: 'inactive' }
                };
                return (
                    <Tag className={`status-tag ${config[status].class}`}>
                        {config[status].text}
                    </Tag>
                );
            },
        },
        {
            width: 30,
            align: 'center',
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
                        pageSize: 10,
                        showTotal: (total) => `Tổng số ${total} homestay`,
                        className: "homestay-pagination"
                    }}
                    className="homestay-table"
                />
            </Card>
        </div>
    );
};

export default HomestayList; 