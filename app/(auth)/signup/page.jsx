// pages/signup.js (or wherever your component is)
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth } from "@/app/lib/firebase"; 
import { createProfileInDb } from '@/app/services/Api'; 

function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const router = useRouter();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
        setError("All fields are required.");
        return;
    }
    setError('');
    setLoading(true);

    try {
      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: form.name
      });
      // Step 2: Get the ID Token from the new user
      const idToken = await user.getIdToken();

      // Step 3: Send the token and name to your Node.js backend to create a profile
      const res = await createProfileInDb(idToken, form.name);

      setSuccess('Signup successful! we are redirecting you to login...');
      router.push('/login');

    } catch (err) {
      // Handle errors from Firebase or your backend
      const errorMessage = err.response?.data?.message || err.message || 'Signup failed.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
            <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-opacity duration-500 hover:opacity-80"
            style={{
              backgroundImage: 'url("/images/book_banner.jpg")',
              filter: 'blur(2px)',
              animation: 'slowZoom 20s infinite alternate'
            }}
          />
        <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h1 className="text-4xl font-serif text-center mb-2 text-blue-800">The Chapter House</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
                {success && <div className="p-3 bg-green-100 text-green-700 rounded-md text-center">{success}</div>}
              
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-medium" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-60" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                <div className="text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                        Log in here
                    </Link>
                </div>
            </form>
        </div>
    </div>
  );
}

export default SignupPage;