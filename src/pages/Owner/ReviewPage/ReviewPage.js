import React, { useState, useEffect } from 'react';
import {
    Card, Rate, Typography, Image, Spin, Pagination, Avatar, Row, Col, Progress,
    Empty, Badge, Tooltip, Button, Divider, Tag
} from 'antd';
import { StarFilled, CalendarOutlined, UserOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './ReviewPage.css';

dayjs.extend(relativeTime);
const { Title, Text, Paragraph } = Typography;

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStars, setSelectedStars] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const reviewsPerPage = 5;

    const fetchReviews = () => {
        setLoading(true);
        setTimeout(() => {
            const sampleReviews = [
                {
                    id: 1,
                    reviewerName: 'anietran59',
                    reviewerAvatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
                    reviewContent: 'Phòng ở sạch sẽ, dịch vụ tốt. Mình rất hài lòng với trải nghiệm ở đây! Không gian yên tĩnh, thoáng mát và đầy đủ tiện nghi. Chủ nhà rất thân thiện và nhiệt tình hỗ trợ.',
                    reviewImages: [
                        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                    ],
                    reviewTime: '2025-02-17T22:07:00Z',
                    reviewStars: 5,
                    likes: 12,
                    dislikes: 0,
                    stayDuration: '3 ngày',
                    roomType: 'Phòng Deluxe',
                    tags: ['Sạch sẽ', 'Thân thiện', 'Tiện nghi']
                },
                {
                    id: 2,
                    reviewerName: 'yourname901',
                    reviewerAvatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
                    reviewContent: 'Dịch vụ tuyệt vời, nhân viên thân thiện, rất đáng tiền. Không gian yên tĩnh và thoải mái, đáng để quay lại. Vị trí thuận tiện để di chuyển đến các điểm tham quan.',
                    reviewImages: [
                        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                    ],
                    reviewTime: '2024-12-14T12:16:00Z',
                    reviewStars: 5,
                    likes: 8,
                    dislikes: 1,
                    stayDuration: '5 ngày',
                    roomType: 'Phòng Suite',
                    tags: ['Giá trị', 'Vị trí tốt', 'Dịch vụ tốt']
                },
                {
                    id: 3,
                    reviewerName: 'khanguyenhoang034',
                    reviewerAvatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
                    reviewContent: 'Nhà nghỉ hơi ồn vào ban đêm, nhưng vị trí rất thuận tiện. Cần cải thiện cách âm và dịch vụ dọn phòng. Tuy nhiên, nhân viên rất nhiệt tình và giúp đỡ khi có vấn đề.',
                    reviewImages: [],
                    reviewTime: '2024-12-01T20:47:00Z',
                    reviewStars: 4,
                    likes: 3,
                    dislikes: 0,
                    stayDuration: '2 ngày',
                    roomType: 'Phòng Standard',
                    tags: ['Vị trí tốt', 'Ồn ào', 'Nhân viên tốt']
                },
                {
                    id: 4,
                    reviewerName: 'thangwinnie',
                    reviewerAvatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
                    reviewContent: 'Nhà nghỉ hơi ồn vào ban đêm. Cần cải thiện cách âm và dịch vụ dọn phòng. Phòng nhỏ hơn so với hình ảnh trên website. Không hài lòng với trải nghiệm này.',
                    reviewImages: [
                        'https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                    ],
                    reviewTime: '2024-12-01T20:47:00Z',
                    reviewStars: 1,
                    likes: 1,
                    dislikes: 5,
                    stayDuration: '1 ngày',
                    roomType: 'Phòng Standard',
                    tags: ['Ồn ào', 'Không sạch sẽ', 'Không như mô tả']
                },
                {
                    id: 5,
                    reviewerName: 'minhthu123',
                    reviewerAvatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
                    reviewContent: 'Trải nghiệm tuyệt vời! Phòng rộng rãi, sạch sẽ và đầy đủ tiện nghi. Nhân viên rất thân thiện và nhiệt tình. Vị trí thuận tiện để đi lại.',
                    reviewImages: [
                        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbSUyMHZpZXd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsJTIwcm9vbSUyMHZpZXd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                    ],
                    reviewTime: '2024-11-15T10:30:00Z',
                    reviewStars: 5,
                    likes: 15,
                    dislikes: 0,
                    stayDuration: '4 ngày',
                    roomType: 'Phòng Deluxe',
                    tags: ['Sạch sẽ', 'Thân thiện', 'Tiện nghi', 'Vị trí tốt']
                },
                {
                    id: 6,
                    reviewerName: 'ducnguyen87',
                    reviewerAvatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
                    reviewContent: 'Phòng ốc tạm được, nhưng dịch vụ chưa tốt lắm. Nhân viên không nhiệt tình hỗ trợ khi có vấn đề với điều hòa.',
                    reviewImages: [],
                    reviewTime: '2024-11-05T18:20:00Z',
                    reviewStars: 3,
                    likes: 2,
                    dislikes: 1,
                    stayDuration: '2 ngày',
                    roomType: 'Phòng Standard',
                    tags: ['Dịch vụ kém', 'Giá cao']
                },
            ];
            setReviews(sampleReviews);
            setLoading(false);
            setRefreshing(false);
        }, 1000);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchReviews();
    };

    const calculateRatingSummary = () => {
        const totalReviews = reviews.length;
        if (totalReviews === 0) return { average: 0, counts: {}, percentages: {} };

        const starCounts = reviews.reduce((acc, review) => {
            acc[review.reviewStars] = (acc[review.reviewStars] || 0) + 1;
            return acc;
        }, {});

        const averageRating = reviews.reduce((sum, review) => sum + review.reviewStars, 0) / totalReviews;

        // Calculate percentages for each star rating
        const percentages = {};
        for (let i = 1; i <= 5; i++) {
            percentages[i] = ((starCounts[i] || 0) / totalReviews) * 100;
        }

        return {
            average: averageRating.toFixed(1),
            counts: starCounts,
            percentages: percentages
        };
    };

    const ratingSummary = calculateRatingSummary();

    const filteredReviews = selectedStars === null
        ? reviews
        : reviews.filter(review => review.reviewStars === selectedStars);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleStarFilter = (stars) => {
        setSelectedStars(stars === selectedStars ? null : stars);
        setCurrentPage(1);
    };

    const getStarColor = (stars) => {
        if (stars >= 4) return '#52c41a'; // Green for good ratings
        if (stars >= 3) return '#faad14'; // Yellow for average ratings
        return '#f5222d'; // Red for poor ratings
    };

    const getReviewTimeDisplay = (timeString) => {
        const reviewTime = dayjs(timeString);
        const now = dayjs();

        // If less than 30 days, show relative time
        if (now.diff(reviewTime, 'day') < 30) {
            return reviewTime.fromNow();
        }

        // Otherwise show formatted date
        return reviewTime.format('DD/MM/YYYY');
    };

    return (
        <div className="review-container">
            <div className="review-header-section">
                <Title level={2}>Đánh giá của khách hàng</Title>
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={handleRefresh}
                    loading={refreshing}
                    className="refresh-button"
                >
                    Làm mới
                </Button>
            </div>

            <Row gutter={[24, 24]} className="review-dashboard">
                <Col xs={24} md={8}>
                    <Card className="rating-overview-card">
                        <div className="rating-overview">
                            <div className="rating-big-number">
                                <span className="rating-value">{ratingSummary.average}</span>
                                <span className="rating-max">/5</span>
                            </div>
                            <Rate disabled value={parseFloat(ratingSummary.average)} allowHalf className="big-rate" />
                            <Text className="total-reviews">Dựa trên {reviews.length} đánh giá</Text>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Card className="rating-distribution-card">
                        <Title level={4}>Phân bố đánh giá</Title>
                        <div className="rating-bars">
                            {[5, 4, 3, 2, 1].map(stars => (
                                <div
                                    key={stars}
                                    className={`rating-bar-item ${selectedStars === stars ? 'selected' : ''}`}
                                    onClick={() => handleStarFilter(stars)}
                                >
                                    <div className="rating-bar-label">
                                        <StarFilled style={{ color: getStarColor(stars) }} />
                                        <span>{stars}</span>
                                    </div>
                                    <Progress
                                        percent={ratingSummary.percentages[stars] || 0}
                                        showInfo={false}
                                        strokeColor={getStarColor(stars)}
                                        className="rating-progress"
                                    />
                                    <div className="rating-bar-count">
                                        {ratingSummary.counts[stars] || 0}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="filter-actions">
                            <Button
                                type={selectedStars === null ? "primary" : "default"}
                                onClick={() => handleStarFilter(null)}
                                icon={<FilterOutlined />}
                                className="filter-button"
                            >
                                Tất cả đánh giá
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Divider orientation="left">
                <span className="divider-title">
                    {selectedStars ? `Đánh giá ${selectedStars} sao (${filteredReviews.length})` : `Tất cả đánh giá (${reviews.length})`}
                </span>
            </Divider>

            <Spin spinning={loading} tip="Đang tải đánh giá..." className="loading-spinner">
                <div className="review-list">
                    {currentReviews.length > 0 ? (
                        currentReviews.map((item) => (
                            <Card key={item.id} className="review-card" hoverable>
                                <div className="review-header">
                                    <Avatar
                                        size={64}
                                        src={item.reviewerAvatar}
                                        icon={!item.reviewerAvatar && <UserOutlined />}
                                        className="reviewer-avatar"
                                    />
                                    <div className="review-info">
                                        <Text strong className="reviewer-name">{item.reviewerName}</Text>
                                        <div className="review-meta">
                                            <Rate
                                                disabled
                                                value={item.reviewStars}
                                                className="review-stars"
                                            />
                                            <Badge
                                                count={item.reviewStars}
                                                style={{
                                                    backgroundColor: getStarColor(item.reviewStars),
                                                    marginRight: '8px'
                                                }}
                                            />
                                            <Tooltip title={dayjs(item.reviewTime).format('DD/MM/YYYY HH:mm')}>
                                                <Text type="secondary" className="review-time">
                                                    <CalendarOutlined /> {getReviewTimeDisplay(item.reviewTime)}
                                                </Text>
                                            </Tooltip>
                                        </div>
                                        <div className="stay-info">
                                            <Tag color="blue">{item.roomType}</Tag>
                                            <Tag color="purple">{item.stayDuration}</Tag>
                                        </div>
                                    </div>
                                </div>

                                <Paragraph className="review-content">{item.reviewContent}</Paragraph>

                                <div className="review-tags">
                                    {item.tags && item.tags.map((tag, index) => (
                                        <Tag key={index} color={tag.includes('không') ? 'red' : 'green'}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </div>

                                {item.reviewImages && item.reviewImages.length > 0 && (
                                    <div className="review-images">
                                        {item.reviewImages.map((img, index) => (
                                            <Image
                                                key={index}
                                                width={120}
                                                height={120}
                                                src={img}
                                                alt={`Review image ${index + 1}`}
                                                preview={{
                                                    mask: <div className="image-preview-mask">Xem</div>
                                                }}
                                                className="review-image"
                                            />
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))
                    ) : (
                        <Empty
                            description={
                                <span>Không có đánh giá nào {selectedStars ? `với ${selectedStars} sao` : ''}</span>
                            }
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            className="empty-reviews"
                        />
                    )}

                    {filteredReviews.length > reviewsPerPage && (
                        <Pagination
                            current={currentPage}
                            total={filteredReviews.length}
                            pageSize={reviewsPerPage}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            className="review-pagination"
                        />
                    )}
                </div>
            </Spin>
        </div>
    );
};

export default Review;