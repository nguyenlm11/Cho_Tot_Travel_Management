import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import ServiceList from '../pages/Owner/ServiceList/ServiceList';
import HomestayList from '../pages/Owner/HomeStayList/HomestayList';
import RoomList from '../pages/Owner/RoomList/RoomList';
import CustomerList from '../pages/Owner/CustomerList/CustomerList';

// Routes cho Admin
const adminRoutes = [
    {
        path: '/customers',
        element: <div>Quản lý khách hàng</div>,
    },
    {
        path: '/homestay-owners',
        element: <div>Quản lý chủ homestay</div>,
    },
    {
        path: '/transaction-fees',
        element: <div>Phí giao dịch</div>,
    },
    {
        path: '/revenue-reports',
        element: <div>Báo cáo doanh thu</div>,
    },
    {
        path: '/system-status',
        element: <div>Trạng thái hệ thống</div>,
    },
    {
        path: '/reported-issues',
        element: <div>Vấn đề báo cáo</div>,
    },
];

// Routes cho Owner
const ownerRoutes = [
    // Routes cho danh sách và thêm mới homestay
    {
        path: '/homestays',
        element: <HomestayList />,
    },
    {
        path: '/homestay/new',
        element: <div>Thêm Homestay mới</div>,
    },

    // Routes cho quản lý một homestay cụ thể
    {
        path: '/homestay/:id/dashboard',
        element: <div>Tổng quan Homestay</div>,
    },
    {
        path: '/homestay/:id/rooms',
        element: <RoomList />,
    },
    {
        path: '/homestay/:id/room-types',
        element: <div>Loại phòng</div>,
    },
    {
        path: '/homestay/:id/services',
        element: <ServiceList />,
    },
    {
        path: '/homestay/:id/bookings',
        element: <div>Danh sách đặt phòng</div>,
    },
    {
        path: '/homestay/:id/customers',
        element: <CustomerList />,
    },
    {
        path: '/homestay/:id/revenue',
        element: <div>Tổng quan doanh thu</div>,
    },
    {
        path: '/homestay/:id/revenue-reports',
        element: <div>Báo cáo doanh thu chi tiết</div>,
    },
    {
        path: '/homestay/:id/reviews',
        element: <div>Đánh giá</div>,
    },
    {
        path: '/homestay/:id/issues',
        element: <div>Vấn đề báo cáo</div>,
    },
    {
        path: '/homestay/:id/settings',
        element: <div>Cài đặt Homestay</div>,
    },
];

// Routes chung
const commonRoutes = [
    {
        path: '/',
        element: ({ userRole }) => {
            // Redirect dựa theo role
            if (userRole === 'admin') {
                return <Navigate to="/dashboard" replace />;
            }
            return <Navigate to="/homestays" replace />;
        }
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/settings',
        element: <div>Cài đặt tài khoản</div>,
    },
];

export { adminRoutes, ownerRoutes, commonRoutes }; 