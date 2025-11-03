"use client";
import { useAuth } from "@/app/lib/AuthContext";

export default function AdminLayoutWrapper({ children }) {
  const { user, userRole } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl text-center border-t-4 border-blue-500 w-full max-w-md">
          <div className="text-5xl sm:text-6xl mb-4">🔑</div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2">
            Login Required
          </h2>
          <p className="text-gray-600">
            Please log in to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  if (userRole !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl text-center border-t-4 border-red-500 w-full max-w-md">
          <div className="text-4xl sm:text-5xl mb-4">⛔🔒</div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-2">
            Unauthorized Access
          </h2>
          <p className="text-gray-600">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
