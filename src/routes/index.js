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
import DashboardOwner from '../pages/Owner/Dashboard/DashboardOwner';
import Register from '../pages/Auth/Register';

// Auth routes
const authRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forgot-password',
        element: <div>Quên mật khẩu</div>,
    },
];

// Routes cho Admin
const adminRoutes = [
    {
        path: '/admin/users/owners',
        element: <div>Quản lý chủ homestay</div>, // Quản lý chủ nhà nghỉ
    },
    {
        path: '/admin/users/customers',
        element: <div>Quản lý khách hàng</div>, // Quản lý khách hàng
    },
    {
        path: '/admin/homestays/all',
        element: <div>Tất cả nhà nghỉ</div>, // Tất cả nhà nghỉ
    },
    {
        path: '/admin/homestays/verify',
        element: <div>Xác nhận nhà nghỉ</div>, // Xác nhận nhà nghỉ
    },
    {
        path: '/admin/revenue/total',
        element: <div>Tổng doanh thu</div>, // Tổng doanh thu
    },
    {
        path: '/admin/revenue/commission',
        element: <div>Quản lý hoa hồng</div>, // Quản lý hoa hồng
    },
    {
        path: '/admin/settings',
        element: <div>Cài đặt hệ thống</div>, // Cài đặt hệ thống
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
    {
        path: '/dashboardOwner',
        element: <DashboardOwner />,
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