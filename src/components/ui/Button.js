import Link from "next/link";
import React from "react";
import { LuChevronLeft } from "react-icons/lu";

function ButtonComponent({ children, href }) {
  return (
    <Link
      href={href}
      className="text-blue-500 hover:underline flex items-center"
    >
      <LuChevronLeft className="text-2xl font-semibold" />
      {children}
    </Link>
  );
}

export default ButtonComponent;
