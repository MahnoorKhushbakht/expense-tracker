import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined,PieChartOutlined, HomeOutlined,PicRightOutlined,ContactsOutlined } from "@ant-design/icons";
import { Layout, Menu, theme as antdTheme } from "antd";
import Link from "next/link";
import UserStatus from "./UserStatus";
import useTheme from "@/context/theme";
import { yellow, gray } from "@ant-design/colors";

const DrawerBtn = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
   <ContactsOutlined />
  ),
]
const { theme: mode } = useTheme();

  return (

    <>
      <div onClick={showDrawer}>
       <MenuOutlined />
      </div>
      <Drawer
        title="Menu"
                  style={{
            backgroundColor: mode === "dark" ? yellow[4] : yellow[7],
            color: mode === "dark" ? "#000000" : "#ffffff",
          }}
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
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
        {/* <UserStatus/> */}
      </Drawer>
    </>
  );
};
export default DrawerBtn;