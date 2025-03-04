import React, { useState } from 'react';
import { Table, Card, Button, Input, Modal, Form, InputNumber, Select, Typography, Dropdown, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EllipsisOutlined } from '@ant-design/icons';
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

    const data = [
        { key: '1', serviceId: 'SV001', serviceName: 'Dịch vụ giặt ủi', status: 'active', price: 150000, description: 'Giặt ủi quần áo theo kg' },
        { key: '2', serviceId: 'SV002', serviceName: 'Thuê xe máy', status: 'active', price: 200000, description: 'Thuê xe máy theo ngày' },
        { key: '3', serviceId: 'SV003', serviceName: 'Đưa đón sân bay', status: 'inactive', price: 300000, description: 'Dịch vụ đưa đón sân bay' },
    ];

    const filteredData = data.filter(item =>
        item.serviceName.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Mã dịch vụ',
            dataIndex: 'serviceId',
            key: 'serviceId',
            width: 120,
            render: (text) => <Text type="secondary">#{text}</Text>,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
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
                <Tag color={status === 'active' ? '#30B53E' : '#f5222d'} style={{ padding: '2px 10px' }}>
                    {status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
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
                            { key: '1', icon: <EditOutlined />, label: 'Chỉnh sửa', onClick: () => handleEdit(record) },
                            { key: '2', icon: <DeleteOutlined />, label: 'Xóa', danger: true, onClick: () => handleDelete(record) },
                        ],
                    }}
                    trigger={['click']}
                >
                    <Button type="text" icon={<EllipsisOutlined />} />
                </Dropdown>
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

    return (
        <div className="service-list-container">
            <Card className="service-card">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={3} style={{ margin: 0 }}>Danh sách dịch vụ</Title>
                    <div className="toolbar">
                        <Search
                            placeholder="Tìm kiếm dịch vụ..."
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            prefix={<SearchOutlined />}
                            style={{ width: 300 }}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setEditingService(null);
                                form.resetFields();
                                setIsModalVisible(true);
                            }}
                        >
                            Thêm dịch vụ
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        loading={loading}
                        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total} dịch vụ` }}
                        rowClassName="table-row"
                    />
                </Space>

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
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input placeholder="Nhập tên dịch vụ" />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                            <Input.TextArea rows={3} placeholder="Nhập mô tả dịch vụ" />
                        </Form.Item>
                        <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập giá dịch vụ" />
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