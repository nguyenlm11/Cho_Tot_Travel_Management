import React, { useState, useEffect, useContext } from 'react';
import { Table, Card, Button, Input, Typography, Tag, Dropdown, Spin } from 'antd';
import { PlusOutlined, SearchOutlined, EllipsisOutlined, EyeFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HomestayContext } from '../../../contexts/HomestayContext';
import './HomestayList.css';

const { Search } = Input;
const { Title, Text } = Typography;

const HomestayList = () => {
    const navigate = useNavigate();
    const { setSelectedHomestay } = useContext(HomestayContext);
    const [loading, setLoading] = useState(false);
    const [homestays, setHomestays] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchHomestays = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://653d1d13f52310ee6a99e3b7.mockapi.io/homestay');
            if (!response.ok) throw new Error(`Lỗi fetch: ${response.statusText}`);
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

    const filteredData = homestays.filter(item =>
        item.property_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.address.toLowerCase().includes(searchText.toLowerCase())
    );

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
            width: 120,
            render: (status) => (
                <Tag color={status === 'active' ? '#30B53E' : '#f5222d'} style={{ padding: '2px 10px' }}>
                    {status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
                </Tag>
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
                                label: 'Quản lý',
                                onClick: () => {
                                    setSelectedHomestay(record);
                                    navigate(`/homestay/${record.property_id}/dashboard`);
                                },
                            },
                            {
                                key: '2',
                                icon: <EditFilled />,
                                label: 'Chỉnh sửa',
                                onClick: () => navigate(`/homestay/${record.property_id}/edit-homestay`),
                            },
                            {
                                key: '3',
                                icon: <DeleteFilled />,
                                label: 'Xóa',
                                danger: true,
                                onClick: () => console.log(`Xóa homestay ${record.property_id}`),
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

    return (
        <div className="homestay-list-container">
            <Card className="homestay-card">
                <Title level={3} style={{ margin: 0 }}>Danh sách Homestay</Title>
                <div className="toolbar">
                    <Search
                        placeholder="Tìm kiếm homestay hoặc địa chỉ..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/homestay/new')}
                    >
                        Thêm Homestay
                    </Button>
                </div>

                <Spin spinning={loading}>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={{
                            total: filteredData.length,
                            pageSize: 10,
                            showTotal: (total) => `Tổng: ${total} homestay`,
                        }}
                        rowKey="property_id"
                        rowClassName="table-row"
                    />
                </Spin>

                {error && (
                    <div className="error-message">
                        <Text type="danger">{error}</Text>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default HomestayList;