"use client";
import React, { useEffect, useState } from 'react';
import Link  from 'next/link';
import Book_card from '../../components/Book_card';
import { getAllBooks } from '../../services/Api';
import { filterBooks } from '../../components/Search_filter';
import { SearchIcon ,StarSmallIcon} from '../../services/IconSvg';
import AdminSidebar from '../../components/AdminSidebar';

function AdminAllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getAllBooks();
        // assuming res.data.books is the array of books
        setBooks(res.books || []);
      } catch (e) {
        console.log(e);
        setError('Failed to load books');
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchBooks();
  }, []);

  const filtered = filterBooks(books, query);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 lg:ml-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-12 text-center overflow-hidden">
          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-gradient-to-b from-blue-200/40 to-blue-100/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 right-1/3 w-[360px] h-[360px] bg-gradient-to-tr from-purple-200/40 to-pink-100/20 rounded-full blur-3xl" />
          </div>

          {/* Top row with badge/title and search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium shadow-sm animate-fadeInUp" style={{ animationDelay: '40ms' }}>
               <StarSmallIcon />
                Catalog
              </div>

              {/* Title */}
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent animate-fadeInUp" style={{ animationDelay: '80ms' }}>
                All Books
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '120ms' }}>
                Manage and review all books in the catalog.
              </p>
            </div>
            <div className="w-11/12 sm:w-80 sm:mr-4 lg:mr-8 mx-auto sm:mx-0">
              <div className="relative group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur px-3 py-2.5 sm:px-4 sm:py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                  <SearchIcon />
                </div>
              </div>
              <p className="mt-1 text-xs text-red-500 text-left">* Search book using title, author, price, category, publisher, published year, language</p>
            </div>
          </div>

          {/* Accent divider */}
          <div className="mt-6 mx-auto h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-fadeInUp" style={{ animationDelay: '160ms' }} />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((b, index) => (
              <div
                key={b._id || index}
                className="transform transition-all duration-500 hover:translate-y-[-10px]"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease forwards'
                }}
              >
                <Link href={`/admin/books/${b._id}`}>
                  <Book_card
                    image={b.coverImage}
                    title={b.title}
                    author={b.author}
                    price={b.price}
                    avrrating={b.avrrating}
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No books match your search</h3>
            <p className="text-gray-600">Try different keywords or fields.</p>
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

export default AdminAllBooks;
