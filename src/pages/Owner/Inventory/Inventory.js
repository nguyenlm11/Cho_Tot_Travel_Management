import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Input, Modal, Form, InputNumber, Typography, Dropdown, Tag } from 'antd';
import { PlusOutlined, EllipsisOutlined, SearchOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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

    const filteredData = data.filter(item =>
        item.roomType.toLowerCase().includes(searchText.toLowerCase())
    );

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
            form.resetFields();
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
                            {
                                key: '1',
                                icon: <EditFilled />,
                                label: 'Chỉnh sửa',
                                onClick: () => handleEdit(record),
                            },
                            {
                                key: '2',
                                icon: <DeleteFilled />,
                                label: 'Xóa',
                                danger: true,
                                onClick: () => handleDelete(record.key),
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
        <div className="inventory-list-container">
            <Card className="inventory-card">
                <Title level={3} style={{ margin: 0 }}>Tồn kho & Loại Phòng</Title>
                <div className="toolbar">
                    <Search
                        placeholder="Tìm kiếm theo loại phòng..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Thêm loại phòng
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={loading}
                    pagination={{
                        total: filteredData.length,
                        pageSize: 10,
                        showTotal: (total) => `Tổng: ${total} loại phòng`,
                    }}
                    rowClassName="table-row"
                />

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
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default Inventory;