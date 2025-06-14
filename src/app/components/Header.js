'use client';

import useTheme from "@/context/theme";
import UserStatus from "./UserStatus";
import DrawerBtn from "./Drawer";

function Header() {
  const { theme, darkTheme, lightTheme } = useTheme();

  return (
    <header className=" w-full dark:bg-black dark:text-white bg-white text-black shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="md:hidden lg:hidden sm:flex">
          <DrawerBtn/>
          </div>
          <span className="text-xl font-bold dark:text-white text-black">
            Expense Tracker
          </span>
        </div>

        {/* Right Side: UserStatus + Theme Toggle */}
        <div className="flex items-center justify-center gap-4">
        <UserStatus/>
          {/* Theme Toggle Button */}
          <button
            onClick={theme === "dark" ? lightTheme : darkTheme}
            className="text-xl"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
