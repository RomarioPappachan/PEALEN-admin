import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex w-screen h-screen fixed">
        <div className="w-1/6 h-screen overflow-y-auto">
          <Sidebar />
        </div>
        <div className="w-5/6 h-screen bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] overflow-y-auto">
          <div className="w-full sticky top-0 left-0 z-10 border-none">
            <Navbar />
          </div>
          <div className="p-10 min-h-max ">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
