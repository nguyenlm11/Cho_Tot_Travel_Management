import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/SideBar/Sidebar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { adminRoutes, ownerRoutes, commonRoutes } from './routes';
import './App.css';

const { Content } = Layout;

function App() {
  const userRole = 'owner'; // hoặc 'admin'

  return (
    <Router>
      <Layout hasSider>
        <Sidebar userRole={userRole} />
        <Layout>
          <Header userRole={userRole} />
          <Content className='main-content'>
            <Routes>
              {/* Common routes */}
              {commonRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    typeof route.element === 'function'
                      ? route.element({ userRole })
                      : route.element
                  }
                />
              ))}

              {/* Role-specific routes */}
              {userRole === 'admin'
                ? adminRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))
                : ownerRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))
              }
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
