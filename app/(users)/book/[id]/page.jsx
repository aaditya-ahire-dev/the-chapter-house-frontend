"use client"
import React, { useState, useEffect ,use} from 'react';
import dynamic from 'next/dynamic'
import BookCover from '@/app/components/BookCover';
import BookInfo from '@/app/components/BookInfo';
import PurchaseBox from '@/app/components/PurchaseBox';
import {getBookById , buyBook ,placePaymentOrder ,verifyOrderPayment} from '@/app/services/Api';
import { useAuth } from '@/app/lib/AuthContext';
// import ForceLoginPage from '';
const ForceLoginPage = dynamic(() => import("@/app/components/ForceLoginPage")) 

function loadScript(src) {
  return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}


 function page({params}) {


  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [paymentloading, setPaymentLoading] = useState(false);
  const resolver = use(params);
  const id = resolver.id;
  const { user: authUser, userRole } = useAuth();
  const user = userRole !== "user" ? null : authUser;

  const fetchbook = async () =>{
    const res = await getBookById(id);
    setBook(res.data.book);
    if(!res.data.book){
      setBook(null);
    }

  }

  useEffect(() => {
    fetchbook()
    setLoading(false);
  }, []);



   
 const displayRazorpay = async (id) => {
        setPaymentLoading(true);

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }


        const orderResponse = await placePaymentOrder(id)

        if (!orderResponse.data.success) {
            alert("Server error. Are you running the backend?");
            setPaymentLoading(false);
            return;
        }

        const order = orderResponse.data.order
        
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, 
            amount: order.amount,
            currency: order.currency,
            name: 'The chapter house',
            description: 'Test Transaction',
            order_id: order.id,
            handler: async function (response) {
                const orderData = {
                    bookId: id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                };
                console.log(orderData);

                const verificationResponse = await verifyOrderPayment(orderData)

                const result = verificationResponse.data

                if (result.success) {
                    alert('Payment successful and verified!');
                } else {
                    alert('Payment verification failed. Please contact support.');
                }
            },
            prefill: {
                name: user.displayName,
                email: user.email,
                contact: '9000090000',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setPaymentLoading(false);
    };



  




  const handleBuyBook = async (id) => {
    try {
        if(!user){
            setShowLogin(true);
            return;
        }
      displayRazorpay(id)
    } catch (error) {
      if (error.response?.status === 401) {
        setShowLogin(true);
        return;
      }
      console.error('Error downloading book:', error);
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
      {showLogin && (
        <ForceLoginPage
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => handleBuyBook(book._id)}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Book Cover */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookCover
                coverImage={book.coverImage}
                title={book.title}
              />
            </div>
          </div>

          {/* Middle Column - Book Information */}
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
          </div>

          {/* Right Column - Purchase Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PurchaseBox
                price={book.price}
                format={book.format}
                onClick={() => handleBuyBook(book._id)}
                // disabled={paymentloading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
