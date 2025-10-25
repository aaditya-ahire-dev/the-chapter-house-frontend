"use client"
import React, { useEffect, useState } from 'react';
import  Link  from 'next/link';
import { UsersIcon, BooksIcon, AddBookIcon , StarSmallIcon} from '@/app/services/IconSvg';
import {getLength} from "@/app/services/Api"
import AdminSidebar from '@/app/components/AdminSidebar';

function AdminDashboard() {
  const [userCount , setUserCount] = useState(0)
  const [bookCount , setBookCount] = useState(0)

  const fetchLength = async () =>{
    const res = await getLength();
    if(res.data.length.users !== 0){
      setUserCount(res.data.length.users)
    }
    if(res.data.length.books !== 0){
      setBookCount(res.data.length.books)
    }
  } 
  useEffect(()=>{
    fetchLength()
  },[])




  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-white animate-fadeIn">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Dashboard Content */}
      <main className="flex-1 lg:ml-60 px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen">
        <div className="relative mb-12 text-center overflow-hidden">
          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-gradient-to-b from-blue-200/40 to-blue-100/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 right-1/3 w-[360px] h-[360px] bg-gradient-to-tr from-purple-200/40 to-pink-100/20 rounded-full blur-3xl" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium shadow-sm animate-fadeInUp" style={{ animationDelay: '40ms' }}>
            <StarSmallIcon/>
            Admin Panel
          </div>

          {/* Title */}
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent animate-fadeInUp" style={{ animationDelay: '80ms' }}>
            Admin Dashboard
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '120ms' }}>
            Quick stats on platform activity and resources.
          </p>

          {/* Accent divider */}
          <div className="mt-6 mx-auto h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-fadeInUp" style={{ animationDelay: '160ms' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl animate-fadeInUp group">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <div className="w-11 h-11 text-blue-600">
                <UsersIcon />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Total Users</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {userCount}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl animate-fadeInUp group">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <div className="w-11 h-11 text-green-600">
                <BooksIcon />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Total Books</h2>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {bookCount}
            </p>
          </div>
        </div>
        <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 1s cubic-bezier(0.4,0,0.2,1) both; }
      `}</style>
      </main>
    </div>
  );
}

export default AdminDashboard;
