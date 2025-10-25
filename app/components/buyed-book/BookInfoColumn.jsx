// @/app/components/buyed-book/BookInfoColumn.jsx
import React from "react";
import BookInfo from "@/app/components/BookInfo"; // Assuming this component exists
import {StarIcon} from "@/app/services/IconSvg";

const BookInfoColumn = ({ book, userRating, hoverRating, setHoverRating, onRate }) => {
  const categories = book.categories || (book.category ? [book.category] : []);

  return (
    <div className="lg:col-span-1">
      <BookInfo
        title={book.title}
        author={book.author}
        description={book.description}
        language={book.language}
        publishedYear={book.publishedYear}
        publisher={book.publisher}
        category={book.category}
        rating={book.avrrating}
        totalRatings={book.ratings.length}
      />

      {/* Categories */}
      <div className="mt-6 flex flex-wrap gap-2 animate-fadeInUp">
        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium transition-all duration-300 hover:bg-blue-100 hover:scale-105 cursor-pointer"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* User Rating */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Rate this Book
        </h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-8 h-8 cursor-pointer transition-transform duration-200 ${
                (hoverRating || userRating || 0) >= star
                  ? "text-yellow-400 scale-110"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => onRate(star)}
            />
          ))}
          {userRating && (
            <span className="ml-2 text-blue-600 font-medium animate-fadeIn">
              {userRating} / 5
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookInfoColumn;