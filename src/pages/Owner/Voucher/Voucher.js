import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Input, Modal, Form, InputNumber, DatePicker, Typography, Dropdown, Tag, Radio } from 'antd';
import { PlusOutlined, EllipsisOutlined, SearchOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import './Voucher.css';

const { Search } = Input;
const { Title, Text } = Typography;

const Voucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchVouchers = async () => {
            setLoading(true);
            const sampleData = [
                {
                    key: '1',
                    voucherCode: 'SUMMER2025',
                    description: 'Giảm 20% cho mùa hè',
                    discountType: 'percent',
                    discountValue: 20,
                    status: 'active',
                    expiryDate: '2025-08-31',
                },
                {
                    key: '2',
                    voucherCode: 'WELCOME10',
                    description: 'Giảm 100,000 VNĐ cho khách mới',
                    discountType: 'fixed',
                    discountValue: 100000,
                    status: 'active',
                    expiryDate: '2025-12-31',
                },
                {
                    key: '3',
                    voucherCode: 'SPRINGOFF',
                    description: 'Giảm 15% mùa xuân',
                    discountType: 'percent',
                    discountValue: 15,
                    status: 'inactive',
                    expiryDate: '2025-03-31',
                },
            ];
            setVouchers(sampleData);
            setLoading(false);
        };
        fetchVouchers();
    }, []);

    const filteredData = vouchers.filter(item =>
        item.voucherCode.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAdd = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const newVoucher = {
                key: Date.now().toString(),
                voucherCode: values.voucherCode,
                description: values.description,
                discountType: values.discountType,
                discountValue: values.discountValue,
                status: 'Chờ duyệt',
                expiryDate: values.expiryDate.format('YYYY-MM-DD'),
            };
            setVouchers([...vouchers, newVoucher]);
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Mã giảm giá',
            dataIndex: 'voucherCode',
            key: 'voucherCode',
            width: 150,
            render: (text) => <Text strong>{text.toUpperCase()}</Text>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discountValue',
            key: 'discountValue',
            align: 'center',
            render: (value, record) => (
                <Text strong style={{ color: '#30B53E' }}>
                    {record.discountType === 'percent'
                        ? `${value}%`
                        : `${new Intl.NumberFormat('vi-VN').format(value)} VNĐ`}
                </Text>
            ),
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            align: 'center',
            render: (date) => (
                <Text>{new Date(date).toLocaleDateString('vi-VN')}</Text>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 120,
            render: (status) => (
                <Tag color={status === 'active' ? '#30B53E' : '#f5222d'} style={{ padding: '2px 10px' }}>
                    {status === 'active' ? 'Hoạt động' : 'Hết hạn'}
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
                                onClick: () => console.log(`Edit voucher ${record.voucherCode}`),
                            },
                            {
                                key: '2',
                                icon: <DeleteFilled />,
                                label: 'Xóa',
                                danger: true,
                                onClick: () => console.log(`Delete voucher ${record.voucherCode}`),
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
        <div className="voucher-list-container">
            <Card className="voucher-card">
                <Title level={3} style={{ margin: 0 }}>Danh sách mã giảm giá</Title>
                <div className="toolbar">
                    <Search
                        placeholder="Tìm kiếm theo mã hoặc mô tả..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Thêm Voucher
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={loading}
                    pagination={{
                        total: filteredData.length,
                        pageSize: 10,
                        showTotal: (total) => `Tổng: ${total} voucher`,
                    }}
                    rowClassName="table-row"
                />

                <Modal
                    title="Thêm Voucher Mới"
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                    }}
                    okText="Thêm"
                    cancelText="Hủy"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="voucherCode"
                            label="Mã Voucher"
                            rules={[{ required: true, message: 'Vui lòng nhập mã voucher!' }]}
                        >
                            <Input placeholder="Nhập mã voucher" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                        >
                            <Input placeholder="Nhập mô tả voucher" />
                        </Form.Item>
                        <Form.Item
                            name="discountType"
                            label="Loại giảm giá"
                            rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá!' }]}
                            initialValue="percent"
                        >
                            <Radio.Group>
                                <Radio value="percent">Phần trăm (%)</Radio>
                                <Radio value="fixed">Số tiền cố định (VNĐ)</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.discountType !== currentValues.discountType}
                        >
                            {({ getFieldValue }) => (
                                <Form.Item
                                    name="discountValue"
                                    label="Giá trị giảm giá"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}
                                >
                                    <InputNumber
                                        min={0}
                                        max={getFieldValue('discountType') === 'percent' ? 70 : undefined}
                                        style={{ width: '100%' }}
                                        placeholder={getFieldValue('discountType') === 'percent' ? 'Nhập % giảm' : 'Nhập số tiền giảm'}
                                        formatter={value => getFieldValue('discountType') === 'percent' ? `${value}` : `${value}`}
                                        parser={value => value.replace(/[^0-9]/g, '')}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item
                            name="expiryDate"
                            label="Ngày hết hạn"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default Voucher;