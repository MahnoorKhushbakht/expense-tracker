'use client';

import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
} from 'antd';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { motion } from 'framer-motion';
import { theme as antdTheme } from 'antd';
import { gray, yellow } from '@ant-design/colors';
import useTheme from "@/context/theme";
import 'react-datepicker/dist/react-datepicker.css';
import { addData } from '@/store/dataSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ExpenseForm() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error'
  });

  const { Option } = Select;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    amount: null,
    name: null,
    category: null,
    date: null,
  });

  const authStatus = useSelector((state) => state.auth.status);

  const resetFormfield = () => {
    setFormData({
      amount: null,
      name: null,
      category: null,
      date: null,
    });
  };

  const {
    token: { borderRadiusLG },
  } = antdTheme.useToken();

  const { theme: mode } = useTheme();
  const textColor = mode === 'dark' ? gray[1] : gray[8];
  const bgColor = mode === 'dark' ? '#141414' : '#ffffff';

  const handleSubmit = () => {
    if (!formData.amount || !formData.name || !formData.category || !formData.date) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields.',
        severity: 'error',
      });
      return;
    }

    const submissionPayload = {
      ...formData,
      date: formData.date?.toISOString(),
    };

    try {
      dispatch(addData({ data: submissionPayload }));
      setSnackbar({
        open: true,
        message: 'Data submitted successfully!',
        severity: 'success',
      });
      resetFormfield();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Submission failed. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <>
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      {authStatus ? (
        <div className="flex justify-center items-center flex-col md:flex-row w-full max-w-4xl mx-auto gap-2 md:gap-4 p-4">
          <Form layout="inline" variant="outlined" onFinish={handleSubmit}>
            {/* Category */}
            <div className="p-2">
              <Form.Item rules={[{ required: true }]}>
                <Select
                  value={formData.category ?? undefined}
                  onChange={(category) => setFormData(prev => ({ ...prev, category }))}
                  placeholder="Category"
                >
                  <Option value="Income">Income</Option>
                  <Option value="Expense">Expense</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Amount */}
            <div className="p-2">
              <Form.Item>
                <InputNumber
                  value={formData.amount ?? undefined}
                  onChange={(amount) => setFormData(prev => ({ ...prev, amount }))}
                  placeholder="Amount"
                  style={{ color: textColor }}
                />
              </Form.Item>
            </div>

            {/* Date */}
            <div className="p-2">
              <Form.Item>
                <DatePicker
                  value={formData.date ?? undefined}
                  onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                  placeholder="Date"
                  style={{ color: textColor }}
                />
              </Form.Item>
            </div>

            {/* Name */}
            <div className="p-2">
              <Form.Item>
                <Select
                  value={formData.name ?? undefined}
                  onChange={(name) => setFormData(prev => ({ ...prev, name }))}
                  placeholder="Name"
                  style={{ color: textColor }}
                >
                  <Option value="Housing">Housing</Option>
                  <Option value="Transportation">Transportation</Option>
                  <Option value="Groceries">Groceries & Food</Option>
                  <Option value="Utilities">Utilities</Option>
                  <Option value="Health">Health & Insurance</Option>
                  <Option value="Education">Education</Option>
                  <Option value="Family">Family & Kids</Option>
                  <Option value="Entertainment">Entertainment</Option>
                  <Option value="Work">Work & Business</Option>
                  <Option value="Debt">Debt Payments</Option>
                  <Option value="Personal Care">Personal Care</Option>
                  <Option value="Gifts">Gifts & Donations</Option>
                  <Option value="Miscellaneous">Miscellaneous</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Submit */}
            <div className="p-2">
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <motion.div
                  className="w-full"
                  initial={{ opacity: 1, scale: 1 }}
                  whileHover={{ opacity: 1.1, scale: 1.02 }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
                      color: mode === 'dark' ? yellow[1] : yellow[7],
                      border: mode === 'dark'
                        ? `1px solid ${yellow[5]}`
                        : `1px solid ${yellow[7]}`,
                    }}
                  >
                    Submit
                  </Button>
                </motion.div>
              </Form.Item>
            </div>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-svh max-w-full dark:bg-white bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-12 sm:size-24 mb-2 text-amber-500 dark:text-amber-300 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
            />
          </svg>

          <h1 className="text-xl md:text-3xl m-5 font-semibold text-center text-amber-400 dark:text-amber-300">
            Sign in to add expenses
          </h1>
          <p className="mt-4 text-center text-sm text-white/60 dark:text-black/60">
            Please log in to continue tracking your finances.
          </p>
        </div>
      )}
    </>
  );
}
