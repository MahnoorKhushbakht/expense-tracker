'use client';

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/context/theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardCarousel from "./components/CardCarousel";
import ExpenseNavigator from "./components/ExpenseNavigator";
import History from "./components/History";
import { useSelector } from "react-redux";
import Card from "./components/Card";
import DataChart from "./components/Chart";
import DashboardLayout from "./components/DashboardLayout";

export default function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const [theme, setTheme] = useState("dark");

  const lightTheme = () => {
    localStorage.theme = "light";
    setTheme("light");
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  };

  const darkTheme = () => {
    localStorage.theme = "dark";
    setTheme("dark");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  };

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);



  // ✅ Authenticated dashboard view
  return (
    <ThemeProvider value={{ theme, lightTheme, darkTheme }}>
      <main>
        {/* Large and Medium Screens */}
        <div className="hidden md:block">
          <DashboardLayout>
            <div className="text-left mb-6">
              <h1 className="text-white dark:text-black text-2xl font-semibold">Dashboard Overview</h1>
              <p className="text-sm text-white dark:text-black">
                Monitor your recent activity and stats.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
              <Card />
            </div>
            <div className="mt-10">
              <h2 className="text-white dark:text-black text-2xl font-semibold mb-2">Data Overview</h2>
              <p className="text-white dark:text-black mb-6">
                Visualize trends and review recent activity through the interactive chart and history log below.
              </p>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                  <DataChart />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <History />
                </div>
              </div>
            </div>
          </DashboardLayout>
        </div>

        {/* Small Screens */}
        <div className="block md:hidden space-y-6">
          <Header />
          <div className="text-left mb-6">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Monitor your recent activity and stats.
            </p>
          </div>
          <CardCarousel />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            View the history of your transactions and financial trends over time.
          </p>
          <History />
          <ExpenseNavigator />
          <Footer />
        </div>
      </main>
    </ThemeProvider>
  );
}



 
//       {/* <Cursor
//   color="#d97706"
//   opacity={0.2}
//   size={30}
//   zIndex={-1}
// /> */}



