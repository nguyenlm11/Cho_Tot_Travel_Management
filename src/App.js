import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Sidebar from './components/SideBar/Sidebar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { adminRoutes, ownerRoutes, commonRoutes } from './routes';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';

// Auth components
import Login from './pages/Auth/Login';
import Logout from './pages/Auth/Logout';

const { Content } = Layout;

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'guest');
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    // Lắng nghe sự thay đổi trong localStorage
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole') || 'guest');
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    // Kiểm tra khi component được mount
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#30B53E',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout hasSider>
                  <Sidebar userRole={userRole} />
                  <Layout>
                    <Header userRole={userRole} />
                    <Content className='main-content'>
                      <AnimatePresence mode="wait">
                        <Routes>
                          {/* Common routes */}
                          {commonRoutes.map((route) => (
                            <Route
                              key={route.path}
                              path={route.path}
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {typeof route.element === 'function'
                                    ? route.element({ userRole })
                                    : route.element}
                                </motion.div>
                              }
                            />
                          ))}

                          {/* Role-specific routes */}
                          {userRole === 'admin'
                            ? adminRoutes.map((route) => (
                              <Route
                                key={route.path}
                                path={route.path}
                                element={
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {route.element}
                                  </motion.div>
                                }
                              />
                            ))
                            : ownerRoutes.map((route) => (
                              <Route
                                key={route.path}
                                path={route.path}
                                element={
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {route.element}
                                  </motion.div>
                                }
                              />
                            ))
                          }

                          {/* Default route */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </AnimatePresence>
                    </Content>
                    <Footer />
                  </Layout>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
