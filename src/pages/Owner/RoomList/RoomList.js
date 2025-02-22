import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Tooltip, Typography, Badge, Tag, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, SearchOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './RoomList.css';
import '../../../styles/CommonTag.css';

const { Search } = Input;
const { Title, Text } = Typography;

const RoomList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const data = [
        {
            key: '1',
            roomId: 'R001',
            roomNumber: '101',
            roomType: 'Deluxe',
            bedCount: 2,
            price: 800000,
            status: 'available'
        },
        {
            key: '2',
            roomId: 'R002',
            roomNumber: '102',
            roomType: 'Single',
            bedCount: 1,
            price: 500000,
            status: 'occupied'
        },
        {
            key: '3',
            roomId: 'R003',
            roomNumber: '201',
            roomType: 'Suite',
            bedCount: 3,
            price: 1200000,
            status: 'maintenance'
        }
    ];

    const columns = [
        {
            title: 'Mã phòng',
            dataIndex: 'roomId',
            key: 'roomId',
            width: 120,
            render: (text) => <Text type="secondary">#{text}</Text>,
        },
        {
            title: 'Tên phòng',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
            width: 120,
            render: (text) => <Text strong>Phòng {text}</Text>,
        },
        {
            title: 'Loại phòng',
            dataIndex: 'roomType',
            key: 'roomType',
            width: 150,
            render: (type) => (
                <Tag color="#30B53E">{type}</Tag>
            ),
        },
        {
            title: 'Số giường',
            dataIndex: 'bedCount',
            key: 'bedCount',
            width: 120,
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Giá phòng',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (price) => (
                <Text strong style={{ color: '#52c41a' }}>
                    {new Intl.NumberFormat('vi-VN').format(price)} đ
                </Text>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => {
                const config = {
                    available: { text: 'Trống', class: 'active' },
                    occupied: { text: 'Đang thuê', class: 'pending' },
                    maintenance: { text: 'Bảo trì', class: 'inactive' }
                };
                return (
                    <Tag className={`status-tag ${config[status].class}`}>
                        {config[status].text}
                    </Tag>
                );
            },
        },
        {
            key: 'action',
            align: 'center',
            width: 80,
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        icon: <EyeOutlined />,
                        label: 'Chi tiết',
                        onClick: () => navigate(`/homestay/room/${record.roomId}`),
                    },
                    {
                        key: '2',
                        icon: <EditOutlined />,
                        label: 'Chỉnh sửa',
                        onClick: () => navigate(`/homestay/room/${record.roomId}/edit`),
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
        <div className="room-list-container">
            <Card className="room-card">
                <div className="card-header">
                    <Title level={2}>Danh sách phòng</Title>
                </div>

                <div className="search-section">
                    <Search
                        placeholder="Tìm kiếm theo số phòng hoặc loại phòng..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        className="search-input"
                    />

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => navigate('/homestay/room/new')}
                        className="add-button"
                    >
                        Thêm phòng
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{
                        total: data.length,
                        pageSize: 10,
                        showTotal: (total) => `Tổng số ${total} phòng`,
                        className: "room-pagination"
                    }}
                    className="room-table"
                />
            </Card>
        </div>
    );
};

export default RoomList; 