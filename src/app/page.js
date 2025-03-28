"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/courses");
  }, []);

  return <div>page</div>;
}

export default page;
