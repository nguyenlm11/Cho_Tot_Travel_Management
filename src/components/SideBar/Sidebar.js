import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppstoreFilled, GiftFilled, KeyOutlined, PlusOutlined, ArrowLeftOutlined, StarFilled, SettingFilled,
  HomeFilled, IdcardFilled, BookFilled, ShoppingFilled, BankFilled,
  BankOutlined, UserOutlined, TeamOutlined, CheckCircleOutlined, DollarOutlined
} from '@ant-design/icons';
import { HomestayContext } from '../../contexts/HomestayContext';
import './Sidebar.css';

const siderStyle = {
  overflow: 'auto',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedHomestay, setSelectedHomestay } = useContext(HomestayContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isManagingHomestay, setIsManagingHomestay] = useState(false);
  const [selectedHomestayId, setSelectedHomestayId] = useState(null);
  const [openKeys, setOpenKeys] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const FETCH_COOLDOWN = 5000;

  useEffect(() => {
    const fetchHomestayData = async (id) => {
      const now = Date.now();
      if (now - lastFetchTime < FETCH_COOLDOWN) {
        return;
      }

      try {
        const response = await fetch(`https://653d1d13f52310ee6a99e3b7.mockapi.io/homestay/${id}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setSelectedHomestay(data);
        setLastFetchTime(now);
      } catch (error) {
        console.error('Error fetching homestay data:', error.message);
        setSelectedHomestay(null);
      }
    };

    if (location.pathname === '/homestays') {
      setSelectedHomestayId(null);
      setIsManagingHomestay(false);
      return;
    }

    const match = location.pathname.match(/\/homestay\/([^\/]+)/);
    if (match) {
      const id = match[1];
      if (id === 'new') {
        setSelectedHomestayId(null);
        setIsManagingHomestay(false);
      } else {
        setSelectedHomestayId(id);
        setIsManagingHomestay(true);
        if (!selectedHomestay || selectedHomestay.property_id !== id) {
          fetchHomestayData(id);
        }
      }
    } else {
      setSelectedHomestayId(null);
      setIsManagingHomestay(false);
    }
  }, [location.pathname, selectedHomestay, setSelectedHomestay]);

  const defaultOwnerMenuItems = [
    {
      key: 'homestays',
      icon: <HomeFilled />,
      label: 'Danh sách Homestay',
      onClick: () => navigate('/homestays'),
    },
    {
      key: 'dashboard',
      icon: <BankOutlined />,
      label: 'Quản lý doanh thu',
      onClick: () => navigate('/dashboardOwner'),
    },
    {
      key: 'add-homestay',
      icon: <PlusOutlined />,
      label: 'Thêm Homestay mới',
      onClick: () => navigate('/homestay/new'),
    },
  ];

  const homestayManagementMenuItems = [
    {
      key: 'dashboard',
      icon: <AppstoreFilled />,
      label: 'Tổng quan',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/dashboard`),
    },
    selectedHomestay?.structure_mode === 'cluster'
      ? {
        key: 'sub-homestays',
        icon: <BankFilled />,
        label: 'Sub-Homestays',
        onClick: () => navigate(`/homestay/${selectedHomestayId}/sub-homestays`),
      }
      : null,
    selectedHomestay?.rental_mode === 'room'
      ? {
        key: 'inventory',
        icon: <KeyOutlined />,
        label: 'Loại Phòng',
        onClick: () => navigate(`/homestay/${selectedHomestayId}/inventory`),
      }
      : null,
    {
      key: 'services',
      icon: <ShoppingFilled />,
      label: 'Dịch vụ',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/services`),
    },
    {
      key: 'bookings',
      icon: <BookFilled />,
      label: 'Đặt chỗ',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/bookings`),
    },
    {
      key: 'customers',
      icon: <IdcardFilled />,
      label: 'Khách hàng',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/customers`),
    },
    {
      key: 'voucher',
      icon: <GiftFilled />,
      label: 'Voucher & Khuyến mãi',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/vouchers`),
    },
    {
      key: 'reviews',
      icon: <StarFilled />,
      label: 'Đánh giá',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/reviews`),
    },
    {
      key: 'settings',
      icon: <SettingFilled />,
      label: 'Cài đặt Homestay',
      onClick: () => navigate(`/homestay/${selectedHomestayId}/settings`),
    },
    {
      key: 'back-to-list',
      icon: <ArrowLeftOutlined />,
      label: 'Quay lại danh sách',
      onClick: () => {
        setCollapsed(false);
        setOpenKeys([]);
        setSelectedHomestay(null);
        navigate('/homestays');
      },
    },
  ].filter(item => item);

  const adminMenuItems = [
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'Quản lý người dùng',
      children: [
        {
          key: 'homestay-owners',
          icon: <UserOutlined />,
          label: 'Chủ nhà nghỉ',
          onClick: () => navigate('/admin/users/owners'),
        },
        {
          key: 'customers',
          icon: <IdcardFilled />,
          label: 'Khách hàng',
          onClick: () => navigate('/admin/users/customers'),
        },
      ],
    },
    {
      key: 'homestays',
      icon: <HomeFilled />,
      label: 'Quản lý nhà nghỉ',
      children: [
        {
          key: 'all-homestays',
          icon: <BankFilled />,
          label: 'Tất cả nhà nghỉ',
          onClick: () => navigate('/admin/homestays/all'),
        },
        {
          key: 'verify-homestays',
          icon: <CheckCircleOutlined />,
          label: 'Xác nhận nhà nghỉ',
          onClick: () => navigate('/admin/homestays/verify'),
        },
      ],
    },
    {
      key: 'revenue',
      icon: <DollarOutlined />,
      label: 'Quản lý doanh thu',
      children: [
        {
          key: 'total-revenue',
          icon: <BankOutlined />,
          label: 'Tổng doanh thu',
          onClick: () => navigate('/admin/revenue/total'),
        },
        {
          key: 'commission',
          icon: <DollarOutlined />,
          label: 'Quản lý hoa hồng',
          onClick: () => navigate('/admin/revenue/commission'),
        },
      ],
    },
    {
      key: 'settings',
      icon: <SettingFilled />,
      label: 'Cài đặt hệ thống',
      onClick: () => navigate('/admin/settings'),
    },
  ];

  const menuItems = userRole === 'admin'
    ? adminMenuItems
    : isManagingHomestay
      ? homestayManagementMenuItems
      : defaultOwnerMenuItems;

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Sider
      style={siderStyle}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => {
        setCollapsed(value);
        if (value) setOpenKeys([]);
      }}
      width={280}
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
    >
      <div className="logo-container">
        {!collapsed && (
          <Title level={4} className="logo-text">Chỗ Tốt Travel</Title>
        )}
      </div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
        className="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar;