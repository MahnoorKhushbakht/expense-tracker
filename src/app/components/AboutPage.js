'use client'
import { Image } from 'antd';
import {motion} from 'motion/react'
import React from 'react'
export default function AboutPage(){
  // const paragraphText = `Managing your finances does not have to be overwhelming. This Expense Tracker is designed to help you take control of your spending with ease. Whether you are budgeting for the month, tracking daily expenses, or planning your savings, our simple and intuitive interface makes it easy to stay organized. Add your income and expenses, categorize your transactions, and visualize your financial health through real-time summaries. It is a tool built for everyone—from students managing pocket money to professionals keeping an eye on monthly budgets. Start tracking, stay informed, and make smarter financial decisions—one entry at a time.`;
    return(
         <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
         className="p-10 max-w-full h-full text-white dark:text-black mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 cursor-pointer">About Our Expense Tracker</h1>
        <motion.p
        whileHover={{ opacity:0.5,scale:1.01 }} 
        className="text-lg mb-6 cursor-pointer">
          Welcome to our simple and powerful expense tracking application.
          Designed to help you manage your finances with ease, our goal is to
          make budgeting stress-free and effective.
        </motion.p>
          <Image
    width={200}
    className='rounded-sm mb-6 shadow-black/50 shadow-sm'
    alt='Expense Tracker Image'
    src="/images/expensestracker.jpeg"
  />
        <motion.p whileHover={{ opacity:0.5,scale:1.01 }}  className="cursor-pointer md:text-lg sm:text-base mt-6 mb-6">
          Managing your finances does not have to be overwhelming. This Expense Tracker is designed to help you take control of your spending with ease. Whether you are budgeting for the month, tracking daily expenses, or planning your savings, our simple and intuitive interface makes it easy to stay organized. Add your income and expenses, categorize your transactions, and visualize your financial health through real-time summaries. It is a tool built for everyone—from students managing pocket money to professionals keeping an eye on monthly budgets. Start tracking, stay informed, and make smarter financial decisions—one entry at a time.
        </motion.p>
        
        <p className="cursor-pointer mt-8 text-sm text-gray-500 dark:text-gray-400">
          Built with ❤️ using Next.js, Tailwind CSS, and Redux.
        </p>
      </motion.div>
    )
}