import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6">
          <div className="w-full">
            <Navbar />
          </div>
          <div className="px-10 py-10 min-h-max bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)]">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
