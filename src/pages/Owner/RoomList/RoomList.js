import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Tooltip, Typography, Badge, Tag, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, SearchOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './RoomList.css';

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
            title: 'Phòng',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
            width: 200,
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong className="room-number">Phòng {text}</Text>
                    <Text type="secondary" className="room-id">#{record.roomId}</Text>
                </Space>
            ),
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
            title: 'Thông tin',
            key: 'info',
            width: 200,
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <div className="info-item">
                        <span>Số giường:</span>
                        <Badge count={record.bedCount} className="bed-badge" />
                    </div>
                    <div className="info-item">
                        <span>Giá:</span>
                        <Text strong className="price">
                            {new Intl.NumberFormat('vi-VN').format(record.price)} đ/đêm
                        </Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => {
                let color = 'success';
                let text = 'Trống';

                if (status === 'occupied') {
                    color = 'warning';
                    text = 'Đang thuê';
                } else if (status === 'maintenance') {
                    color = 'error';
                    text = 'Bảo trì';
                }

                return <Badge status={color} text={text} className="status-badge" />;
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
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
                        pageSize: 5,
                        showTotal: (total) => `Tổng số ${total} phòng`,
                        className: "custom-pagination"
                    }}
                    className="room-table"
                />
            </Card>
        </div>
    );
};

export default RoomList; 