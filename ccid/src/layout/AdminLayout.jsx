import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/admin/dashboard')) return '1';
    if (path.startsWith('/admin/users')) return '2';
    if (path.startsWith('/admin/application')) return '3';
    if (path.startsWith('/admin/documents')) return '4';
    if (path.startsWith('/admin/settings')) return '5';
    return '1';
  };

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/admin/dashboard'),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Quản lý Thông Tin Tem CNLS',
      onClick: () => navigate('/admin/users'),
    },
    {
      key: '3',
      icon: <FileTextOutlined />,
      label: 'Quản lý Thông Tin Hồ Sơ ApplyCation',
      onClick: () => navigate('/admin/application'),
    },
    {
      key: '4',
      icon: <FileTextOutlined />,
      label: 'Quản lý Thông Tin Hồ Sơ Document',
      onClick: () => navigate('/admin/documents'),
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => navigate('/admin/settings'),
    },
  ];

  const userMenuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Thông tin tài khoản',
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: () => {
        localStorage.removeItem('token');
        navigate('/login');
      },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        style={{
          backgroundColor: '#001529',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
          maxHeight: '100vh',
          width: '280px',
        }}
      >
        <div className="logo">
          <h2 style={{ color: 'white', margin: 0, padding: '16px' }}>
            {collapsed ? 'AD' : 'ADMIN'}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{ marginTop: '20px' }}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 280,
          transition: 'margin-left 0.2s',
        }}
      >
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Avatar size="large" icon={<UserOutlined />} />
              <span>Admin User</span>
            </div>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            borderRadius: '4px',
            minHeight: 'calc(100vh - 112px)',
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
