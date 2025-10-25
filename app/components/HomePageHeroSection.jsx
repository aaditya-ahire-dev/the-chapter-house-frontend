"use client";

import React, { useState, useEffect, useRef } from 'react';

function HomePageHeroSection() {
  const backgroundRef = useRef(null); 
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBackgroundVisible(true); 
          observer.unobserve(entry.target); 
        }
      },
      {
        rootMargin: '100px', 
      }
    );

    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }

    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []); 

  return (
    <div className="relative h-[500px] pt-10 mb-8 lg:mb-0 overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out" // Added transition
        style={{
          backgroundImage: isBackgroundVisible ? `url("/images/book_banner4.webp")` : 'none',
          filter: 'blur(2px)',
          opacity: isBackgroundVisible ? 1 : 0,
        }}
      />
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6 animate-fadeIn text-center leading-tight">
          Welcome to <span className="text-blue-400">The Chapter House</span>
        </h1>
        <p className="text-xl sm:text-2xl opacity-90 animate-slideUp mb-8 text-center max-w-2xl">
          Discover your next favorite book
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Explore Books
          </button>
          <button className="px-8 py-3 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
            View Books
          </button>
        </div>
      </div>
      {/* Bottom Fade */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-100 to-transparent"></div>
    </div>
  );
}

export default HomePageHeroSection;