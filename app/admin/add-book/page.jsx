"use client";   
import React, { useState, useEffect } from 'react';
import { addBook } from '@/app/services/Api';

function AddBookPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [animate, setAnimate] = useState(false);
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    category: '',
    publisher: '',
    publishedYear: '',
    language: '',
    fileUrl: null,
    coverImage: null
  });
  
  const [filePreview, setFilePreview] = useState({
    pdf: '',
    image: ''
  });

  useEffect(() => {
    // Trigger animation after component mount
    setAnimate(true);
  }, []);

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Fantasy',
    'Biography',
    'History',
    'Science',
    'Technology',
    'Arts',
    'Education'
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Chinese',
    'Japanese',
    'Hindi'
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (!file) return;

      setForm(prev => ({
        ...prev,
        [name]: file
      }));

      if (name === 'coverImage' && file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setFilePreview(prev => ({
          ...prev,
          image: imageUrl
        }));
      }

      if (name === 'fileUrl' && file.type === 'application/pdf') {
        const pdfUrl = URL.createObjectURL(file);
        setFilePreview(prev => ({
          ...prev,
          pdf: pdfUrl
        }));
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      const res = await addBook(formData);
      setSuccess(res.data?.message || 'Book added successfully!');
      setForm({
        title: '',
        author: '',
        description: '',
        price: '',
        category: '',
        publisher: '',
        publishedYear: '',
        language: '',
        fileUrl: null,
        coverImage: null
      });
      setFilePreview({ pdf: '', image: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form Section */}
      <div className="w-full md:w-3/5 relative">
        {/* Mobile Background - Only visible on small screens */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 md:hidden"
          style={{
            backgroundImage: 'url("/images/add_banner.jpg")',
            zIndex: -1
          }}
        />
        
        <div className={`w-full min-h-screen overflow-auto pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out transform ${animate ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-3xl font-bold text-white text-center">Add New Book</h2>
                <div className="w-24 h-1 bg-white/30 mx-auto mt-2 rounded-full"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center animate-fadeIn">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 text-green-500 p-4 rounded-lg text-center animate-fadeIn">
                    {success}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter book title"
                    />
                  </div>

                  {/* Author */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter author name"
                    />
                  </div>

                  {/* Price */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter price"
                    />
                  </div>

                  {/* Category */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Category
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Publisher */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Publisher
                    </label>
                    <input
                      type="text"
                      name="publisher"
                      value={form.publisher}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter publisher name"
                    />
                  </div>

                  {/* Published Year */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Published Year
                    </label>
                    <input
                      type="number"
                      name="publishedYear"
                      value={form.publishedYear}
                      onChange={handleChange}
                      required
                      min="1800"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter published year"
                    />
                  </div>

                  {/* Language */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Language
                    </label>
                    <select
                      name="language"
                      value={form.language}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="">Select language</option>
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cover Image Upload */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      Cover Image
                    </label>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 
                                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                                file:text-sm file:font-semibold file:bg-blue-50 
                                file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {filePreview.image && (
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={filePreview.image}
                            alt="Cover preview"
                            className="w-full h-full object-cover rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PDF File Upload */}
                  <div className="group transform transition-all duration-300 hover:scale-102">
                    <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                      PDF File
                    </label>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        name="fileUrl"
                        accept="application/pdf"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                                file:text-sm file:font-semibold file:bg-blue-50 
                                file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {filePreview.pdf && (
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2h2.93a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H5v6h10v-6h-2.93a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H15a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>PDF file selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description - Full Width */}
                <div className="group transform transition-all duration-300 hover:scale-102">
                  <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 group-hover:text-blue-600">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter book description"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold 
                             transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Book...
                      </span>
                    ) : 'Add Book'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Banner Image (visible only on md and up) */}
      <div className="hidden md:block w-2/5 relative">
        <div 
          className="fixed top-0 right-0 w-2/5 h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/add_banner.jpg")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 to-purple-600/30 transition-opacity duration-300 hover:opacity-75">
            <div className={`absolute bottom-0 left-0 right-0 p-8 text-white transform transition-all duration-700 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              <h2 className="text-4xl font-bold mb-2">
                Add New Books
              </h2>
              <p className="text-lg">
                Expand your library with new titles and share knowledge with readers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookPage;
