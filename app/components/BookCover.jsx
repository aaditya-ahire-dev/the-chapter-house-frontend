import React from 'react';

function BookCover({ coverImage, title }) {
  return (
    <div className="relative group">
      <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transform transition-transform duration-300 group-hover:scale-110">
          PDF
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </div>
  );
}

export default BookCover;