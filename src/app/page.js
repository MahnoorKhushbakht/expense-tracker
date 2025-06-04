'use client';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import CardCarousel from './components/CardCarousel';
import ExpenseNavigator from './components/ExpenseNavigator';
import History from './components/History';
import Card from './components/Card';
import DataChart from './components/Chart';
import DashboardLayout from './components/DashboardLayout';

export default function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const LoginReminder = () => (
    <div className="flex flex-col items-center justify-center h-full max-w-full mx-auto bg-white rounded-2xl dark:bg-black p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 text-amber-600 dark:text-amber-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
      <p className="mt-4 text-center text-sm text-black/50 dark:text-white/50">
        Please log in to continue tracking your finances.
      </p>
    </div>
  );

  return (
      <main>
        {/* Desktop / Tablet View */}
        <div className="hidden md:block max-w-full h-svh">
          <DashboardLayout>
            <div className="text-left mb-6">
              <h1 className="text-white dark:text-black text-2xl font-semibold">
                Dashboard Overview
              </h1>
              <p className="text-sm text-white dark:text-black">
                Monitor your recent activity and stats.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
              <Card />
            </div>

            <div className="mt-10">
              <h2 className="text-white dark:text-black text-2xl font-semibold mb-2">
                Data Overview
              </h2>
              <p className="text-white dark:text-black mb-6">
                Visualize trends and review recent activity through the interactive chart and history log below.
              </p>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                  {authStatus ? <DataChart /> : <LoginReminder />}
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <History />
                </div>
              </div>
            </div>
          </DashboardLayout>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden dark:bg-white dark:text-black bg-black text-white max-w-full h-svh">
          <Header />
          <div className="text-left mt-2 mx-5">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            <p className="text-sm text-white/70 dark:text-black/70">
              Monitor your recent activity and stats.
            </p>
          </div>

          <div className="mx-5">
            <CardCarousel />
            <h2 className="text-2xl font-semibold mb-2 text-white dark:text-black">Data Overview</h2>
            <p className="text-sm text-white/70 dark:text-black/70">
              View the history of your transactions and financial trends over time.
            </p>
            <History />
            <div className='mt-5'>
            {authStatus ? <DataChart /> : <LoginReminder />}
            </div>
            <ExpenseNavigator />
          </div>
          <Footer />
        </div>
      </main>
  );
}
