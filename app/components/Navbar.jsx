"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { ProfileIcon } from '@/app/services/IconSvg';
import {userLogoutAction} from "@/app/lib/action";
import { useAuth } from '@/app/lib/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';
import { signOut as apiSignOut } from '@/app/services/Api';
function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user: authUser, userRole } = useAuth();
  const user = userRole !== "user" ? null : authUser;
  const router = useRouter();

  const handleLogout = async () => {
    await apiSignOut();
    await signOut(auth);
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link href="/" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} className="flex items-center group">
            <span className="text-2xl font-serif font-bold text-blue-600 transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:text-blue-700">The Chapter House</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 ease-in-out transform ${
                  isSearchFocused ? 'border-blue-500 shadow-md scale-102' : 'border-gray-300'
                } focus:outline-none focus:border-blue-500 hover:border-blue-400`}
                placeholder="Search for books..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div className={`absolute left-3 top-2.5 transition-colors duration-300 ease-in-out ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`}>
                <svg
                  className="h-5 w-5 transition-transform duration-300 ease-in-out hover:scale-110"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Links and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/mybooks" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out relative group">
                  My Books
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/profile" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out relative group">
                  <div className="flex items-center gap-2 font-medium">
                    <ProfileIcon />
                    <span>{user.displayName}</span>
                  </div>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 hover:shadow-md active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out relative group">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/signup" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 hover:shadow-md active:scale-95">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="p-2">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-md hover:border-blue-400"
                placeholder="Search for books..."
              />
            </div>
            {user ? (
              <>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 transition-all duration-300 ease-in-out transform hover:text-blue-600 hover:translate-x-2">
                  <div className="flex items-center gap-2 font-medium">
                    <ProfileIcon />
                    <span>Profile</span>
                  </div>
                </Link>
                <Link href="/mybooks" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 transition-all duration-300 ease-in-out transform hover:text-blue-600 hover:translate-x-2">
                  My Books
                </Link>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                  className="w-full text-left block px-3 py-2 text-red-600 transition-all duration-300 ease-in-out transform hover:bg-red-50 hover:translate-x-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 transition-all duration-300 ease-in-out transform hover:text-blue-600 hover:translate-x-2">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 transition-all duration-300 ease-in-out transform hover:text-blue-600 hover:translate-x-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
