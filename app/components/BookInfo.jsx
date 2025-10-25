import React from 'react';

function BookInfo({ title, author, description, language, publishedYear, publisher, category, rating = 4.5, totalRatings = 128 }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const fillPercentage = Math.min(100, Math.max(0, (rating - index) * 100));
      return (
        <div key={index} className="relative">
          {/* Background star */}
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {/* Filled star overlay */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-serif font-bold text-gray-900 transition-all duration-300 hover:text-blue-600 leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-xl text-gray-600">
            by{' '}
            <span className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 cursor-pointer">
              {author}
            </span>
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {renderStars(rating)}
            </div>
            <span className="text-lg font-medium text-gray-700">{rating}</span>
            <span className="text-sm text-gray-500">({totalRatings} ratings)</span>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 leading-relaxed tracking-wide">
          {description}
        </p>
      </div>

      <div className="space-y-6 py-4">
        {/* Categories/Tags */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Categories</p>
          <div className="flex flex-wrap gap-2">
            {/* {categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium 
                         transition-all duration-300 hover:bg-blue-100 hover:scale-105 cursor-pointer"
              >
                {category}
              </span>
            ))} */}

            <span
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium 
                         transition-all duration-300 hover:bg-blue-100 hover:scale-105 cursor-pointer"
              >
                {category}
              </span>
          </div>
        </div>

        {/* Book Details Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 group">
            <p className="text-sm text-gray-500 mb-1 group-hover:text-blue-500 transition-colors duration-300">Language</p>
            <p className="text-base font-medium text-gray-900 truncate">{language}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 group">
            <p className="text-sm text-gray-500 mb-1 group-hover:text-blue-500 transition-colors duration-300">Published</p>
            <p className="text-base font-medium text-gray-900 truncate">{publishedYear}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 group">
            <p className="text-sm text-gray-500 mb-1 group-hover:text-blue-500 transition-colors duration-300">Publisher</p>
            <p className="text-base font-medium text-gray-900 truncate">{publisher}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1 group-hover:text-blue-500 transition-colors duration-300">Reviews</p>
                <p className="text-base font-medium text-gray-900">{totalRatings}</p>
              </div>
              <div className="flex text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;