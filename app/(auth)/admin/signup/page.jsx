"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { adminSignup } from '@/app/services/Api';
import {createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from 'next/navigation';

function AdminSignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', secretKey: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(auth.currentUser, {
        displayName: form.name
      });
      const idToken = await auth.currentUser.getIdToken();
      const res = await adminSignup(idToken , form.secretKey , form.name);
      setSuccess(res.data?.message || 'Admin signup successful!');
      setForm({ name: '', email: '', password: '', secretKey: '' });
      router.push('/admin/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Admin signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-opacity duration-500 hover:opacity-80"
        style={{
          backgroundImage: 'url("/images/admin_signupBanner.jpg")',
          filter: 'blur(2px)',
          animation: 'slowZoom 20s infinite alternate'
        }}
      />
      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md mx-4 transform transition-all duration-500 hover:scale-102 animate-fadeIn">
        <h1 className="text-4xl font-serif text-center mb-2 text-blue-800 animate-fadeIn tracking-wide">
          Admin Portal
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Admin Sign Up</h2>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
          
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium" htmlFor="secretKey">Admin Secret Key</label>
            <input
              type="password"
              id="secretKey"
              name="secretKey"
              value={form.secretKey}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter the admin secret key"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
          </button>

          <div className="text-center mt-4 text-gray-600">
            Already have an admin account?{' '}
            <Link 
              href="/admin/login" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline-offset-2 hover:underline"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignupPage;
