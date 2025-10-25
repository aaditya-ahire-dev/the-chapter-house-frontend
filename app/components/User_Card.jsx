import React from 'react';

function User_Card({ name, email, role, buyedBooks = [], createdAt }) {
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : '';
  const booksCount = Array.isArray(buyedBooks) ? buyedBooks.length : 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{email}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
          {role}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500">Books</p>
          <p className="text-blue-600 font-semibold">{booksCount}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500">Joined</p>
          <p className="text-gray-800 font-medium">{formattedDate}</p>
        </div>
      </div>

      {booksCount > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Recent Activity</p>
          <div className="flex flex-wrap gap-1">
            {buyedBooks.slice(0, 3).map((b) => (
              <span key={b._id} className="px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-600">
                {b.bookStatus}
              </span>
            ))}
            {booksCount > 3 && (
              <span className="px-2 py-1 rounded-full text-xs bg-gray-50 text-gray-600">+{booksCount - 3} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default User_Card;
