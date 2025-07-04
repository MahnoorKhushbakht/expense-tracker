import { useDispatch, useSelector } from "react-redux";
import SignInForm from "./SignInForm";
import { signOutUser } from '@/config/auth';
import { logoutUser } from "@/store/authSlice";
import { Button, Flex,theme as antdTheme} from 'antd';
import { yellow } from "@ant-design/colors";
import React, { useState } from "react";
import useTheme from "@/context/theme";
import {motion} from 'motion/react'
import { AnimatePresence } from 'motion/react';

export default function UserStatus(){
  const [open, setOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const { theme:mode } = useTheme();
  const dispatch = useDispatch();
    const {
      token: { borderRadiusLG},
    } = antdTheme.useToken();

  const handleSignOut = () => {
    dispatch(logoutUser());
    signOutUser();
  };
    return(
    <>
<Flex
    vertical
    align="center"
    justify="center"
 style={{
    padding: '0px', // remove marginTop and paddingBottom
  }}
  >
    {authStatus ? (
           <div className="w-full flex justify-center">
  <motion.div
    className="w-full"
    initial={{ opacity: 1, scale: 1 }}
    whileHover={{ opacity: 1.1, scale: 1.02 }}
  >
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
        width: '100%',
      }}
    >
      LogOut
    </Button>
  </motion.div>
</div>

    ) : (
      <motion.div
      initial={{ opacity: 1, scale:1 }}
      whileHover={{ opacity:1.1, scale:1.1,boxShadow:10}}
      >
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
          width: '100%',
        }}
      >
        LogIn
      </Button>
      </motion.div>
    )}
  </Flex>

  {open && (
    <AnimatePresence>
    <motion.div 
    initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg shadow-xl">
        <motion.button
                    whileHover= {
                      {
                        type: "spring",
                        scale: 1.001
                      }
                    }
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
        </motion.button>
        <SignInForm />
      </div>
    </motion.div>
    </AnimatePresence>
  )}
  </>
    )
}