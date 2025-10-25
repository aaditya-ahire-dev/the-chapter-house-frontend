import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function BuyedBookCard({ id, coverImage, title, author, bookStatus, categories = [], avrrating , bookID, onDelete }) {
  const router = useRouter();
  // If title is null, treat the book as deleted
  const effectiveStatus = title == null ? 'deleted' : (bookStatus || 'downloaded');
  const getStatusColor = (status) => {
    switch(status) {
      case 'downloaded':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'reading':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'deleted':
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'downloaded':
        return (
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'reading':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
          </svg>
        );
    }
  };

  const renderStars = (avrrating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= avrrating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-gray-600">{avrrating}</span>
      </div>
    );
  };

  return (
    <Link href={`/manage-book/${bookID}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl">
        {/* Image Container */}
        <div className="relative h-48 w-full flex items-center justify-center overflow-hidden bg-gray-50">
            <Image 
              src={coverImage || '/images/book.png'}
              alt={title || "image not found"}
              fill // This makes the image fill the parent container
              style={{ objectFit: 'contain' }} // Use style for object-fit with 'fill'
              className="transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              onError={(e) => {
                e.target.src = '/images/book.png';
              }}
            />
          {/* Status Badge */}
              <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(effectiveStatus)} transition-all duration-300 flex items-center space-x-1`}>
            {getStatusIcon(effectiveStatus)}
            <span>{effectiveStatus === 'downloaded' ? 'Owned' : effectiveStatus === 'reading' ? 'Reading' : effectiveStatus === 'deleted' ? 'Deleted' : 'Download'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 relative">
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
            {title || 'Deleted Book'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">By {author}</p>
          
          {/* avrrating */}
          <div className="mt-2">
            {renderStars(avrrating)}
          </div>

          {/* Categories */}
          <div className="mt-3 flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600 transition-all duration-300 hover:bg-blue-100"
              >
                {category}
              </span>
            ))}
            {categories.length > 2 && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-50 text-gray-600">
                +{categories.length - 2}
              </span>
            )}
          </div>

          {/* Manage Button - Hidden by default, slides up on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 px-4 pb-4 pt-8 bg-gradient-to-t from-white via-white flex flex-col gap-2">
            <button
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
              onClick={(e) => {
                // prevent the parent Link from triggering
                e.preventDefault();
                e.stopPropagation();
                router.push(`/manage-book/${bookID}`);
              }}
            >
              Manage Book
            </button>

            {/* Show Delete for downloaded, reading and deleted */}
            {['downloaded', 'reading', 'deleted'].includes(effectiveStatus) && (
              <button
                className="block w-full text-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Confirm and call onDelete if provided
                  const confirmed = confirm('Are you sure you want to delete this book from your purchases?');
                  if (!confirmed) return;
                  if (typeof onDelete === 'function') {
                    onDelete(bookID || id);
                  } else {
                    // Fallback behavior: log and optionally navigate to manage page
                    // eslint-disable-next-line no-console
                    console.warn('Delete requested for', bookID || id, 'but no onDelete handler was provided.');
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BuyedBookCard;