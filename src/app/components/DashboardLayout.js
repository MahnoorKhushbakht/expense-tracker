"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import useTheme from "@/context/theme";
import { yellow, gray } from "@ant-design/colors";
import { PieChartOutlined, HomeOutlined,PicRightOutlined } from "@ant-design/icons";
import { Layout, Menu, theme as antdTheme } from "antd";
import UserStatus from "./UserStatus";
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
  getItem(<Link href="/">Home</Link>, "1", <HomeOutlined />),
  getItem(
    <Link href="/expense-tracker">Calculate Expense</Link>,
    "2",
    <PieChartOutlined />
  ),
    getItem(
    <Link href="/about">About</Link>,
    "3",
   <PicRightOutlined />
  ),

      getItem(
    <Link href="/contact">Contact</Link>,
    "4",
   <PicRightOutlined />
  ),

  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Calculate Expense', '1', <TrackerForm/>),
];

export default function DashboardLayout({ children }) {
  const { theme: mode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG},
  } = antdTheme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxWidth: "100vw",
        zIndex: 1000,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <Sider
        style={{ backgroundColor: mode === "dark" ? yellow[4] : yellow[7] }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />


        <h2
          style={{
            textAlign: "center",
            color: mode === "dark" ? "#000000" : "#ffffff",
            margin: "16px 0",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Menu
        </h2>

        <Menu
          style={{
            backgroundColor: mode === "dark" ? yellow[4] : yellow[7],
            color: mode === "dark" ? "#000000" : "#ffffff",
          }}
          // defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />

        <div style={{ flexGrow: 1 }} />
        <UserStatus/>
      </Sider>

      <Layout>
        <Content style={{ margin: "0 0" }}>
          <Header />
          {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              color: mode === "dark" ? "#ffffff" : "#000000",
              backgroundColor: mode === "dark" ? "#ffffff" : gray[9],
            }}
          >
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
