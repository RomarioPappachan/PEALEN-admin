// "use client";
// import { useState, useEffect } from "react";
// function Navbar() {

//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDark]);

//   return (
//     <div className='ps-[50px] pe-[74px] pt-[42px] pb-[22px] flex justify-between items-center border-b-[1px] border-b-[#dcdce3] '>
//       <h1 className='text-[24px] font-bold'>Dashboard</h1>
//       <div className='flex'>
//       <div className='w-[388px] h-[47px] flex items-center bg-white rounded-[49px] px-[18px] space-x-[11px]'>
//         <img src="search-icon.svg" alt="search" className='size-[11px]' />
//       <input
//        type="search"
//        placeholder='Search'
//        className='w-full outline-none placeholder:text-[#B1B1B1] rounded-[49px] bg-white '
//        />

//       </div>

//       <button className='ms-[25px] me-[11px]'>
//         <img src="dark-mode.svg" alt="button" className='' onClick={() => setIsDark(!isDark)} />
//        </button>
//        <div className='flex items-center gap-x-3'>
//         <img src="/Avatar.svg" alt="" />
//         <span className='text-[16px] text-[#121721] dark:text-white'>Jenny Peter</span>
//         <img src="/down-arrow.svg" alt=""  className='pt-1'/>
//        </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

"use client";
import { useState, useEffect } from "react";

import { LuSearch, LuSun, LuMoon } from "react-icons/lu";

function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // Load the theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="ps-[50px] pe-[74px] pt-[42px] pb-[22px] flex justify-between items-center border-b border-b-[var(--background-secondary)] dark:border-b-[var(--background-secondary)] bg-[var(--background-primary)] dark:bg-[var(--background-primary)] text-[var(--foreground)]  dark:text-[var(--foreground)] transition-all duration-300">
      <h1 className="text-[24px] font-bold text-[var(--text-color-primary)] dark:text-[var(--text-color-primary)]">
        Dashboard
      </h1>

      <div className="flex items-center">
        {/* Search Bar */}
        <div className="w-[388px] h-[47px] flex items-center bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] rounded-[49px] px-[18px] space-x-[11px]">
          {/* <img src="/search-icon.svg" alt="search" className="size-[11px]" /> */}
          <LuSearch className="text-2xl text-blue-500" />
          <input
            type="search"
            placeholder="Search"
            className="w-full outline-none placeholder:text-[#B1B1B1] dark:placeholder:text-gray-400 bg-transparent text-[var(--text-color-primary)] dark:text-[var(--text-color-primary)]"
          />
        </div>

        {/* Dark Mode Toggle Button (No Change) */}
        <button
          className={`ms-[25px] me-[11px] size-12 cursor-pointer flex justify-center items-center rounded-full bg-[var(--background-secondary)]`}
          onClick={toggleDarkMode}
        >
          {/* <img
            src="/dark-mode.svg"
            alt="Toggle Theme"
            className="w-[42px] h-[42px] cursor-pointer"
          /> */}
          {isDark ? (
            <LuSun className="text-2xl" />
          ) : (
            <LuMoon className="text-2xl" />
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-x-3">
          <img src="/Avatar.svg" alt="User Avatar" />
          <span className="text-[16px] text-[#121721]">Jenny Peter</span>
          <img src="/down-arrow.svg" alt="dropdown" className="pt-1" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
