"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation.js';
import Link from 'next/link.js';
// --- Firebase Imports ---
import { sendPasswordResetEmail } from 'firebase/auth';
import {auth} from "@/app/lib/firebase";

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // This single function handles the entire reset process
      await sendPasswordResetEmail(auth, email);
      
      // For security, show a generic success message.
      // This prevents bad actors from confirming which emails are registered.
      setSuccess("If an account with that email exists, a password reset link has been sent.");
    } catch (err) {
      // Also show a generic error message for security.
      setError('Failed to send reset email. Please try again later.');
      console.error("Password Reset Error:", err); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: 'url("/images/book_banner2.png")',
          filter: 'blur(2px)',
        }}
      />
      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md mx-4 transform transition-all duration-500 animate-fadeIn">
        <h1 className="text-3xl font-serif text-center mb-6 text-blue-800 tracking-wide">
          Reset Your Password
        </h1>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-center">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email Address</label>
            <p className="text-sm text-gray-500 mb-2">Enter your email and we'll send you a link to get back into your account.</p>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter your registered email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 font-semibold"
            disabled={loading}
          >
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Remembered your password?{' '}
          <Link 
            href="/login" 
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline-offset-2 hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;