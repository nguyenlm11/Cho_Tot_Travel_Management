import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Typography, Button, Space, Statistic, Tooltip, Row, Col, Empty } from 'antd';
import { SearchOutlined, EyeOutlined, MessageOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';

const { Search } = Input;
const { Title, Text } = Typography;

const CustomerList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [animateStatistics, setAnimateStatistics] = useState(false);

    // Hiệu ứng khi component mount
    useEffect(() => {
        // Giả lập loading
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Kích hoạt animation cho thống kê
            setAnimateStatistics(true);
        }, 800);
    }, []);

    const data = [
        {
            key: '1',
            customerId: 'KH001',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '0901234567',
            lastCheckout: '2024-03-15',
            lastRoom: '101 - Deluxe Room',
            bookings: 5
        },
        {
            key: '2',
            customerId: 'KH002',
            name: 'Trần Thị B',
            email: 'tranthib@gmail.com',
            phone: '0912345678',
            lastCheckout: '2024-03-10',
            lastRoom: '202 - Suite Room',
            bookings: 3
        },
        {
            key: '3',
            customerId: 'KH003',
            name: 'Lê Văn C',
            email: 'levanc@gmail.com',
            phone: '0923456789',
            lastCheckout: '2024-03-05',
            lastRoom: '303 - Standard Room',
            bookings: 2
        },
        {
            key: '4',
            customerId: 'KH004',
            name: 'Phạm Thị D',
            email: 'phamthid@gmail.com',
            phone: '0934567890',
            lastCheckout: '2024-02-28',
            lastRoom: '404 - Family Room',
            bookings: 1
        },
        {
            key: '5',
            customerId: 'KH005',
            name: 'Hoàng Văn E',
            email: 'hoangvane@gmail.com',
            phone: '0945678901',
            lastCheckout: '2024-02-20',
            lastRoom: '505 - Deluxe Room',
            bookings: 4
        }
    ];

    // Lọc dữ liệu theo tìm kiếm
    const filteredData = data.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.phone.includes(searchText);
        return matchesSearch;
    });

    // Thống kê
    const totalCustomers = data.length;

    const handleMessage = (customer) => {
        console.log('Message to:', customer.name);
    };

    const columns = [
        {
            title: 'Khách hàng',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <Text strong>{text}</Text>
                    <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>#{record.customerId}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Liên hệ',
            dataIndex: 'email',
            key: 'email',
            render: (email, record) => (
                <div>
                    <div>{email}</div>
                    <div>{record.phone}</div>
                </div>
            ),
        },
        {
            title: 'Số lần đặt phòng',
            dataIndex: 'bookings',
            key: 'bookings',
            align: 'center',
            render: (bookings) => (
                <Text strong style={{ color: '#1890ff' }}>{bookings}</Text>
            ),
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
                <Space>
                    <CalendarOutlined style={{ color: '#1890ff' }} />
                    <Text>{new Date(date).toLocaleDateString('vi-VN')}</Text>
                </Space>
            ),
        },
        {
            key: 'action',
            title: 'Thao tác',
            align: 'center',
            width: 180,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={() => navigate(`/homestay/customers/${record.customerId}`)}
                            className="view-button"
                        />
                    </Tooltip>
                    <Tooltip title="Nhắn tin">
                        <Button
                            icon={<MessageOutlined />}
                            size="small"
                            onClick={() => handleMessage(record)}
                            className="message-button"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="customer-list-container">
            <Card className="customer-card">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div className="page-header">
                        <Title level={3}>Danh sách khách hàng</Title>
                    </div>

                    {/* Thống kê */}
                    <Row gutter={16} className={`statistics-row ${animateStatistics ? 'animate' : ''}`}>
                        <Col xs={24}>
                            <Card className="statistic-card total">
                                <Statistic
                                    title="Tổng số khách hàng"
                                    value={totalCustomers}
                                    prefix={<TeamOutlined className="statistic-icon" />}
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Thanh công cụ */}
                    <div className="toolbar">
                        <div className="toolbar-left">
                            <Search
                                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                                allowClear
                                onChange={(e) => setSearchText(e.target.value)}
                                prefix={<SearchOutlined />}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {/* Nội dung chính */}
                    <div className="content-container">
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            loading={loading}
                            pagination={{
                                pageSize: 10,
                            }}
                            rowClassName={(record, index) => `table-row animate-row-${index % 2}`}
                            className="customer-table"
                            locale={{
                                emptyText: <Empty description="Không tìm thấy khách hàng nào" />
                            }}
                        />
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default CustomerList;