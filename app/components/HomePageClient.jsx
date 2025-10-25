"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Book_card from '@/app/components/Book_card';
import { filterBooks } from '@/app/components/Search_filter';
import { SearchIcon } from '@/app/services/IconSvg';
import Footer from '@/app/components/Footer';
import HomePageHeroSection from '@/app/components/HomePageHeroSection';

function HomePageClient({initialBooks}) {
  const [books, setBooks] = useState(initialBooks || []);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const prevQueryRef = useRef('');

  useEffect(()=>{
    setLoading(false)
  },[])


  useEffect(() => {
    // Scroll to the featured section when the user starts typing for the first time
    const prevQuery = prevQueryRef.current;
    if (query.length > 0 && prevQuery.length === 0 && searchContainerRef.current) {
      const elementTop = searchContainerRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight * 0.10; // 10vh
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    } else if (query.length === 0 && prevQuery.length > 0) {
      // Scroll back to top if search is cleared
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    // Update the ref to the current query for the next render
    prevQueryRef.current = query;
  }, [query]);

  const filteredBooks = filterBooks(books, query);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HomePageHeroSection />
      {/*  */}

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-8 lg:pt-4 max-w-7xl">
        {/* Search Bar */}
        <div ref={searchContainerRef} className="mb-12 lg:mb-16 max-w-2xl mx-auto">
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search for your next favorite book..."
              className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md ${
                isSearchFocused ? 'scale-102 shadow-xl border-blue-400' : 'scale-100 shadow-sm border-gray-300'}`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
              <SearchIcon />
            </div>
          </div>
          <p className="mt-2 text-xs text-blue-600 text-center">
            * Search book using title, author, price, category, publisher, published year, language
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-16">
          {filteredBooks.length > 0 ? (
            <>
              <h2 className="text-4xl font-serif text-gray-800 mb-2 text-center">
                Featured Collection
              </h2>
              <p className="text-gray-600 text-center mb-8 text-lg">
                Handpicked books for your reading pleasure
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn">
                {filteredBooks.map((book) => (
                  <Link 
                    href={`/book/${book._id}`}
                    key={book._id} 
                    className="transform transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl"
                  >
                    <Book_card
                      title={book.title}
                      author={book.author}
                      price={book.price}
                      image={book.coverImage}
                      avrrating={book.avrrating}
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No books match your search</h3>
              <p className="text-gray-600">Try searching for a different title, author, or category.</p>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <Footer />
        {/*  */}
      </div>
    </div>
  );
}

export default HomePageClient;
