import React, { useState } from 'react';
import { Table, Card, Button, Space, Input, Modal, Form, InputNumber, Select, Typography, Badge, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined, EllipsisOutlined } from '@ant-design/icons';
import './ServiceList.css';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const ServiceList = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [form] = Form.useForm();

    const data = [
        {
            key: '1',
            serviceId: 'SV001',
            serviceName: 'Dịch vụ giặt ủi',
            status: 'active',
            price: 150000,
            description: 'Giặt ủi quần áo theo kg',
        },
        {
            key: '2',
            serviceId: 'SV002',
            serviceName: 'Thuê xe máy',
            status: 'active',
            price: 200000,
            description: 'Thuê xe máy theo ngày',
        },
        {
            key: '3',
            serviceId: 'SV003',
            serviceName: 'Đưa đón sân bay',
            status: 'inactive',
            price: 300000,
            description: 'Dịch vụ đưa đón sân bay',
        },
        {
            key: '3',
            serviceId: 'SV003',
            serviceName: 'Đưa đón sân bay',
            status: 'inactive',
            price: 300000,
            description: 'Dịch vụ đưa đón sân bay',
        },
        {
            key: '3',
            serviceId: 'SV003',
            serviceName: 'Đưa đón sân bay',
            status: 'inactive',
            price: 300000,
            description: 'Dịch vụ đưa đón sân bay',
        }
    ];

    const columns = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
            width: 250,
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong className="service-name">{text}</Text>
                    <Text type="secondary" className="service-id">#{record.serviceId}</Text>
                </Space>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 300,
        },
        {
            title: 'Giá dịch vụ',
            dataIndex: 'price',
            key: 'price',
            width: 200,
            render: (price) => (
                <Text strong className="price">
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
                let color = 'success';
                let text = 'Hoạt động';
                if (status === 'inactive') {
                    color = 'error';
                    text = 'Tạm ngưng';
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
                        icon: <EditOutlined />,
                        label: 'Chỉnh sửa',
                        onClick: () => handleEdit(record),
                    },
                    {
                        key: '2',
                        icon: <DeleteOutlined />,
                        label: 'Xóa',
                        danger: true,
                        onClick: () => handleDelete(record),
                    },
                ];

                return (
                    <Dropdown
                        menu={{ items }}
                        trigger="click"
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
            onOk: () => {
                // Handle delete logic here
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            setIsModalVisible(false);
            form.resetFields();
            setEditingService(null);
        });
    };

    return (
        <div className="service-list-container">
            <Card className="service-card">
                <div className="card-header">
                    <Title level={2}>Danh sách dịch vụ</Title>
                </div>

                <div className="search-section">
                    <Search
                        placeholder="Tìm kiếm theo tên dịch vụ..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        className="search-input"
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
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

                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{
                        total: data.length,
                        pageSize: 5,
                        showTotal: (total) => `Tổng số ${total} dịch vụ`,
                        className: "custom-pagination"
                    }}
                    className="service-table"
                />

                <Modal
                    title={editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingService(null);
                    }}
                    width={600}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="serviceName"
                            label="Tên dịch vụ"
                            rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả dịch vụ' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="Giá dịch vụ (VNĐ)"
                            rules={[{ required: true, message: 'Vui lòng nhập giá dịch vụ' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                        >
                            <Select>
                                <Option value="active">Hoạt động</Option>
                                <Option value="inactive">Ngừng hoạt động</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default ServiceList; 