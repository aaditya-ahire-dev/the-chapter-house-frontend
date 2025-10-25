"use client";
import React, { useEffect, useState ,use} from 'react';
import { useRouter } from 'next/navigation';
import { getBookById, deleteBook, updateBook } from '@/app/services/Api';
import BookCover from '@/app/components/BookCover';
import BookInfo from '@/app/components/BookInfo'; 
import { EditIcon, RemoveIcon, CalendarIcon, IdCardIcon, PriceTagIcon } from '@/app/services/IconSvg';
import EditBook from '@/app/components/EditBook';

function AdminBookDetailsPage({params}) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const router = useRouter();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getBookById(id);
        setBook(res.data.book);
      } catch (e) {
        setBook(null);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchDetails();
  }, [id]);

 const handleRemoveBook = async () => {
   const confirmed = window.confirm("Are you sure you want to remove this book? This action cannot be undone.");
   if (!confirmed) return;

   try {
     const res = await deleteBook(id);
     setDeleteSuccess(res.data?.message || 'Book removed successfully!');
     setTimeout(() => {
       router.push('/admin/books');
     }, 1000);
   } catch (error) {
     console.error("Failed to remove book:", error);
     alert(error.response?.data?.message || 'Failed to remove book.');
   }
 }

  const handleSaveBook = async (updatedData) => {
    try {
      const res = await updateBook(id, updatedData);
      console.log("res after update===>",res.data)
      setBook(res.data.book);

    } catch (error) {
      console.error("Failed to save book:", error);
      throw error; // Re-throw to be caught by the form
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      {deleteSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform animate-slideUp">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{deleteSuccess}</h2>
            <p className="text-gray-500 mt-2">Redirecting you to the book list...</p>
          </div>
        </div>
      )}

      {isEditing && (
        <EditBook
          book={book}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveBook}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-10 text-center overflow-hidden">
          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-gradient-to-b from-blue-200/40 to-blue-100/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 right-1/3 w-[360px] h-[360px] bg-gradient-to-tr from-purple-200/40 to-pink-100/20 rounded-full blur-3xl" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium shadow-sm animate-fadeInUp" style={{ animationDelay: '40ms' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3 6 6 .9-4.5 4.2 1.1 6.7L12 17.8 6.4 19.8l1.1-6.7L3 8.9 9 8l3-6z" />
            </svg>
            Admin Panel
          </div>

          {/* Title */}
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent animate-fadeInUp" style={{ animationDelay: '80ms' }}>
            Book Details (Admin)
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '120ms' }}>
            Review and manage this book with powerful admin tools and insights.
          </p>

          {/* Accent divider */}
          <div className="mt-6 mx-auto h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-fadeInUp" style={{ animationDelay: '160ms' }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24 animate-fadeInUp">
              <BookCover coverImage={book.coverImage} title={book.title} />
            </div>
          </div>
          <div className="lg:col-span-2 animate-fadeInUp" style={{ animationDelay: '120ms' }}>
            <BookInfo
              title={book.title}
              author={book.author}
              description={book.description}
              language={book.language}
              publishedYear={book.publishedYear}
              publisher={book.publisher}
              category={book.category}
              rating={book.avrrating}
              totalRatings={Array.isArray(book.ratings) ? book.ratings.length : (book.totalRatings || 0)}
            />
            
            {/* Additional Admin Details */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Additional Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-start gap-3 group">
                  <span className="w-5 h-5 text-blue-600 mt-1 transition-transform duration-300 group-hover:scale-110 cursor-pointer"><IdCardIcon /></span>
                  <div>
                    <p className="text-sm text-gray-500">Book ID</p>
                    <p className="text-gray-900 font-mono text-sm break-all">{book._id}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <span className="w-5 h-5 text-green-600 mt-1 transition-transform duration-300 group-hover:scale-110 cursor-pointer"><PriceTagIcon /></span>
                  <div>
                    <p className="text-sm text-gray-500">Price & Format</p>
                    <p className="text-gray-900 font-medium">₹{book.price} ({book.format || 'PDF'})</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <span className="w-5 h-5 text-purple-600 mt-1 transition-transform duration-300 group-hover:scale-110 cursor-pointer"><CalendarIcon /></span>
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="text-gray-900 font-medium">{formatDate(book.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <span className="w-5 h-5 text-indigo-600 mt-1 transition-transform duration-300 group-hover:scale-110 cursor-pointer"><CalendarIcon /></span>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-gray-900 font-medium">{formatDate(book.updatedAt)}</p>
                  </div>
                </div>
              </div>
              <a href={book.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
                View Book File
              </a>
            </div>


            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-3 cursor-pointer rounded-lg bg-blue-600 text-white font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-lg group flex items-center justify-center gap-2"
              >
                <span className="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <EditIcon />
                </span>
                Edit Book
              </button>
              <button 
              onClick={handleRemoveBook}
              className="px-4 py-3 cursor-pointer rounded-lg bg-red-50 text-red-600 font-medium transition-all duration-300 hover:bg-red-100 hover:shadow-lg group flex items-center justify-center gap-2">
                <span className="w-5 h-5 transform transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <RemoveIcon />
                </span>
                Remove Book
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease both; }
      `}</style>
    </div>
  );
}

export default AdminBookDetailsPage;
