import React from 'react';
import Link from 'next/link';
import { UsersIcon, BooksIcon, AddBookIcon } from '../services/IconSvg';

function AdminSidebar() {
  return (
    <aside className="hidden lg:flex fixed top-0 left-0 h-full w-60 bg-white shadow-xl border-r border-gray-100 px-4 pt-24 pb-8 z-10 flex-col">
      <div className="mb-12 flex items-center justify-center">
        <span className="text-2xl font-bold text-blue-700">Admin</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <Link
          href="/admin/allusers"
          className="flex items-center gap-3 py-3 px-4 rounded-lg font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 outline-none group hover:scale-105 transform"
        >
          <div className="w-5 h-5">
            <UsersIcon />
          </div>
          <span className="text-base">Users</span>
        </Link>
        <Link
          href="/admin/books"
          className="flex items-center gap-3 py-3 px-4 rounded-lg font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 outline-none group hover:scale-105 transform"
        >
          <div className="w-5 h-5">
            <BooksIcon />
          </div>
          <span className="text-base">Books</span>
        </Link>
        <Link
          href="/admin/add-book"
          className="flex items-center gap-3 py-3 px-4 rounded-lg font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 outline-none group hover:scale-105 transform"
        >
          <div className="w-5 h-5">
            <AddBookIcon />
          </div>
          <span className="text-base">Add Book</span>
        </Link>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
