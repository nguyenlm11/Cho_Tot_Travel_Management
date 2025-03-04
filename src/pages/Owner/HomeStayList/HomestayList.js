import React, { useState, useEffect, useContext } from 'react';
import { Table, Card, Button, Input, Typography, Tag, Dropdown, Menu } from 'antd';
import { PlusOutlined, SearchOutlined, EllipsisOutlined, EyeFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HomestayContext } from '../../../contexts/HomestayContext';
import './HomestayList.css';
import '../../../styles/CommonTag.css';

const { Search } = Input;
const { Title, Text } = Typography;

const HomestayList = () => {
    const navigate = useNavigate();
    const { setSelectedHomestay } = useContext(HomestayContext);
    const [loading, setLoading] = useState(false);
    const [homestays, setHomestays] = useState([]);
    const [error, setError] = useState(null);

    const fetchHomestays = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://653d1d13f52310ee6a99e3b7.mockapi.io/homestay');
            if (!response.ok) {
                throw new Error(`Lỗi fetch: ${response.statusText}`);
            }
            const data = await response.json();
            setHomestays(data);
        } catch (err) {
            console.error('Fetch homestays error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomestays();
    }, []);

    const columns = [
        {
            title: 'Mã Homestay',
            dataIndex: 'property_id',
            width: 130,
            key: 'property_id',
            render: (text) => <Text type="secondary">#{text}</Text>,
        },
        {
            title: 'Tên Homestay',
            dataIndex: 'property_name',
            key: 'property_name',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
        },
        {
            title: 'Đơn/Cụm',
            dataIndex: 'structure_mode',
            key: 'structure_mode',
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
                    inactive: { text: 'Tạm ngưng', class: 'inactive' },
                };
                return (
                    <Tag className={`status-tag ${config[status]?.class || ''}`}>
                        {config[status]?.text || status}
                    </Tag>
                );
            },
        },
        {
            key: 'action',
            align: 'center',
            width: 70,
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        icon: <EyeFilled />,
                        label: 'Quản lý',
                        onClick: () => {
                            setSelectedHomestay(record);
                            navigate(`/homestay/${record.property_id}/dashboard`);
                        }
                    },
                    {
                        key: '2',
                        icon: <EditFilled />,
                        label: 'Chỉnh sửa',
                        onClick: () => navigate(`/homestay/${record.property_id}/edit-homestay`)
                    },
                    {
                        key: '3',
                        icon: <DeleteFilled />,
                        label: 'Xóa',
                        danger: true,
                        onClick: () => console.log(`Xóa homestay ${record.property_id}`)
                    },
                ];

                return (
                    <Dropdown
                        menu={{ items }}
                        trigger={['hover']}
                        placement="bottomRight"
                        arrow
                    >
                        <Button
                            type="text"
                            icon={<EllipsisOutlined />}
                            className="action-button"
                            size="large"
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
                    dataSource={homestays}
                    loading={loading}
                    pagination={{
                        total: homestays.length,
                        pageSize: 10,
                        showTotal: (total) => `Tổng số ${total} homestay`,
                        className: "homestay-pagination",
                    }}
                    className="homestay-table"
                />
            </Card>
        </div>
    );
};

export default HomestayList;
