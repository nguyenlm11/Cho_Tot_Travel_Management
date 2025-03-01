import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Input, Modal, Form, InputNumber, Typography, Dropdown, Tag } from 'antd';
import { PlusOutlined, EllipsisOutlined, SearchOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import './Inventory.css';
import '../../../styles/CommonTag.css';

const { Title, Text } = Typography;
const { Search } = Input;

const Inventory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        // Giả lập dữ liệu tồn kho
        const fetchData = async () => {
            setLoading(true);
            // Thay thế bằng API thực tế
            const inventoryData = [
                { key: '1', roomType: 'Phòng đơn', total: 10, available: 5, price: 500000, status: 'active' },
                { key: '2', roomType: 'Phòng đôi', total: 8, available: 3, price: 500000, status: 'active' },
                { key: '3', roomType: 'Phòng gia đình', total: 5, available: 2, price: 500000, status: 'inactive' },
            ];
            setData(inventoryData);
            setLoading(false);
        };

        fetchData();
    }, []);

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
                setData([...data, { key: Date.now().toString(), ...values }]);
            }
            setIsModalVisible(false);
        });
    };

    const columns = [
        {
            title: 'Loại phòng',
            dataIndex: 'roomType',
            key: 'roomType',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Giá phòng',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (price) =>
                <Text strong style={{ color: '#52c41a' }}>
                    {new Intl.NumberFormat('vi-VN').format(price)} đ
                </Text>,
        },
        {
            title: 'Tổng số phòng',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
        },
        {
            title: 'Số phòng còn lại',
            dataIndex: 'available',
            key: 'available',
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => {
                const config = {
                    active: { text: 'Hoạt động', class: 'active' },
                    inactive: { text: 'Tạm ngưng', class: 'inactive' }
                };
                return (
                    <Tag className={`status-tag ${config[status].class}`}>
                        {config[status].text}
                    </Tag>
                );
            }
        },
        {
            key: 'action',
            align: 'center',
            width: 60,
            render: () => {
                const items = [
                    {
                        key: '1',
                        icon: <EditFilled />,
                        label: 'Chỉnh sửa',
                        onClick: () => handleEdit(),
                    },
                    {
                        key: '2',
                        icon: <DeleteFilled />,
                        label: 'Xóa',
                        danger: true,
                        onClick: () => handleDelete(),
                    },
                ];
                return (
                    <Dropdown
                        menu={{ items }}
                        trigger={['hover']}
                    >
                        <Button type="text" icon={<EllipsisOutlined />} />
                    </Dropdown >
                )
            },
        },
    ];

    return (
        <div className="inventory-list-container">
            <Card className="inventory-card">
                <div className="card-header">
                    <Title level={2}>Tồn kho & Loại Phòng</Title>
                </div>

                <div className="search-section">
                    <Search
                        placeholder="Tìm kiếm theo loại phòng..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        className="search-input"
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={handleAdd}
                        className="add-button"
                    >
                        Thêm loại phòng
                    </Button>
                </div>

                <Table
                    className='inventory-table'
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{
                        total: data.length,
                        pageSize: 10,
                        showTotal: (total) => `${total} loại phòng`,
                        className: "inventory-pagination"
                    }}
                />
            </Card>

            <Modal
                title={editingItem ? 'Chỉnh sửa loại phòng' : 'Thêm loại phòng'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="roomType"
                        label="Tên loại phòng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="total"
                        label="Tổng số phòng"
                        rules={[{ required: true, message: 'Vui lòng nhập tổng số phòng' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="available"
                        label="Số phòng còn lại"
                        rules={[{ required: true, message: 'Vui lòng nhập số phòng còn lại' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Inventory; 