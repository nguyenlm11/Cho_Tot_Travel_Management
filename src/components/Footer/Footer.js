import React from 'react';
import { Layout } from 'antd';
import './Footer.css';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="copyright">
            © {currentYear} Homestay Management. All rights reserved.
          </span>
        </div>
        <div className="footer-right">
          <a href="/privacy">Chính sách bảo mật</a>
          <a href="/terms">Điều khoản sử dụng</a>
          <a href="/contact">Liên hệ</a>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer; 