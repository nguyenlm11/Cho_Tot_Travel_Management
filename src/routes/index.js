import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import ServiceList from '../pages/Owner/ServiceList/ServiceList';
import HomestayList from '../pages/Owner/HomeStayList/HomestayList';
import CustomerList from '../pages/Owner/CustomerList/CustomerList';
import Inventory from '../pages/Owner/Inventory/Inventory';
import Setting from '../pages/Owner/SettingPage/Setting';
import Review from '../pages/Owner/ReviewPage/ReviewPage';
import Voucher from '../pages/Owner/Voucher/Voucher';
import HomestayDetail from '../pages/Owner/HomeStayDetail/HomestayDetail';
import Login from '../pages/Auth/Login';

// Auth routes
const authRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <div>Đăng ký</div>,
    },
    {
        path: '/forgot-password',
        element: <div>Quên mật khẩu</div>,
    },
];

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
    {
        path: '/homestays',
        element: <HomestayList />,
    },
    {
        path: '/homestay/new',
        element: <div>Thêm Homestay mới</div>,
    },
    {
        path: '/homestay/:id/dashboard',
        element: <HomestayDetail />,
    },
    {
        path: '/homestay/:id/inventory',
        element: <Inventory />,
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
        path: '/homestay/:id/vouchers',
        element: <Voucher />,
    },
    {
        path: '/homestay/:id/reviews',
        element: <Review />,
    },
    {
        path: '/homestay/:id/settings',
        element: <Setting />
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
    {
        path: '/profile',
        element: <div>Thông tin cá nhân</div>,
    },
];

export { authRoutes, adminRoutes, ownerRoutes, commonRoutes };