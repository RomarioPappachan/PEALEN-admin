"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/courses");
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src="/pealenLogo.svg" alt="Logo" className="w-[300px]" />
    </div>
  );
}

export default page;
