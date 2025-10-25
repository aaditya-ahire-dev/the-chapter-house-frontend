"use client";
import React, { useEffect, useState } from 'react';
import User_Card from '@/app/components/User_Card';
import { getAllUsers } from '@/app/services/Api';
import Search_User_filter, { filterUsers } from '@/app/components/Search_User_filter';
import AdminSidebar from '@/app/components/AdminSidebar';
import {StarSmallIcon} from '@/app/services/IconSvg'

function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data.users || []);
      } catch (e) {
        setError('Failed to load users');
        console.log(e);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = filterUsers(users, query);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 lg:ml-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-12 overflow-hidden">
          {/* Top row with title and search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium shadow-sm">
                <StarSmallIcon />
                Users
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                All Users
              </h1>
              <p className="mt-2 text-base text-gray-600 max-w-2xl">
                Manage and review all registered users.
              </p>
            </div>
            <Search_User_filter query={query} setQuery={setQuery} />
          </div>

          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-gradient-to-b from-blue-200/40 to-blue-100/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 right-1/3 w-[360px] h-[360px] bg-gradient-to-tr from-purple-200/40 to-pink-100/20 rounded-full blur-3xl" />
          </div>

          <div className="mt-6 mx-auto h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        </div>

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((u, index) => (
              <div
                key={u._id || index}
                className="transform transition-all duration-500 hover:translate-y-[-8px]"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease forwards'
                }}
              >
                <User_Card
                  name={u.name}
                  email={u.email}
                  role={u.role}
                  buyedBooks={u.buyedBooks}
                  createdAt={u.createdAt}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No users match your search</h3>
            <p className="text-gray-600">Try a different name, email, or date.</p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default AdminAllUsers;

  