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
    const reviewsPerPage = 3;

    useEffect(() => {
        setTimeout(() => {
            const sampleReviews = [
                {
                    id: 1,
                    reviewerName: 'anietran59',
                    reviewContent: 'Phòng ở sạch sẽ, dịch vụ tốt. Mình rất hài lòng với trải nghiệm ở đây!',
                    reviewImages: [
                        'https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg',
                        'https://via.placeholder.com/150',
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
            ];
            setReviews(sampleReviews);
            setLoading(false);
        }, 1000);
    }, []);

    // Tính toán tổng số sao và số lượng đánh giá theo từng sao
    const calculateRatingSummary = () => {
        const totalReviews = reviews.length;
        const starCounts = reviews.reduce((acc, review) => {
            acc[review.reviewStars] = (acc[review.reviewStars] || 0) + 1;
            return acc;
        }, {});

        const averageRating = totalReviews
            ? reviews.reduce((sum, review) => sum + review.reviewStars, 0) / totalReviews
            : 0;

        return {
            average: averageRating.toFixed(1),
            counts: starCounts,
        };
    };

    const ratingSummary = calculateRatingSummary();

    // Lọc review dựa trên số sao được chọn
    const filteredReviews = selectedStars === null
        ? reviews
        : reviews.filter(review => review.reviewStars === selectedStars);

    // Phân trang
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleStarFilter = (stars) => {
        setSelectedStars(stars === selectedStars ? null : stars); // Nhấp lại để quay về "Tất Cả"
        setCurrentPage(1); // Reset về trang 1 khi thay đổi filter
    };

    return (
        <div className="review-container">
            <div className="review-summary">
                <div className="summary-header">
                    <Rate disabled value={5} className="summary-rate" />
                    <Title level={4} className="summary-average">
                        {ratingSummary.average} trên 5
                    </Title>
                </div>
                <div className="summary-details">
                    <div className="summary-breakdown">
                        <Text
                            className={`summary-label ${selectedStars === null ? 'active' : ''}`}
                            onClick={() => handleStarFilter(null)}
                            style={{ cursor: 'pointer' }}
                        >
                            Tất Cả
                        </Text>
                        {Array.from({ length: 5 }, (_, i) => 5 - i).map((stars) => (
                            <div
                                key={stars}
                                className={`summary-star-count ${selectedStars === stars ? 'active' : ''}`}
                                onClick={() => handleStarFilter(stars)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Text>{stars} Sao</Text>
                                <Text className="summary-count">
                                    ({ratingSummary.counts[stars] || 0})
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <Spin size="large" tip="Đang tải đánh giá..." />
                </div>
            ) : (
                <div className="review-list">
                    {currentReviews.length > 0 ? (
                        currentReviews.map((item) => (
                            <Card key={item.id} className="review-card">
                                <div className="review-header">
                                    <Avatar size={40} className="review-avatar">
                                        {item.reviewerName.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div className="review-info">
                                        <Title level={5} className="review-name">
                                            {item.reviewerName}
                                        </Title>
                                        <div className="review-meta">
                                            <Rate disabled value={item.reviewStars} className="review-rate" />
                                            <Text className="review-time">
                                                {dayjs(item.reviewTime).format('YYYY-MM-DD HH:mm')}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                                <Paragraph className="review-content">
                                    {item.reviewContent}
                                </Paragraph>
                                {item.reviewImages && item.reviewImages.length > 0 && (
                                    <div className="review-images">
                                        {item.reviewImages.map((img, index) => (
                                            <Image
                                                key={index}
                                                width={100}
                                                height={100}
                                                src={img}
                                                className="review-image"
                                                preview
                                            />
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))
                    ) : (
                        <Text className="no-reviews">Không có đánh giá nào với số sao này</Text>
                    )}
                    <Pagination
                        current={currentPage}
                        total={filteredReviews.length}
                        pageSize={reviewsPerPage}
                        onChange={handlePageChange}
                        className="review-pagination"
                    />
                </div>
            )}
        </div>
    );
};

export default Review;