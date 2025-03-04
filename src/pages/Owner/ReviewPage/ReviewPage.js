import React, { useState, useEffect } from 'react';
import { Card, Rate, Typography, Image, Spin, Pagination, Avatar } from 'antd';
import dayjs from 'dayjs';
import './ReviewPage.css';

const { Title, Text, Paragraph } = Typography;

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStars, setSelectedStars] = useState(null);
    const reviewsPerPage = 5;

    useEffect(() => {
        setTimeout(() => {
            const sampleReviews = [
                {
                    id: 1,
                    reviewerName: 'anietran59',
                    reviewContent: 'Phòng ở sạch sẽ, dịch vụ tốt. Mình rất hài lòng với trải nghiệm ở đây!',
                    reviewImages: [
                        'https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg',
                        'https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg',
                    ],
                    reviewTime: '2025-02-17T22:07:00Z',
                    reviewStars: 5,
                },
                {
                    id: 2,
                    reviewerName: 'yourname901',
                    reviewContent: 'Dịch vụ tuyệt vời, nhân viên thân thiện, rất đáng tiền. Không gian yên tĩnh và thoải mái, đáng để quay lại.',
                    reviewImages: [
                        'https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg',
                    ],
                    reviewTime: '2024-12-14T12:16:00Z',
                    reviewStars: 5,
                },
                {
                    id: 3,
                    reviewerName: 'khanguyenhoang034',
                    reviewContent: 'Nhà nghỉ hơi ồn vào ban đêm, nhưng vị trí rất thuận tiện. Cần cải thiện cách âm và dịch vụ dọn phòng.',
                    reviewImages: [],
                    reviewTime: '2024-12-01T20:47:00Z',
                    reviewStars: 4,
                },
                {
                    id: 4,
                    reviewerName: 'thangwinnie',
                    reviewContent: 'Nhà nghỉ hơi ồn vào ban đêm. Cần cải thiện cách âm và dịch vụ dọn phòng.',
                    reviewImages: [],
                    reviewTime: '2024-12-01T20:47:00Z',
                    reviewStars: 1,
                },
            ];
            setReviews(sampleReviews);
            setLoading(false);
        }, 1000);
    }, []);

    const calculateRatingSummary = () => {
        const totalReviews = reviews.length;
        const starCounts = reviews.reduce((acc, review) => {
            acc[review.reviewStars] = (acc[review.reviewStars] || 0) + 1;
            return acc;
        }, {});

        const averageRating = totalReviews
            ? reviews.reduce((sum, review) => sum + review.reviewStars, 0) / totalReviews
            : 0;

        return { average: averageRating.toFixed(1), counts: starCounts };
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

    return (
        <div className="review-container">
            <Card className="review-summary">
                <div className="summary-header">
                    <Title level={3} style={{ margin: 0 }}>Đánh giá của khách hàng</Title>
                </div>
                <div className="summary-rating">
                    <Rate disabled value={parseFloat(ratingSummary.average)} allowHalf />
                    <Text strong className="summary-average">{ratingSummary.average} / 5</Text>
                    <Text type="secondary">({reviews.length} đánh giá)</Text>
                </div>
                <div className="summary-filters">
                    <Text
                        className={`filter-item ${selectedStars === null ? 'active' : ''}`}
                        onClick={() => handleStarFilter(null)}
                    >
                        Tất cả ({reviews.length})
                    </Text>
                    {Array.from({ length: 5 }, (_, i) => 5 - i).map((stars) => (
                        <Text
                            key={stars}
                            className={`filter-item ${selectedStars === stars ? 'active' : ''}`}
                            onClick={() => handleStarFilter(stars)}
                        >
                            {stars} sao ({ratingSummary.counts[stars] || 0})
                        </Text>
                    ))}
                </div>
            </Card>

            <Spin spinning={loading} className="loading-spinner">
                <div className="review-list">
                    {currentReviews.length > 0 ? (
                        currentReviews.map((item) => (
                            <Card key={item.id} className="review-card">
                                <div className="review-header">
                                    <Avatar size={48} style={{ backgroundColor: '#30B53E' }}>
                                        {item.reviewerName.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div className="review-info">
                                        <Text strong>{item.reviewerName}</Text>
                                        <div className="review-meta">
                                            <Rate disabled value={item.reviewStars} />
                                            <Text type="secondary">
                                                {dayjs(item.reviewTime).format('DD/MM/YYYY HH:mm')}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph className="review-content">{item.reviewContent}</Paragraph>
                                {item.reviewImages.length > 0 && (
                                    <div className="review-images">
                                        {item.reviewImages.map((img, index) => (
                                            <Image
                                                key={index}
                                                width={80}
                                                height={80}
                                                src={img}
                                                preview
                                            />
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))
                    ) : (
                        <Text type="secondary" className="no-reviews">Không có đánh giá nào với số sao này</Text>
                    )}
                    <Pagination
                        current={currentPage}
                        total={filteredReviews.length}
                        pageSize={reviewsPerPage}
                        onChange={handlePageChange}
                    />
                </div>
            </Spin>
        </div>
    );
};

export default Review;