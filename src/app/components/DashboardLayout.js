'use client'
import React, { useState } from 'react';
import History from "./History";
import Card from "./Card";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import SignInForm from "./SignInForm";
import { signOutUser } from '@/config/auth';
import { logoutUser } from "@/store/authSlice";
import DataChart from "./Chart";
import Header from "./Header";
import Footer from "./Footer";
import useTheme from "@/context/theme";
import { yellow,gray } from '@ant-design/colors';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Breadcrumb,Button, Flex, Layout, Menu ,theme as antdTheme} from 'antd';
import TrackerForm from './TrackerForm';
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
    getItem(
  <Link href="/">Home</Link>,
  '1',
  <HomeOutlined />
),
getItem(
  <Link href="/expense-tracker">Calculate Expense</Link>,
  '2',
  <PieChartOutlined />
),

  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Calculate Expense', '1', <TrackerForm/>),
];



export default function DashboardLayout({children}) {
  const [open, setOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();


  const handleSignOut = () => {
    dispatch(logoutUser());
    signOutUser();
  };
   const { theme:mode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = antdTheme.useToken();
  return (
    <Layout style={{ minHeight: '100vh',maxWidth:'100vw',zIndex:1000,boxShadow:'0 0 10px rgba(0,0,0,0.5)'}}>
      <Sider
  style={{ backgroundColor: mode === 'dark' ? yellow[4] : yellow[7] }}
  collapsible
  collapsed={collapsed}
  onCollapse={(value) => setCollapsed(value)}
  
>
  <div className="demo-logo-vertical" />
  
  {/* MENU HEADING */}
  <h2
    style={{
      textAlign: 'center',
      color: mode === 'dark' ? '#000000' : '#ffffff',
      margin: '16px 0',
      fontWeight: 'bold',
      fontSize: '18px',
    }}
  >
    Menu
  </h2>

  {/* MENU ITEMS */}
  <Menu
    style={{
      backgroundColor: mode === 'dark' ? yellow[4] :yellow[7],
      color: mode === 'dark' ? '#000000' : '#ffffff',
    }}
    // defaultSelectedKeys={['1']}
    mode="inline"
    items={items}
  />

  {/* Spacer to push the button to bottom */}
  <div style={{ flexGrow: 1 }} />

  {/* CENTERED LOGIN/LOGOUT BUTTON */}
  <Flex
    vertical
    align="center"
    justify="center"
    style={{
      marginTop: 'auto',
      paddingBottom: '20px',
    }}
  >
    {authStatus ? (
      <Button
        onClick={handleSignOut}
        type="primary"
        size="large"
        style={{
          backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
          color: mode === 'dark' ? yellow[1] : yellow[7],
          border: mode === 'dark'
            ? `1px solid ${yellow[5]}`
            : `1px solid ${yellow[7]}`,
          borderRadius: borderRadiusLG,
          width: '80%',
        }}
      >
        LogOut
      </Button>
    ) : (
      <Button
        onClick={() => setOpen(true)}
        type="primary"
        size="large"
        style={{
          backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
          color: mode === 'dark' ? yellow[1] : yellow[7],
          border: mode === 'dark'
            ? `1px solid ${yellow[5]}`
            : `1px solid ${yellow[7]}`,
          borderRadius: borderRadiusLG,
          width: '80%',
        }}
      >
        LogIn
      </Button>
    )}
  </Flex>

  {/* Login modal */}
  {open && (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg shadow-xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-black dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <SignInForm />
      </div>
    </div>
  )}
</Sider>

      <Layout>
        <Content  style={{ margin: '0 0' }}>
            <Header/>
          {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
          <div
          
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              color:mode === 'dark'? '#ffffff' : '#000000',
              backgroundColor:mode === 'dark'? '#ffffff' : gray[9]
            }}
          >
           {children}

          </div>
        </Content>
        <Footer/>
      </Layout>
    </Layout>
  );
};
