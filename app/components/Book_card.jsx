import React from "react";

function Book_card({ image, title, author, price ,avrrating}) {

  return (
    <div className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
  
      <div className="relative justify-self-center h-64 w-64 flex items-center justify-center bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-w-full max-h-full object-contain mx-auto my-auto transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            console.error("Image failed to load:", image);
            e.target.style.backgroundColor = "ffffff";
            // Fallback image
            e.target.src =
              "https://via.placeholder.com/400x600?text=Book+Cover";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {title}
        </h3>
        <p className="text-gray-600 mb-1">By {author}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < Math.round(avrrating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-600">
            {avrrating ? avrrating.toFixed(1) : "N/A"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">&#8377;{price}</span>
          <button
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg transform transition-all duration-300 
                       hover:bg-blue-700 hover:scale-105 active:scale-95 
                       hover:shadow-md"
          >
            View Details
          </button>


        </div>
      </div>
    </div>
  );
}

export default Book_card;
