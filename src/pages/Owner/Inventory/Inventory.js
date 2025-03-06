import React, { useState, useEffect } from 'react';
import {
    Card, Table, Button, Input, Modal, Form, InputNumber, Typography,
    Space, Tooltip, Tag, Statistic, Row, Col, Empty, Spin, Segmented
} from 'antd';
import {
    PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined,
    AppstoreOutlined, BarsOutlined, DatabaseOutlined,
    CheckCircleOutlined, CloseCircleOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import './Inventory.css';

const { Title, Text } = Typography;
const { Search } = Input;

const Inventory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [viewMode, setViewMode] = useState('table');
    const [statusFilter, setStatusFilter] = useState('all');
    const [animateStatistics, setAnimateStatistics] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Giả lập loading
            setTimeout(() => {
                const inventoryData = [
                    { key: '1', roomType: 'Phòng đơn', total: 10, available: 5, price: 500000, status: 'active' },
                    { key: '2', roomType: 'Phòng đôi', total: 8, available: 3, price: 800000, status: 'active' },
                    { key: '3', roomType: 'Phòng gia đình', total: 5, available: 2, price: 1200000, status: 'inactive' },
                    { key: '4', roomType: 'Phòng VIP', total: 3, available: 1, price: 1500000, status: 'active' },
                    { key: '5', roomType: 'Phòng Deluxe', total: 6, available: 0, price: 1800000, status: 'inactive' },
                ];
                setData(inventoryData);
                setLoading(false);
                // Kích hoạt animation cho thống kê
                setAnimateStatistics(true);
            }, 800);
        };
        fetchData();
    }, []);

    // Lọc dữ liệu theo tìm kiếm và trạng thái
    const filteredData = data.filter(item => {
        const matchesSearch = item.roomType.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Thống kê
    const totalRooms = data.reduce((acc, item) => acc + item.total, 0);
    const availableRooms = data.reduce((acc, item) => acc + item.available, 0);
    const activeRoomTypes = data.filter(item => item.status === 'active').length;
    const inactiveRoomTypes = data.filter(item => item.status === 'inactive').length;

    const handleAdd = () => {
        setEditingItem(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingItem) {
                setData(data.map(item => (item.key === editingItem.key ? { ...item, ...values } : item)));
            } else {
                setData([...data, { key: Date.now().toString(), ...values, status: values.status || 'active' }]);
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    // Xử lý chuyển đổi chế độ xem với hiệu ứng mượt mà
    const handleViewModeChange = (value) => {
        setTimeout(() => {
            setViewMode(value);
        }, 50);
    };

    // Xử lý chuyển đổi bộ lọc trạng thái với hiệu ứng mượt mà
    const handleStatusChange = (value) => {
        setTimeout(() => {
            setStatusFilter(value);
        }, 50);
    };

    const columns = [
        {
            title: 'Loại phòng',
            dataIndex: 'roomType',
            key: 'roomType',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Giá phòng (VNĐ)',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (price) => (
                <Text strong style={{ color: '#30B53E' }}>
                    {new Intl.NumberFormat('vi-VN').format(price)}
                </Text>
            ),
        },
        {
            title: 'Tổng số phòng',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
            render: (total) => <Text>{total}</Text>,
        },
        {
            title: 'Số phòng còn lại',
            dataIndex: 'available',
            key: 'available',
            align: 'center',
            render: (available, record) => (
                <Text style={{ color: available === 0 ? '#f5222d' : (available < record.total / 3 ? '#faad14' : '#30B53E') }}>
                    {available}
                </Text>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => (
                <Tag
                    icon={status === 'active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    className={`status-tag ${status}`}
                >
                    {status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                </Tag>
            ),
        },
        {
            key: 'action',
            title: 'Thao tác',
            align: 'center',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                            className="edit-button"
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.key)}
                            className="delete-button"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    // Hiển thị dạng lưới
    const renderInventoryGrid = () => {
        if (loading) {
            return (
                <div className="loading-container">
                    <Spin size="large" />
                    <p>Đang tải dữ liệu...</p>
                </div>
            );
        }

        if (filteredData.length === 0) {
            return (
                <Empty
                    description="Không tìm thấy loại phòng nào"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className="empty-container"
                />
            );
        }

        return (
            <Row gutter={[16, 16]} className="inventory-grid">
                {filteredData.map((item, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={item.key}>
                        <Card
                            className={`inventory-grid-card ${item.status}`}
                            hoverable
                            style={{ animationDelay: `${index * 0.1}s` }}
                            actions={[
                                <Tooltip title="Chỉnh sửa">
                                    <EditOutlined key="edit" onClick={() => handleEdit(item)} />
                                </Tooltip>,
                                <Tooltip title="Xóa">
                                    <DeleteOutlined key="delete" onClick={() => handleDelete(item.key)} />
                                </Tooltip>,
                            ]}
                        >
                            <div className="inventory-card-header">
                                <Tag color={item.status === 'active' ? '#30B53E' : '#f5222d'} className={`status-tag ${item.status}`}>
                                    {item.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                                </Tag>
                            </div>
                            <div className="inventory-card-content">
                                <div className="inventory-card-title">
                                    <Text strong>{item.roomType}</Text>
                                </div>
                                <div className="inventory-card-price">
                                    <Text type="secondary">Giá phòng:</Text>
                                    <Text strong style={{ color: '#30B53E' }}>
                                        {new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ
                                    </Text>
                                </div>
                                <div className="inventory-card-details">
                                    <div className="detail-item">
                                        <Text type="secondary">Tổng số phòng:</Text>
                                        <Text>{item.total}</Text>
                                    </div>
                                    <div className="detail-item">
                                        <Text type="secondary">Số phòng còn lại:</Text>
                                        <Text style={{
                                            color: item.available === 0 ? '#f5222d' :
                                                (item.available < item.total / 3 ? '#faad14' : '#30B53E')
                                        }}>
                                            {item.available}
                                        </Text>
                                    </div>
                                </div>
                                <div className="inventory-card-availability">
                                    <div className="availability-bar">
                                        <div
                                            className="availability-progress"
                                            style={{
                                                width: `${(item.available / item.total) * 100}%`,
                                                backgroundColor: item.available === 0 ? '#f5222d' :
                                                    (item.available < item.total / 3 ? '#faad14' : '#30B53E')
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <div className="inventory-list-container">
            <Card className="inventory-card">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div className="inventory-page-header">
                        <Title level={3}>Tồn kho & Loại Phòng</Title>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                            className="add-button"
                        >
                            Thêm loại phòng
                        </Button>
                    </div>

                    {/* Thống kê */}
                    <Row gutter={16} className={`statistics-row ${animateStatistics ? 'animate' : ''}`}>
                        <Col xs={24} sm={12} md={6}>
                            <Card className="statistic-card total">
                                <Statistic
                                    title="Tổng số phòng"
                                    value={totalRooms}
                                    prefix={<DatabaseOutlined className="statistic-icon" />}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card className="statistic-card available">
                                <Statistic
                                    title="Số phòng còn trống"
                                    value={availableRooms}
                                    prefix={<CheckCircleOutlined className="statistic-icon" />}
                                    valueStyle={{ color: '#30B53E' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card className="statistic-card active">
                                <Statistic
                                    title="Loại phòng đang hoạt động"
                                    value={activeRoomTypes}
                                    prefix={<CheckCircleOutlined className="statistic-icon" />}
                                    valueStyle={{ color: '#30B53E' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card className="statistic-card inactive">
                                <Statistic
                                    title="Loại phòng tạm ngưng"
                                    value={inactiveRoomTypes}
                                    prefix={<CloseCircleOutlined className="statistic-icon" />}
                                    valueStyle={{ color: '#f5222d' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Bộ lọc trạng thái */}
                    <div className="status-filter-container">

                    </div>

                    {/* Thanh công cụ */}
                    <div className="toolbar">
                        <div className="toolbar-left">
                            <Segmented
                                options={[
                                    { value: 'all', label: 'Tất cả' },
                                    { value: 'active', label: 'Hoạt động' },
                                    { value: 'inactive', label: 'Tạm ngưng' },
                                ]}
                                value={statusFilter}
                                onChange={handleStatusChange}
                                className="status-filter"
                            />

                            <Tooltip title="Làm mới dữ liệu">
                                <Button
                                    icon={<ReloadOutlined />}
                                    // onClick={fetchHomestays}
                                    className="refresh-button"
                                />
                            </Tooltip>
                        </div>
                        <div className="toolbar-right">
                            <Search
                                placeholder="Tìm kiếm theo loại phòng..."
                                allowClear
                                onChange={(e) => setSearchText(e.target.value)}
                                prefix={<SearchOutlined />}
                                className="search-input"
                            />

                            <Segmented
                                options={[
                                    { value: 'table', icon: <BarsOutlined /> },
                                    { value: 'grid', icon: <AppstoreOutlined /> },
                                ]}
                                value={viewMode}
                                onChange={handleViewModeChange}
                                className="view-mode-toggle"
                            />
                        </div>
                    </div>

                    {/* Nội dung chính */}
                    <div className="content-container">
                        {viewMode === 'table' ? (
                            <Table
                                columns={columns}
                                dataSource={filteredData}
                                loading={loading}
                                pagination={{
                                    pageSize: 10,
                                }}
                                rowClassName={(record, index) => `table-row animate-row-${index % 2}`}
                                className="inventory-table"
                                locale={{
                                    emptyText: <Empty description="Không tìm thấy loại phòng nào" />
                                }}
                            />
                        ) : (
                            renderInventoryGrid()
                        )}
                    </div>
                </Space>
            </Card>

            <Modal
                title={editingItem ? 'Chỉnh sửa loại phòng' : 'Thêm loại phòng'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                okText={editingItem ? 'Cập nhật' : 'Thêm'}
                cancelText="Hủy"
                className="inventory-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="roomType"
                        label="Tên loại phòng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng' }]}
                    >
                        <Input placeholder="Nhập tên loại phòng" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá phòng (VNĐ)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá phòng' }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            placeholder="Nhập giá phòng"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="total"
                        label="Tổng số phòng"
                        rules={[{ required: true, message: 'Vui lòng nhập tổng số phòng' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập tổng số phòng" />
                    </Form.Item>
                    <Form.Item
                        name="available"
                        label="Số phòng còn lại"
                        rules={[{ required: true, message: 'Vui lòng nhập số phòng còn lại' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số phòng còn lại" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        initialValue="active"
                    >
                        <Segmented
                            options={[
                                {
                                    label: 'Hoạt động',
                                    value: 'active',
                                },
                                {
                                    label: 'Tạm ngưng',
                                    value: 'inactive',
                                },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Inventory;