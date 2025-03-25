"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children }) => {
  const { token, checkAuth, logout } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !token) {
      logout();
      router.push("/login");
    }
  }, [token, loading, router, logout]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return token ? children : null;
};

export default ProtectedRoute;
 