import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/SideBar/Sidebar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { adminRoutes, ownerRoutes, commonRoutes } from './routes';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';

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
              </Routes>
            </AnimatePresence>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
