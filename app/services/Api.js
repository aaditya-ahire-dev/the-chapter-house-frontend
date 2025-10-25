import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000';
const API = axios.create({ 
  baseURL: API_BASE_URL,
  withCredentials: true
});

// You can add interceptors here if needed

// export async function signup(data) {
//   return await API.post('/auth/signup', data);
// }
export async function signOut() {
  return await API.post('/auth/signOut');
}


export const createProfileInDb = (idToken, name) => {
  return API.post('/auth/signup', {idToken, name});
};


export async function loginUser(data) {
  return await API.post('/auth/login', {idToken: data});
}
export async function updateUser(id,data) {
  return await API.put(`/api/user/update/${id}`,data);
}

export async function adminSignup(idToken , secretKey,name) {
  return await API.post('/auth/admin/signup', { idToken , secretKey , name });
}
export async function adminLogin(idToken) {
  return await API.post('/auth/admin/login', { idToken });
}
export async function sendPasswordResetOtp(email) {
  return await API.post('/auth/resetPasswordOtp', { email });
}
export async function resetPassword(body) {
  return await API.patch('/auth/verify-otp-and-reset-password', body);
}
export async function rateBook({rating}, id) {
  return await API.post(`/api/book/ratebook/${id}`, {rating});
}
export async function updateBookStatus(buyedBookEntryId, newStatus) {
  return await API.put('/api/user/update/book-status', {buyedBookEntryId, newStatus});
}




export async function getAllUsers() {
  return await API.get('/api/user/getallusers');
}








export async function getAllBooks() {
 const res = await axios.get(`${API_BASE_URL}/api/book/getbooks`, {
  headers: {
      'Cache-Control': 'no-store', // Or for more robust control: 'no-cache, no-store, must-revalidate'
    },
  });
 return res.data;
}



export async function getAllMyBooks() {
  return await API.get('/api/book/usersallbook');
}


export async function getBookById(id) {
  return await API.get(`/api/book/getbooks/${id}`);
   const res = await axios.get(`${API_BASE_URL}/api/book/getbooks/${id}`, {
   headers: {
      'Cache-Control': 'no-store', // Or for more robust control: 'no-cache, no-store, must-revalidate'
    },
  });
 return res.data;

}
export async function getLength() {
  return await API.get('/api/book/getlength');
}
export async function addBook(data) {
  return await API.post('/api/book/uploadbook', data);
}
export async function verifyOrderPayment(orderData) {
  return await API.post("/api/payment/verify-order-payment" ,{orderData});
}








export async function buyBook(id) {
  return await API.get(`/api/book/buybook/${id}`);
}
export async function placePaymentOrder(id) {
  return await API.get(`/api/payment/oderPayment/${id}`);
}

export async function getBuyedBookId(id) {
  return await API.get(`/api/book/buybookbyid/${id}`);
}

export async function getUserRatingToBook(id) {
  return await API.get(`/api/book/getrating/${id}`);
}

export async function downloadfile(link) {
  let timestamp = new Date().getTime();
  return await API.get(`/api/book/downloadbook/${link}?t=${timestamp}`,{
      responseType: "blob",
    })}



export async function deleteBook(id) {
  return await API.delete(`/api/book/deletebook/${id}`);
}


export async function updateBook(id, data) {
  return await API.put(`/api/book/updatebook/${id}`,data);
}