"use client";
import React, { useState, useEffect } from 'react';

function EditBook({ book, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...book, coverImage: null, fileUrl: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFileInputs, setShowFileInputs] = useState(false);
  const [filePreview, setFilePreview] = useState({
    image: book.coverImage,
    pdf: ''
  });

  const categories = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance',
    'Fantasy', 'Biography', 'History', 'Science', 'Technology', 'Arts', 'Education'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Hindi'
  ];

  useEffect(() => {
    // Reset form data when book prop changes, but keep file inputs separate
    setFormData({ ...book, coverImage: null, fileUrl: null });
    setFilePreview({ image: book.coverImage, pdf: '' });
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (!file) return;

      setFormData(prev => ({ ...prev, [name]: file }));

      if (name === 'coverImage' && file.type.startsWith('image/')) {
        setFilePreview(prev => ({ ...prev, image: URL.createObjectURL(file) }));
      }
      if (name === 'fileUrl' && file.type === 'application/pdf') {
        setFilePreview(prev => ({ ...prev, pdf: 'PDF file selected' }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || '' : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const hasFileChanges = formData.coverImage || formData.fileUrl;
    let dataToSend;

    if (hasFileChanges) {
      dataToSend = new FormData();
      // Append all non-file fields
      Object.keys(formData).forEach(key => {
        if (key !== 'coverImage' && key !== 'fileUrl' && formData[key] !== null && key !== '_id' && key !== 'ratings' && key !== '__v' && key !== 'avrrating') {
          dataToSend.append(key, formData[key]);
        }
      });
      // Only append the file if it has been changed
      if (formData.coverImage) {
        dataToSend.append('coverImage', formData.coverImage);
      }
      if (formData.fileUrl) {
        dataToSend.append('fileUrl', formData.fileUrl);
      }
    } else {
      // Send as JSON if no files are changed
      const { coverImage, fileUrl, ...rest } = formData;
      dataToSend = rest;
    }

    try {
      await onSave(dataToSend);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 transform transition-all duration-300 animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent pb-1">Edit Book Details</h2>
            <div className="w-24 h-1 bg-gray-200 mx-auto mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pl-1 pr-2 sm:pr-4">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-center">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="title">Title</label>
              <input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            </div>
            <div className="group">
              <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="author">Author</label>
              <input type="text" name="author" value={formData.author || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            </div>
          </div>

          <div className="group">
            <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="description">Description</label>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="publisher">Publisher</label>
              <input type="text" name="publisher" value={formData.publisher || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            </div>
            <div className="group">
              <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="publishedYear">Published Year</label>
              <input type="number" name="publishedYear" value={formData.publishedYear || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group">
              <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="category">Category</label>
              <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200">
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="group">
              <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="language">Language</label>
              <select name="language" value={formData.language || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200">
                <option value="">Select language</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div className="group">
              <label className="block mb-1 font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600" htmlFor="price">Price (₹)</label>
              <input type="number" name="price" value={formData.price || ''} onChange={handleChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            </div>
          </div>

          {!showFileInputs && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowFileInputs(true)}
                className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg font-medium transition-all duration-300 hover:border-blue-500 hover:text-blue-600"
              >
                Change Files (Cover Image / PDF)
              </button>
            </div>
          )}

          {showFileInputs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 mt-4 animate-fadeIn">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Cover Image</label>
                <input type="file" name="coverImage" accept="image/*" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {filePreview.image && (
                  <img src={filePreview.image} alt="Preview" className="mt-2 h-24 w-auto rounded-md object-cover" />
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">PDF File</label>
                <input type="file" name="fileUrl" accept="application/pdf" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {filePreview.pdf && (
                  <div className="flex items-center space-x-2 text-sm text-blue-600 mt-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2h2.93a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H5v6h10v-6h-2.93a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H15a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <span>{filePreview.pdf}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium transition-all duration-300 hover:bg-gray-200 hover:shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
