// import Link from 'next/link'
// import React from 'react'

// function Sidebar() {
//   return (
//     <div className='min-h-screen h-full bg-[var(--sidebar-bg-color)] text-[var(--foreground)] dark:bg-[var(--sidebar-bg-color)] dark:text-[var(--foreground)] border-r-[1px] border-r-[#dcdce3] dark:border-r-gray-700 transition-all duration-300'>
//      <div className='w-full flex flex-col items-center justify-center pt-[33px]'>
//      <img src="/pealenLogo.svg" alt="logo" className='w-[116px]' />
//      <h2 className='text-[14px]  text-[#5D5D5D] pt-2'>Make home green</h2>
//      <div className='w-full flex flex-col gap-y-[22px]'>
//       <div className='flex items-center pt-[60px] ps-[50px] gap-x-2'>
//         <img src="/dashboard.svg" alt="" />
//         <h1 className='text-[14px] text-[#9E9E9E]'>Dashboard</h1>

//       </div>
//       <Link href={"/dashboard/courses"}>
//       <div className='flex items-center pt-[60px] ps-[50px] gap-x-2'>
//         <img src="/dashboard.svg" alt="" />
//         <h1 className='text-[14px] text-[#9E9E9E]'>Courses</h1>

//       </div>
//       </Link>
//       <div className='flex items-center pt-[60px] ps-[50px] gap-x-2'>
//         <img src="/dashboard.svg" alt="" />
//         <h1 className='text-[14px] text-[#9E9E9E]'>Dashboard</h1>

//       </div>
//      </div>
//      </div>
//     </div>
//   )
// }

// export default Sidebar

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuFiles } from "react-icons/lu";

function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "/dashboard.svg" },
    { name: "Courses", path: "/dashboard/courses", icon: "/dashboard.svg" },
  ];

  return (
    <div className="w-full min-h-screen h-full bg-[var(--background-tertiary)] dark:bg-[var(--background-tertiary)] text-[var(--foreground)] dark:text-[var(--foreground)] transition-all duration-300">
      <div className="w-full flex flex-col items-center justify-center pt-[33px]">
        <img src="/pealenLogo.svg" alt="logo" className="w-[116px]" />
        <h2 className="text-[14px] text-[#5D5D5D] pt-2">Make home green</h2>
        <div className="w-full flex flex-col mt-12 gap-y-[22px]">
          {/* {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <div
                className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all ${
                  pathname === item.path ? "bg-[#2f2f2fbc] text-white" : "text-[#9E9E9E]"
                }`}
              >
                <img src={item.icon} alt={item.name} />
                <h1 className="text-[14px]">{item.name}</h1>
              </div>
            </Link>
          ))} */}

          <Link href={"/dashboard"}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all ${
                pathname === "/dashboard"
                  ? "bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] text-[var(--text-color-tertiary)]"
                  : "dark:text-[var(--text-color-tertiary)]"
              }`}
            >
              <img src={"/dashboard.svg"} alt="Dashboard icon" />
              <h1 className="text-[14px]">Dashboard</h1>
            </div>
          </Link>

          <Link href={"/dashboard/courses"}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all ${
                pathname.includes("/dashboard/courses")
                  ? "bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] text-[var(--text-color-tertiary)]"
                  : "dark:text-[var(--text-color-tertiary)]"
              }`}
            >
              <LuFiles className="text-[#72c347] dark:text-[#72c347] text-2xl" />
              <h1 className="text-[14px]">Courses</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
