import React, { useState, useEffect, useContext } from 'react';
import {
    Table, Card, Button, Input, Typography, Tag, Spin,
    Row, Col, Statistic, Avatar, Empty, Segmented, Tooltip, Badge, Space
} from 'antd';
import {
    PlusOutlined, SearchOutlined, EyeFilled,
    EditFilled, DeleteFilled, HomeOutlined, EnvironmentOutlined,
    ReloadOutlined, AppstoreOutlined, UnorderedListOutlined,
    CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
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
    const [viewMode, setViewMode] = useState('table');
    const [filterStatus, setFilterStatus] = useState('all');

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

    // Tính toán số lượng homestay theo trạng thái
    const activeHomestays = homestays.filter(item => item.status === 'active').length;
    const inactiveHomestays = homestays.filter(item => item.status === 'inactive').length;

    // Lọc dữ liệu theo tìm kiếm và trạng thái
    const filteredData = homestays.filter(item => {
        const matchesSearch = item.property_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.address.toLowerCase().includes(searchText.toLowerCase());

        if (filterStatus === 'all') return matchesSearch;
        return matchesSearch && item.status === filterStatus;
    });

    // Xử lý xóa homestay
    const handleDelete = (homestayId) => {
        // Thực tế sẽ gọi API xóa
        console.log(`Xóa homestay ${homestayId}`);
        // Sau khi xóa thành công, cập nhật lại danh sách
        // fetchHomestays();
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
            key: 'id',
            align: 'center',
            render: (text) => <Text className="property-id">#{text}</Text>,
        },
        {
            title: 'Tên Homestay',
            dataIndex: 'property_name',
            key: 'property_name',
            render: (text, record) => (
                <div className="homestay-name-cell">
                    <div className="homestay-info">
                        <Text strong className="homestay-title">{text}</Text>
                        <Text type="secondary" className="homestay-subtitle">
                            <EnvironmentOutlined /> {record.address.substring(0, 30)}
                            {record.address.length > 30 ? '...' : ''}
                        </Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            responsive: ['lg'],
        },
        {
            title: 'Đơn/Cụm',
            dataIndex: 'structure_mode',
            key: 'structure_mode',
            align: 'center',
            render: (text) => (
                <Tag className="structure-tag">
                    {text}
                </Tag>
            ),
            responsive: ['md'],
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
                <Space size="small" className="action-buttons">
                    <Tooltip title="Quản lý">
                        <Button
                            type="primary"
                            icon={<EyeFilled />}
                            className="action-button view"
                            onClick={() => {
                                setSelectedHomestay(record);
                                navigate(`/homestay/${record.property_id}/dashboard`);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="primary"
                            icon={<EditFilled />}
                            className="action-button edit"
                            onClick={() => navigate(`/homestay/${record.property_id}/edit-homestay`)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="primary"
                            icon={<DeleteFilled />}
                            className="action-button delete"
                            onClick={() => handleDelete(record.property_id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    // Render card view cho homestay
    const renderHomestayCard = (homestay) => (
        <Col xs={24} sm={12} md={8} lg={6} key={homestay.property_id}>
            <Card
                hoverable
                className={`homestay-grid-card ${homestay.status}`}
                cover={
                    <div className="card-cover">
                        <div className="card-status-badge">
                            <Badge
                                status={homestay.status === 'active' ? 'success' : 'error'}
                                text={homestay.status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
                                className={`status-badge ${homestay.status}`}
                            />
                        </div>
                        <div className="card-avatar">
                            <Avatar
                                size={64}
                                icon={<HomeOutlined />}
                                className={`homestay-avatar-large ${homestay.status}`}
                            />
                        </div>
                    </div>
                }
            >
                <div className="card-content">
                    <Title level={5} ellipsis={{ rows: 1 }} className="card-title">
                        {homestay.property_name}
                    </Title>
                    <Text type="secondary" ellipsis={{ rows: 2 }} className="card-address">
                        <EnvironmentOutlined /> {homestay.address}
                    </Text>
                    <div className="card-footer">
                        <Tag className="structure-tag">{homestay.structure_mode}</Tag>
                        <Text className="property-id">#{homestay.property_id}</Text>
                    </div>

                    <div className="card-actions">
                        <Button
                            type="primary"
                            icon={<EyeFilled />}
                            className="card-action-button view"
                            onClick={() => {
                                setSelectedHomestay(homestay);
                                navigate(`/homestay/${homestay.property_id}/dashboard`);
                            }}
                        >
                        </Button>
                        <Button
                            type="primary"
                            icon={<EditFilled />}
                            className="card-action-button edit"
                            onClick={() => navigate(`/homestay/${homestay.property_id}/edit-homestay`)}
                        >
                        </Button>
                        <Button
                            type="primary"
                            icon={<DeleteFilled />}
                            className="card-action-button delete"
                            onClick={() => handleDelete(homestay.property_id)}
                        >
                        </Button>
                    </div>
                </div>
            </Card>
        </Col>
    );

    return (
        <div className="homestay-list-container">
            <div className="homestay-page-header">
                <div className="header-content">
                    <div className="header-title">
                        <Title level={3}>Danh sách Homestay</Title>
                        <Text type="secondary">Quản lý tất cả các homestay của bạn</Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        className="add-button"
                        onClick={() => navigate('/homestay/create')}
                    >
                        Thêm Homestay
                    </Button>
                </div>

                <Row gutter={[16, 16]} className="stats-row">
                    <Col xs={24} sm={8}>
                        <Card className="stat-card total">
                            <Statistic
                                title="Tổng số Homestay"
                                value={homestays.length}
                                prefix={<HomeOutlined />}
                                valueStyle={{ color: '#30B53E' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card className="stat-card active">
                            <Statistic
                                title="Đang hoạt động"
                                value={activeHomestays}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#52C41A' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card className="stat-card inactive">
                            <Statistic
                                title="Tạm ngưng"
                                value={inactiveHomestays}
                                prefix={<CloseCircleOutlined />}
                                valueStyle={{ color: '#FF4D4F' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <Card className="homestay-card" bordered={false}>
                <div className="toolbar">
                    <div className="toolbar-left">
                        <Segmented
                            options={[
                                {
                                    value: 'all',
                                    label: 'Tất cả',
                                },
                                {
                                    value: 'active',
                                    label: 'Đang hoạt động',
                                },
                                {
                                    value: 'inactive',
                                    label: 'Tạm ngưng',
                                },
                            ]}
                            value={filterStatus}
                            onChange={setFilterStatus}
                            className="filter-segment"
                        />

                        <Tooltip title="Làm mới dữ liệu">
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={fetchHomestays}
                                className="refresh-button"
                            />
                        </Tooltip>
                    </div>

                    <div className="toolbar-right">
                        <Search
                            placeholder="Tìm kiếm theo tên, địa chỉ..."
                            allowClear
                            enterButton={<SearchOutlined />}
                            size="middle"
                            onSearch={(value) => setSearchText(value)}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                        />

                        <Segmented
                            options={[
                                {
                                    value: 'table',
                                    icon: <UnorderedListOutlined />,
                                    tooltip: 'Xem dạng bảng',
                                },
                                {
                                    value: 'grid',
                                    icon: <AppstoreOutlined />,
                                    tooltip: 'Xem dạng lưới',
                                },
                            ]}
                            value={viewMode}
                            onChange={setViewMode}
                            className="view-mode-segment"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <Spin size="large" tip="Đang tải dữ liệu..." />
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <div>
                                    <Title level={5} className="error-title">Đã xảy ra lỗi</Title>
                                    <Text type="secondary">{error}</Text>
                                    <Button
                                        onClick={fetchHomestays}
                                        type="primary"
                                        style={{ marginTop: 16 }}
                                    >
                                        Thử lại
                                    </Button>
                                </div>
                            }
                        />
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="empty-container">
                        <Empty
                            image={<HomeOutlined style={{ fontSize: 64, color: '#30B53E' }} />}
                            description={
                                <div>
                                    <Title level={5}>Không tìm thấy homestay nào</Title>
                                    <Text type="secondary">
                                        {searchText
                                            ? 'Không có kết quả phù hợp với tìm kiếm của bạn'
                                            : 'Hãy thêm homestay đầu tiên của bạn'}
                                    </Text>
                                    {!searchText && (
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => navigate('/homestay/create')}
                                            style={{ marginTop: 16 }}
                                        >
                                            Thêm Homestay
                                        </Button>
                                    )}
                                </div>
                            }
                        />
                    </div>
                ) : viewMode === 'table' ? (
                    <div className="table-container">
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            rowKey="property_id"
                            pagination={{
                                pageSize: 10,
                                className: 'custom-pagination'
                            }}
                            className="custom-table"
                            rowClassName={(record) => `table-row-${record.status}`}
                        />
                    </div>
                ) : (
                    <div className="grid-container">
                        <Row gutter={[16, 16]}>
                            {filteredData.map(homestay => renderHomestayCard(homestay))}
                        </Row>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default HomestayList;