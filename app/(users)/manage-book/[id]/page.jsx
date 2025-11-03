// file: @/app/buyed/[id]/page.jsx
"use client";
import React, { useState, useEffect, use } from "react";
import {
  getBuyedBookId,
  rateBook,
  getUserRatingToBook,
  updateBookStatus,
} from "@/app/services/Api";
import BookCoverColumn from "@/app/components/buyed-book/BookCoverColumn";
import BookInfoColumn from "@/app/components/buyed-book/BookInfoColumn";
import DownloadActionColumn from "@/app/components/buyed-book/DownloadActionColumn";
import axios from "axios";
function BuyedBookDetails({ params }) {

  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);


  const fetchBookData = async (buyedBookId) => {
    setLoading(true);
    try {
      const res = await getBuyedBookId(buyedBookId);
      const fetchedBook = res.data.flattenedBook;
      setBook(fetchedBook);
      if (fetchedBook) {
        const ratingRes = await getUserRatingToBook(fetchedBook._id);
        if (ratingRes.data.existingRating) {
          setUserRating(ratingRes.data.existingRating.rating);
        }
      }
    } catch (error) {
      console.error("Failed to fetch book data:", error);
      setBook(null);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookData(id);
    }
  }, [id]);

  const handleRate = async (rate) => {
    setUserRating(rate);
    await rateBook({ rating: rate }, book._id);
  };

  const handleStatusChange = async (newStatus) => {
    if (!book || book.bookStatus === newStatus) return;

    const originalStatus = book.bookStatus;
    setBook((prevBook) => ({ ...prevBook, bookStatus: newStatus }));

    try {
      const res = await updateBookStatus(id, newStatus);
    } catch (error) {
      setBook((prevBook) => ({ ...prevBook, bookStatus: originalStatus }));
      alert("Failed to update status. Please try again.");
    }
  };



  const handleDownload = async () => {
    try {
        const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/book/downloadbook/${book._id}?t=${Date.now()}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
        );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      if (book.bookStatus !== 'downloaded') {
        handleStatusChange('downloaded');
      }

    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file. Please try again.");
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
        <div className="text-xl text-gray-600">
          Book not found or might have been deleted.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <BookCoverColumn
            coverImage={book.coverImage}
            title={book.title}
            bookStatus={book.bookStatus}
            onStatusChange={handleStatusChange} 
          />
          {/* ... (Other columns remain the same) */}
          <BookInfoColumn
            book={book}
            userRating={userRating}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            onRate={handleRate}
          />
          <DownloadActionColumn
            bookStatus={book.bookStatus}
            onDownload={handleDownload}
          />
        </div>
      </div>
      <style>{`
         @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
         .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
         .animate-fadeIn { animation: fadeIn 1s cubic-bezier(0.4,0,0.2,1) both; }
       `}</style>
    </div>
  );
}

export default BuyedBookDetails;