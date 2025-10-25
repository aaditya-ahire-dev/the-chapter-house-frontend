"use client";
import React, { useState } from 'react';
import  Link  from "next/link";
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/services/Api';
import {auth} from '@/app/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';


function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // const res = await loginUser(form);
      const userCredential = await signInWithEmailAndPassword(auth , form.email , form.password);
      const user = userCredential.user;
      const Idtoken = await user.getIdToken();
      const res = await loginUser(Idtoken);
      setSuccess('Login successful!');
      router.push('/');
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-opacity duration-500 hover:opacity-80"
        style={{
          backgroundImage: 'url("/images/book_banner2.png")',
          filter: 'blur(2px)',
          animation: 'slowZoom 20s infinite alternate'
        }}
      />
      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md mx-4 transform transition-all duration-500 hover:scale-102 animate-fadeIn">
        <h1 className="text-4xl font-serif text-center mb-2 text-blue-800 animate-fadeIn tracking-wide">
          The Chapter House
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
          
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
          
          <div className="mb-6">
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/signup" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline-offset-2 hover:underline"
            >
              Sign up here
            </Link>
          </div>
          <div className="text-center mt-4 text-gray-600">
            Forget Password?{' '}
            <Link 
              href="/forget-password" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline-offset-2 hover:underline"
            >
              Reset it here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
