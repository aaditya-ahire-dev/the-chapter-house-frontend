"use client"
import React, { useState } from 'react';

function PurchaseBox({ price, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-6 border border-gray-100">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Price</span>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              &#8377;{price}
            </div>
          </div>
          <div className="bg-blue-50 rounded-full p-3 transition-transform duration-300 hover:scale-110">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">PDF Format</p>
              <p className="text-xs text-gray-500">High-quality digital document</p>
            </div>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] relative overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span>Purchase Now</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transition-transform duration-500 ease-out ${
              isHovered ? 'scale-x-100' : 'scale-x-0'
            }`} 
            style={{ transformOrigin: 'left' }}
          />
        </button>

        <div className="flex items-center justify-center space-x-2 mt-6">
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-sm text-gray-600 font-medium">
            Secure payment • Instant download
          </p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseBox;