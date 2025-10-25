"use client";
import React, { useState, useEffect } from 'react';
import BuyedBookCard from '@/app/components/BuyedBookCard';
import {getAllMyBooks} from '@/app/services/Api';
function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');


   const fetchBooks = async () => {
      try {
        const response = await getAllMyBooks()
        setBooks(response.data.books);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    if (activeTab === 'all') return true;
    if (activeTab === 'downloaded') return book.bookStatus === 'downloaded';
    if (activeTab === 'reading') return book.bookStatus === 'reading';
    return book.bookStatus === 'not_downloaded';
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            My Library
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personal collection of books. Track your reading progress and manage your digital library.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <nav className="grid grid-cols-2 sm:flex gap-2 sm:gap-0 sm:space-x-2 p-2 bg-gray-100 rounded-lg max-w-[300px] sm:max-w-none">
            {['all', 'downloaded', 'reading', 'not_downloaded'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-center ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab === 'not_downloaded' ? 'To Download' : 
                  tab.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Books', value: books.length },
            { label: 'Downloaded', value: books.filter(b => b.bookStatus === 'downloaded').length },
            { label: 'Reading', value: books.filter(b => b.bookStatus === 'reading').length },
            { label: 'Not Downloaded', value: books.filter(b => b.bookStatus === 'not_downloaded').length }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {filteredBooks.map((item, index) => (
              <div
                key={item._id}
                className="transform transition-all duration-500 hover:translate-y-[-10px]"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease forwards'
                }}
              >
                <BuyedBookCard {...item.book} bookStatus={item.bookStatus} bookID={item._id}/>
              </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try changing your filter or add some books to your library.</p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default MyBooks;
