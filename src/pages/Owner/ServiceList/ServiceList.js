import React, { useState, useEffect } from 'react';
import {
    Table, Card, Button, Input, Modal, Form, InputNumber, Select, Typography,
    Tag, Space, Statistic, Segmented, Tooltip, Row, Col, Empty, Spin, Avatar
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
    AppstoreOutlined, BarsOutlined, CheckCircleOutlined,
    StopOutlined, ShoppingOutlined, DollarOutlined,
    ReloadOutlined,
    CloseCircleOutlined,
    DeleteFilled,
    EditFilled
} from '@ant-design/icons';
import './ServiceList.css';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const ServiceList = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [viewMode, setViewMode] = useState('table');
    const [statusFilter, setStatusFilter] = useState('all');
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

    // Mẫu dữ liệu dịch vụ
    const data = [
        { key: '1', serviceId: 'SV001', serviceName: 'Dịch vụ giặt ủi', status: 'active', price: 150000, description: 'Giặt ủi quần áo theo kg', icon: 'https://img.icons8.com/color/48/000000/washing-machine.png' },
        { key: '2', serviceId: 'SV002', serviceName: 'Thuê xe máy', status: 'active', price: 200000, description: 'Thuê xe máy theo ngày', icon: 'https://img.icons8.com/color/48/000000/motorcycle.png' },
        { key: '3', serviceId: 'SV003', serviceName: 'Đưa đón sân bay', status: 'inactive', price: 300000, description: 'Dịch vụ đưa đón sân bay', icon: 'https://img.icons8.com/color/48/000000/airport.png' },
        { key: '4', serviceId: 'SV004', serviceName: 'Tour du lịch địa phương', status: 'active', price: 500000, description: 'Tour tham quan các điểm du lịch nổi tiếng trong khu vực', icon: 'https://img.icons8.com/color/48/000000/beach.png' },
        { key: '5', serviceId: 'SV005', serviceName: 'Dịch vụ spa', status: 'inactive', price: 350000, description: 'Dịch vụ massage và chăm sóc sức khỏe', icon: 'https://img.icons8.com/color/48/000000/spa-flower.png' },
    ];

    const filteredData = data.filter(item => {
        const matchesSearch = item.serviceName.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalServices = data.length;
    const activeServices = data.filter(item => item.status === 'active').length;
    const inactiveServices = data.filter(item => item.status === 'inactive').length;

    // Xử lý chuyển đổi trạng thái với hiệu ứng mượt mà
    const handleStatusChange = (value) => {
        // Thêm hiệu ứng trễ nhỏ để animation trượt hoàn thành trước khi dữ liệu thay đổi
        setTimeout(() => {
            setStatusFilter(value);
        }, 50);
    };

    // Xử lý chuyển đổi chế độ xem với hiệu ứng mượt mà
    const handleViewModeChange = (value) => {
        setTimeout(() => {
            setViewMode(value);
        }, 50);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'serviceId',
            key: 'serviceId',
            width: 80,
            align: 'center',
            render: (text) => <Text type="secondary">#{text}</Text>,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
            render: (text, record) => (
                <Space>
                    <Avatar
                        src={record.icon}
                        size="small"
                        className="service-avatar"
                        style={{ backgroundColor: record.status === 'active' ? '#e6f7e9' : '#fff1f0' }}
                    />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 400,
            ellipsis: true,
        },
        {
            title: 'Giá (VNĐ)',
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
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="primary"
                            icon={<EditFilled />}
                            onClick={() => handleEdit(record)}
                            className="action-button edit"
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            danger
                            icon={<DeleteFilled />}
                            onClick={() => handleDelete(record)}
                            className="action-button delete"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleEdit = (service) => {
        setEditingService(service);
        form.setFieldsValue(service);
        setIsModalVisible(true);
    };

    const handleDelete = (service) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa dịch vụ "${service.serviceName}"?`,
            okText: 'Xóa',
            cancelText: 'Hủy',
            okButtonProps: { danger: true },
            onOk: () => console.log('Xóa:', service),
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            console.log('Dữ liệu:', values);
            setIsModalVisible(false);
            form.resetFields();
            setEditingService(null);
        });
    };

    // Hiển thị dạng lưới
    const renderServiceGrid = () => {
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
                    description="Không tìm thấy dịch vụ nào"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className="empty-container"
                />
            );
        }

        return (
            <Row gutter={[16, 16]} className="service-grid">
                {filteredData.map((service, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={service.key}>
                        <Card
                            className={`service-grid-card ${service.status}`}
                            hoverable
                            style={{ animationDelay: `${index * 0.1}s` }}
                            actions={[
                                <Tooltip title="Chỉnh sửa">
                                    <EditOutlined key="edit" onClick={() => handleEdit(service)} />
                                </Tooltip>,
                                <Tooltip title="Xóa">
                                    <DeleteOutlined key="delete" onClick={() => handleDelete(service)} />
                                </Tooltip>,
                            ]}
                        >
                            <div className="service-card-header">
                                <Tag color={service.status === 'active' ? '#30B53E' : '#f5222d'} className={`status-tag ${service.status}`}>
                                    {service.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                                </Tag>
                            </div>
                            <div className="service-card-content">
                                <div className="service-card-avatar">
                                    <Avatar
                                        src={service.icon}
                                        size={64}
                                        className="service-avatar-large"
                                    />
                                </div>
                                <div className="service-card-title">
                                    <Text strong>{service.serviceName}</Text>
                                    <Text type="secondary" className="service-id">#{service.serviceId}</Text>
                                </div>
                                <div className="service-card-description">
                                    <Text type="secondary">{service.description}</Text>
                                </div>
                                <div className="service-card-price">
                                    <DollarOutlined />
                                    <Text strong style={{ color: '#30B53E' }}>
                                        {new Intl.NumberFormat('vi-VN').format(service.price)} VNĐ
                                    </Text>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <div className="service-list-container">
            <Card className="service-card">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div className="service-page-header">
                        <Title level={3}>Danh sách dịch vụ</Title>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setEditingService(null);
                                form.resetFields();
                                setIsModalVisible(true);
                            }}
                            className="add-button"
                        >
                            Thêm dịch vụ
                        </Button>
                    </div>

                    {/* Thống kê */}
                    <Row gutter={16} className={`statistics-row ${animateStatistics ? 'animate' : ''}`}>
                        <Col xs={24} sm={8}>
                            <Card className="statistic-card total">
                                <Statistic
                                    title="Tổng số dịch vụ"
                                    value={totalServices}
                                    prefix={<ShoppingOutlined className="statistic-icon" />}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card className="statistic-card active">
                                <Statistic
                                    title="Đang hoạt động"
                                    value={activeServices}
                                    prefix={<CheckCircleOutlined className="statistic-icon" />}
                                    valueStyle={{ color: '#30B53E' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card className="statistic-card inactive">
                                <Statistic
                                    title="Tạm ngưng"
                                    value={inactiveServices}
                                    prefix={<StopOutlined className="statistic-icon" />}
                                    valueStyle={{ color: '#f5222d' }}
                                />
                            </Card>
                        </Col>
                    </Row>

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
                                placeholder="Tìm kiếm dịch vụ..."
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
                                className="service-table"
                                locale={{
                                    emptyText: <Empty description="Không tìm thấy dịch vụ nào" />
                                }}
                            />
                        ) : (
                            renderServiceGrid()
                        )}
                    </div>
                </Space>

                {/* Modal thêm/sửa dịch vụ */}
                <Modal
                    title={editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingService(null);
                    }}
                    okText={editingService ? 'Cập nhật' : 'Thêm'}
                    cancelText="Hủy"
                    className="service-modal"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input placeholder="Nhập tên dịch vụ" />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                            <Input.TextArea rows={3} placeholder="Nhập mô tả dịch vụ" />
                        </Form.Item>
                        <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                placeholder="Nhập giá dịch vụ"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                        <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                            <Select placeholder="Chọn trạng thái">
                                <Option value="active">Hoạt động</Option>
                                <Option value="inactive">Tạm ngưng</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default ServiceList;