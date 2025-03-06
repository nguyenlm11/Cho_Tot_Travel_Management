import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Button, Statistic, Divider, Tag, Form, Input, Upload, Select, Switch, Skeleton, Modal, message, Popconfirm } from 'antd';
import {
  EditOutlined, DeleteOutlined, PlusOutlined, EnvironmentOutlined, HomeOutlined, WifiOutlined, CarOutlined, CoffeeOutlined,
  CheckCircleOutlined, ClockCircleOutlined, SaveOutlined, StarOutlined, CalendarOutlined, BarChartOutlined,
  CheckOutlined, CloseOutlined, InfoCircleOutlined, DollarOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import './HomeStayDetail.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HomestayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [homestay, setHomestay] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [isAmenityModalVisible, setIsAmenityModalVisible] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  });
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [amenityForm] = Form.useForm();

  // Giả lập dữ liệu homestay
  useEffect(() => {
    // Giả lập loading
    setTimeout(() => {
      const mockHomestay = {
        id: '1',
        name: 'Green Valley Homestay',
        location: 'Đà Lạt, Lâm Đồng',
        status: 'active',
        rating: 4.8,
        reviewCount: 124,
        price: 1200000,
        discount: 15,
        description: 'Green Valley Homestay là một không gian nghỉ dưỡng yên bình nằm giữa thiên nhiên Đà Lạt. Với kiến trúc hiện đại pha lẫn nét truyền thống, homestay mang đến trải nghiệm lưu trú thoải mái và gần gũi với thiên nhiên. Từ ban công, bạn có thể ngắm nhìn toàn cảnh thung lũng xanh mát và những đồi thông bạt ngàn.',
        longDescription: 'Green Valley Homestay được thiết kế với phong cách hiện đại pha lẫn nét đặc trưng của vùng cao nguyên. Mỗi phòng đều được trang bị đầy đủ tiện nghi, với cửa sổ lớn đón ánh sáng tự nhiên và tầm nhìn ra khung cảnh thiên nhiên tuyệt đẹp.\n\nKhông gian chung của homestay bao gồm phòng khách rộng rãi với lò sưởi, khu vực ăn uống, và một khu vườn nhỏ xinh với nhiều loại hoa đặc trưng của Đà Lạt. Buổi sáng, bạn có thể thưởng thức bữa sáng tự làm trong căn bếp đầy đủ tiện nghi hoặc tận hưởng không khí trong lành trên ban công.\n\nGreen Valley Homestay nằm cách trung tâm thành phố Đà Lạt khoảng 5km, đủ xa để tránh sự ồn ào nhưng vẫn thuận tiện để khám phá các điểm du lịch nổi tiếng. Đặc biệt, homestay nằm gần các điểm tham quan như Thung lũng Tình Yêu, Đồi Robin và Thiền Viện Trúc Lâm.',
        roomTypes: 3,
        totalRooms: 8,
        availableRooms: 5,
        amenities: [
          { id: 1, icon: 'wifi', name: 'Wifi miễn phí', status: true },
          { id: 2, icon: 'car', name: 'Bãi đỗ xe', status: true },
          { id: 3, icon: 'coffee', name: 'Bữa sáng', status: true },
          { id: 4, icon: 'home', name: 'Ban công', status: true },
          { id: 5, icon: 'check-circle', name: 'Dọn phòng hàng ngày', status: true },
          { id: 6, icon: 'clock-circle', name: 'Nhận phòng 24/7', status: true }
        ],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ]
      };

      setHomestay(mockHomestay);
      setFileList(mockHomestay.images.map((url, index) => ({
        uid: `-${index + 1}`,
        name: `image-${index + 1}.jpg`,
        status: 'done',
        url: url,
      })));

      // Giả lập dữ liệu thống kê đặt phòng
      setBookingStats({
        total: 45,
        upcoming: 12,
        completed: 30,
        cancelled: 3
      });

      setLoading(false);
    }, 1500);
  }, [id]);

  const handleImagePreview = (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleImageChange = ({ fileList }) => setFileList(fileList);

  const handleSaveHomestay = (values) => {
    console.log('Saving homestay with values:', values);
    message.success('Đã lưu thông tin homestay thành công!');
    setEditMode(false);
  };

  const handleToggleStatus = () => {
    const newStatus = homestay.status === 'active' ? 'inactive' : 'active';
    setHomestay({ ...homestay, status: newStatus });
    message.success(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} homestay thành công!`);
  };

  const handleAddAmenity = () => {
    setEditingAmenity(null);
    amenityForm.resetFields();
    setIsAmenityModalVisible(true);
  };

  const handleEditAmenity = (amenity) => {
    setEditingAmenity(amenity);
    amenityForm.setFieldsValue(amenity);
    setIsAmenityModalVisible(true);
  };

  const handleDeleteAmenity = (amenityId) => {
    const updatedAmenities = homestay.amenities.filter(amenity => amenity.id !== amenityId);
    setHomestay({ ...homestay, amenities: updatedAmenities });
    message.success('Đã xóa tiện ích thành công!');
  };

  const handleAmenitySubmit = (values) => {
    if (editingAmenity) {
      // Cập nhật tiện ích hiện có
      const updatedAmenities = homestay.amenities.map(amenity =>
        amenity.id === editingAmenity.id ? { ...amenity, ...values } : amenity
      );
      setHomestay({ ...homestay, amenities: updatedAmenities });
      message.success('Đã cập nhật tiện ích thành công!');
    } else {
      // Thêm tiện ích mới
      const newAmenity = {
        id: Date.now(),
        ...values,
      };
      setHomestay({ ...homestay, amenities: [...homestay.amenities, newAmenity] });
      message.success('Đã thêm tiện ích mới thành công!');
    }
    setIsAmenityModalVisible(false);
  };

  // Render icon cho tiện ích
  const renderAmenityIcon = (iconName) => {
    const iconMap = {
      'wifi': <WifiOutlined />,
      'car': <CarOutlined />,
      'coffee': <CoffeeOutlined />,
      'home': <HomeOutlined />,
      'check-circle': <CheckCircleOutlined />,
      'clock-circle': <ClockCircleOutlined />,
    };

    return iconMap[iconName] || <InfoCircleOutlined />;
  };

  // Render skeleton loading
  if (loading) {
    return (
      <div className="homestay-detail-container">
        <div className="homestay-detail-content">
          <Skeleton active paragraph={{ rows: 1 }} />
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={6}>
              <Skeleton.Button active block style={{ height: 100 }} />
            </Col>
            <Col xs={24} lg={6}>
              <Skeleton.Button active block style={{ height: 100 }} />
            </Col>
            <Col xs={24} lg={6}>
              <Skeleton.Button active block style={{ height: 100 }} />
            </Col>
            <Col xs={24} lg={6}>
              <Skeleton.Button active block style={{ height: 100 }} />
            </Col>
          </Row>
          <div className="image-gallery-skeleton">
            <Skeleton.Image className="main-image-skeleton" />
            <div className="thumbnail-container-skeleton">
              {[...Array(4)].map((_, index) => (
                <Skeleton.Image key={index} className="thumbnail-skeleton" />
              ))}
            </div>
          </div>
          <Row gutter={24}>
            <Col xs={24}>
              <Skeleton active paragraph={{ rows: 6 }} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div className="homestay-detail-container owner-view">
      <div className="homestay-detail-content">
        {/* Breadcrumb và nút quay lại */}
        <div className="page-header">
          <div className="breadcrumb-container">
            <div className="homestay-header">
              <div>
                <Title level={2}>{homestay.name}</Title>
                <div className="location-rating">
                  <Text className="location">
                    <EnvironmentOutlined /> {homestay.location}
                  </Text>
                  <div className="rating">
                    <Tag color="blue">{homestay.roomTypes} loại phòng</Tag>
                    <Tag color="green">{homestay.amenities.length} tiện ích</Tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={homestay.status === 'active'}
              onChange={handleToggleStatus}
            />
            <Text className="status-text">
              {homestay.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
            </Text>
            <Button
              type={editMode ? "primary" : "default"}
              icon={editMode ? <SaveOutlined /> : <EditOutlined />}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Lưu thay đổi' : 'Chỉnh sửa'}
            </Button>
          </div>
        </div>

        {/* Thống kê */}
        <Row gutter={[24, 24]} className="stats-row">
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card total-bookings" onClick={() => navigate(`/homestay/${id}/bookings`)}>
              <Statistic
                title="Tổng đặt phòng"
                value={bookingStats.total}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card upcoming-bookings" onClick={() => navigate(`/homestay/${id}/bookings`)}>
              <Statistic
                title="Đặt phòng sắp tới"
                value={bookingStats.upcoming}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card room-stats" onClick={() => navigate(`/homestay/${id}/inventory`)}>
              <Statistic
                title="Phòng khả dụng"
                value={`${homestay.availableRooms}/${homestay.totalRooms}`}
                prefix={<HomeOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card revenue" onClick={() => navigate(`/homestay/${id}/reviews`)}>
              <Statistic
                title="Đánh giá"
                value={homestay.rating}
                suffix={`/5 (${homestay.reviewCount})`}
                precision={1}
                prefix={<StarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Thông tin chính */}
        {editMode ? (
          <Card className="edit-form-card">
            <Form
              form={form}
              layout="vertical"
              initialValues={homestay}
              onFinish={handleSaveHomestay}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Tên Homestay"
                    rules={[{ required: true, message: 'Vui lòng nhập tên homestay!' }]}
                  >
                    <Input placeholder="Nhập tên homestay" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="location"
                    label="Địa điểm"
                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
                  >
                    <Input placeholder="Nhập địa điểm" prefix={<EnvironmentOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="price"
                    label="Giá cơ bản (VNĐ)"
                    rules={[{ required: true, message: 'Vui lòng nhập giá cơ bản!' }]}
                  >
                    <Input type="number" placeholder="Nhập giá cơ bản" prefix={<DollarOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="discount"
                    label="Giảm giá (%)"
                  >
                    <Input type="number" placeholder="Nhập % giảm giá" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label="Mô tả ngắn"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn!' }]}
              >
                <TextArea rows={3} placeholder="Nhập mô tả ngắn về homestay" />
              </Form.Item>

              <Form.Item
                name="longDescription"
                label="Mô tả chi tiết"
              >
                <TextArea rows={6} placeholder="Nhập mô tả chi tiết về homestay" />
              </Form.Item>

              <Form.Item
                name="images"
                label="Hình ảnh"
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handleImagePreview}
                  onChange={handleImageChange}
                  beforeUpload={() => false}
                >
                  {fileList.length >= 8 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Lưu thay đổi
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() => setEditMode(false)}
                >
                  Hủy
                </Button>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          <Card className="info-card">
            <div className="image-gallery">
              <div className="main-image" onClick={() => handleImagePreview({ url: homestay.images[0] })}>
                <img src={homestay.images[0]} alt={homestay.name} />
              </div>
              <div className="thumbnail-container">
                {homestay.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="thumbnail"
                    onClick={() => handleImagePreview({ url: image })}
                  >
                    <img src={image} alt={`${homestay.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            <div className="homestay-description">
              <Paragraph>{homestay.description}</Paragraph>
              <Paragraph>{homestay.longDescription}</Paragraph>
            </div>

            <Divider />

            {/* Tiện ích */}
            <div className="amenities-section">
              <div className="section-header">
                <Title level={4}>Tiện ích homestay</Title>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddAmenity}
                >
                  Thêm tiện ích
                </Button>
              </div>
              <Row gutter={[16, 16]} className="amenities-list">
                {homestay.amenities.map(amenity => (
                  <Col xs={24} sm={12} md={8} lg={6} key={amenity.id}>
                    <Card className="amenity-card">
                      <div className="amenity-content">
                        <div className="amenity-icon">
                          {renderAmenityIcon(amenity.icon)}
                        </div>
                        <div className="amenity-info">
                          <Text strong>{amenity.name}</Text>
                          <Tag color={amenity.status ? 'green' : 'red'}>
                            {amenity.status ? 'Có sẵn' : 'Không có sẵn'}
                          </Tag>
                        </div>
                      </div>
                      <div className="amenity-actions">
                        <Button
                          type="text"
                          icon={<EditOutlined />}
                          onClick={() => handleEditAmenity(amenity)}
                        />
                        <Popconfirm
                          title="Bạn có chắc chắn muốn xóa tiện ích này?"
                          onConfirm={() => handleDeleteAmenity(amenity.id)}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button type="text" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            <Divider />

            <div className="quick-actions">
              <Title level={4}>Quản lý nhanh</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Button
                    type="primary"
                    icon={<HomeOutlined />}
                    block
                    onClick={() => navigate(`/homestay/${id}/inventory`)}
                  >
                    Quản lý phòng
                  </Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Button
                    type="primary"
                    icon={<StarOutlined />}
                    block
                    onClick={() => navigate(`/homestay/${id}/services`)}
                  >
                    Dịch vụ
                  </Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Button
                    type="primary"
                    icon={<CalendarOutlined />}
                    block
                    onClick={() => navigate(`/homestay/${id}/bookings`)}
                  >
                    Đặt phòng
                  </Button>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Button
                    type="primary"
                    icon={<StarOutlined />}
                    block
                    onClick={() => navigate(`/homestay/${id}/reviews`)}
                  >
                    Đánh giá
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        )}
      </div>

      {/* Modal xem ảnh */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
        className="image-preview-modal"
      >
        <img alt="Homestay preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      {/* Modal thêm/sửa tiện ích */}
      <Modal
        title={editingAmenity ? "Chỉnh sửa tiện ích" : "Thêm tiện ích mới"}
        open={isAmenityModalVisible}
        onCancel={() => setIsAmenityModalVisible(false)}
        footer={null}
      >
        <Form
          form={amenityForm}
          layout="vertical"
          onFinish={handleAmenitySubmit}
        >
          <Form.Item
            name="name"
            label="Tên tiện ích"
            rules={[{ required: true, message: 'Vui lòng nhập tên tiện ích!' }]}
          >
            <Input placeholder="Nhập tên tiện ích" />
          </Form.Item>

          <Form.Item
            name="icon"
            label="Icon"
            rules={[{ required: true, message: 'Vui lòng chọn icon!' }]}
          >
            <Select placeholder="Chọn icon">
              <Option value="wifi">Wifi</Option>
              <Option value="car">Bãi đỗ xe</Option>
              <Option value="coffee">Đồ ăn/Thức uống</Option>
              <Option value="home">Tiện nghi nhà ở</Option>
              <Option value="check-circle">Dịch vụ</Option>
              <Option value="clock-circle">Thời gian</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            valuePropName="checked"
          >
            <Switch checkedChildren="Có sẵn" unCheckedChildren="Không có sẵn" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingAmenity ? "Cập nhật" : "Thêm mới"}
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => setIsAmenityModalVisible(false)}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomestayDetail;      