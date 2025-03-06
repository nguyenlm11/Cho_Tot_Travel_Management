import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, notification } from 'antd';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Xóa thông tin đăng nhập
    setTimeout(() => {
      localStorage.removeItem('userRole');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      
      notification.success({
        message: 'Đăng xuất thành công',
        description: 'Bạn đã đăng xuất khỏi hệ thống.',
        placement: 'topRight',
        duration: 3
      });
      
      // Chuyển hướng về trang đăng nhập
      navigate('/login', { replace: true });
    }, 1000);
  }, [navigate]);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <Spin size="large" />
      <div>Đang đăng xuất...</div>
    </div>
  );
};

export default Logout; 