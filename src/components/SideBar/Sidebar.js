import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, HomeOutlined, DollarOutlined, SettingOutlined, TeamOutlined, BankOutlined, ShopOutlined, KeyOutlined, CalendarOutlined, StarOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isManagingHomestay, setIsManagingHomestay] = useState(false);
  const [selectedHomestayId, setSelectedHomestayId] = useState(null);
  const [openKeys, setOpenKeys] = useState(['']);

  useEffect(() => {
    const match = location.pathname.match(/\/homestay\/([^\/]+)/);
    if (match) {
      setSelectedHomestayId(match[1]);
      setIsManagingHomestay(
        location.pathname.includes('/dashboard') ||
        location.pathname.includes('/room') ||
        location.pathname.includes('/services') ||
        location.pathname.includes('/booking') ||
        location.pathname.includes('/customers') ||
        location.pathname.includes('/revenue')
      );
    } else {
      setSelectedHomestayId(null);
      setIsManagingHomestay(false);
    }
  }, [location]);

  // Menu cho Admin
  const adminMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'Quản lý người dùng',
      children: [
        {
          key: 'homestay-owners',
          label: 'Chủ homestay',
          onClick: () => navigate('/users/homestay-owners')
        },
        {
          key: 'customers',
          label: 'Khách hàng',
          onClick: () => navigate('/users/customers')
        }
      ]
    },
    {
      key: 'homestays',
      icon: <BankOutlined />,
      label: 'Quản lý Homestay',
      children: [
        {
          key: 'all-homestays',
          label: 'Danh sách Homestay',
          onClick: () => navigate('/homestays/all')
        },
        {
          key: 'pending-homestays',
          label: 'Chờ phê duyệt',
          onClick: () => navigate('/homestays/pending')
        },
        {
          key: 'reported-homestays',
          label: 'Báo cáo vi phạm',
          onClick: () => navigate('/homestays/reported')
        }
      ]
    },
    {
      key: 'revenue',
      icon: <DollarOutlined />,
      label: 'Doanh thu',
      children: [
        {
          key: 'revenue-overview',
          label: 'Tổng quan doanh thu',
          onClick: () => navigate('/revenue/overview')
        },
        {
          key: 'transaction-history',
          label: 'Lịch sử giao dịch',
          onClick: () => navigate('/revenue/transactions')
        },
        {
          key: 'commission-settings',
          label: 'Cài đặt hoa hồng',
          onClick: () => navigate('/revenue/commission')
        }
      ]
    },
    {
      key: 'system',
      icon: <SettingOutlined />,
      label: 'Hệ thống',
      children: [
        {
          key: 'system-settings',
          label: 'Cài đặt hệ thống',
          onClick: () => navigate('/system/settings')
        },
        {
          key: 'security',
          label: 'Bảo mật',
          onClick: () => navigate('/system/security')
        },
        {
          key: 'logs',
          label: 'Nhật ký hệ thống',
          onClick: () => navigate('/system/logs')
        }
      ]
    }
  ];

  // Menu mặc định cho Owner
  const defaultOwnerMenuItems = [
    {
      key: 'homestays',
      icon: <HomeOutlined />,
      label: 'Danh sách Homestay',
      onClick: () => navigate('/homestays')
    },
    {
      key: 'add-homestay',
      icon: <PlusOutlined />,
      label: 'Thêm Homestay mới',
      onClick: () => navigate('/homestay/new')
    }
  ];

  // Menu quản lý homestay cho Owner
  const homestayManagementMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/dashboard`),
    },
    {
      key: 'rooms',
      icon: <KeyOutlined />,
      label: 'Quản lý phòng',
      children: [
        {
          key: 'room-list',
          label: 'Danh sách phòng',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/rooms`),
        },
        {
          key: 'room-types',
          label: 'Loại phòng',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/room-types`),
        }
      ]
    },
    {
      key: 'services',
      icon: <ShopOutlined />,
      label: 'Dịch vụ',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/services`),
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: 'Đặt phòng',
      children: [
        {
          key: 'booking-list',
          label: 'Danh sách đặt phòng',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/bookings`),
        },
        {
          key: 'booking-calendar',
          label: 'Lịch đặt phòng',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/booking-calendar`),
        }
      ]
    },
    {
      key: 'customers',
      icon: <TeamOutlined />,
      label: 'Khách hàng',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/customers`),
    },
    {
      key: 'revenue',
      icon: <DollarOutlined />,
      label: 'Doanh thu',
      children: [
        {
          key: 'revenue-overview',
          label: 'Tổng quan doanh thu',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/revenue`),
        },
        {
          key: 'revenue-reports',
          label: 'Báo cáo chi tiết',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/revenue-reports`),
        }
      ]
    },
    {
      key: 'feedback',
      icon: <StarOutlined />,
      label: 'Đánh giá & Phản hồi',
      children: [
        {
          key: 'reviews',
          label: 'Đánh giá',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/reviews`),
        },
        {
          key: 'issues',
          label: 'Vấn đề báo cáo',
          onClick: () => navigate(`/homestay/${selectedHomestayId}/issues`),
        }
      ]
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/settings`),
    }
  ];

  // Chọn menu items dựa vào role và trạng thái quản lý homestay
  let menuItems;
  if (userRole === 'admin') {
    menuItems = adminMenuItems;
  } else {
    menuItems = isManagingHomestay ? homestayManagementMenuItems : defaultOwnerMenuItems;
  }

  // Xử lý khi mở/đóng submenu
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => {
        setCollapsed(value);
        if (value) {
          setOpenKeys([]);
        }
      }}
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      width={280}
    >
      <div className="logo-container">
        {isManagingHomestay && !collapsed && userRole === 'owner' && (
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/homestays')}
            className="back-button"
          />
        )}
        {!collapsed && (
          <Title level={4} className="logo-text">
            Chỗ Tốt Travel
          </Title>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname.split('/')[2] || 'homestays']}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
        className="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar; 