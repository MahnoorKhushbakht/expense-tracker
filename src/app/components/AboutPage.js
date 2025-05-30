import { Image } from 'antd';
import React from 'react'
export default function AboutPage(){
    return(
         <div className="p-10 max-w-full h-full text-white dark:text-black mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Expense Tracker</h1>
        <p className="text-lg mb-6">
          Welcome to our simple and powerful expense tracking application.
          Designed to help you manage your finances with ease, our goal is to
          make budgeting stress-free and effective.
        </p>
          <Image
    width={200}
    className='rounded-sm mb-6 shadow-black/50 shadow-sm'
    alt='Expense Tracker Image'
    src="/images/expensestracker.jpeg"
  />
        <p className="md:text-lg sm:text-base mt-6 mb-6">
          Managing your finances does not have to be overwhelming. This Expense Tracker is designed to help you take control of your spending with ease. Whether you are budgeting for the month, tracking daily expenses, or planning your savings, our simple and intuitive interface makes it easy to stay organized. Add your income and expenses, categorize your transactions, and visualize your financial health through real-time summaries. It is a tool built for everyone—from students managing pocket money to professionals keeping an eye on monthly budgets. Start tracking, stay informed, and make smarter financial decisions—one entry at a time.
        </p>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Built with ❤️ using Next.js, Tailwind CSS, and Redux.
        </p>
      </div>
    )
}