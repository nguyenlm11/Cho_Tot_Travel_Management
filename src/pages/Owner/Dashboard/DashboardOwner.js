import { Card, Col, Row, Statistic, Typography } from 'antd'
import './DashboardOwner.css'
import React from 'react'
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
} from "chart.js";
import { color } from 'chart.js/helpers';
import { MoneyCollectOutlined } from '@ant-design/icons';

// Đăng ký các component của Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

export default function DashboardOwner() {
    const { Title } = Typography;

    const labels = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Biểu đồ thống kê doanh thu và số lượng đơn",
                font: {
                    size: 30,
                    weight: "bold",
                },
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Số lượng đơn',
                    font: {
                        size: 14,
                        weight: 'bold',
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                    },
                    color: 'rgb(255, 99, 132)'
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: '500'
                    },
                    color: '#666',
                    padding: 10
                },
                border: {
                    color: '#e0e0e0'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Doanh thu (triệu VNĐ)',
                    font: {
                        size: 14,
                        weight: 'bold',
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                    },
                    color: 'rgb(53, 162, 235)'
                },
                grid: {
                    drawOnChartArea: false // chỉ vẽ lưới cho trục y bên trái
                },
            },
        }
    };

    // Dữ liệu mẫu cho biểu đồ
    const combinedData = {
        labels,
        datasets: [
            {
                label: "Số lượng đơn đặt phòng",
                data: [65, 59, 80, 81, 56, 55, 40, 45, 70, 85, 90, 100],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: 'y',
            },
            {
                label: "Doanh thu (triệu VNĐ)",
                data: [15, 12, 19, 17, 14, 13, 15, 16, 20, 22, 24, 25],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: 'y1',
            },
        ],
    };

    return (
        <div className='homestay-list-container'>
            <Title level={2} style={{ marginBottom: '50px', marginTop: '-2px' }}>Trang quản lý doanh thu</Title>
            <Row gutter={[16, 16]} className="stats-row">
                <Col xs={24} sm={8}>
                    <Card className="stat-card total">
                        <Statistic
                            title="Doanh thu một ngày"
                            // value={homestays.length}
                            value='1.000.000 VNĐ'
                            prefix={<MoneyCollectOutlined />}
                            valueStyle={{ color: '#30B53E' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="stat-card active">
                        <Statistic
                            title="Doanh thu một tháng"
                            // value={activeHomestays}
                            value='15.000.000 VNĐ'
                            prefix={<MoneyCollectOutlined />}
                            valueStyle={{ color: '#52C41A' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="stat-card inactive">
                        <Statistic
                            title="Doanh thu một năm"
                            // value={inactiveHomestays}
                            value='200.000.000 VNĐ'
                            prefix={<MoneyCollectOutlined />}
                            valueStyle={{ color: '#52C41A' }}
                        />
                    </Card>
                </Col>
            </Row>
            <div style={{ marginTop: '50px' }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card>
                            <Line options={options} data={combinedData} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
