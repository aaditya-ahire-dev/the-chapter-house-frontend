import React from 'react';
import { SearchIcon } from '@/app/services/IconSvg';

export function filterUsers(users = [], query = '') {
  const normalized = (query || '').trim().toLowerCase();
  if (!normalized) return users;

  return users.filter((u) => {
    const name = (u.name || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const joinedRaw = u.createdAt ? new Date(u.createdAt) : null;
    const joined = joinedRaw && !isNaN(joinedRaw) ? joinedRaw.toLocaleDateString().toLowerCase() : '';

    return (
      name.includes(normalized) ||
      email.includes(normalized) ||
      (joined && joined.includes(normalized))
    );
  });
}

function Search_User_filter({ query, setQuery }) {
  return (
    <div className="w-11/12 sm:w-80 sm:mr-4 lg:mr-8 mx-auto sm:mx-0">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur px-3 py-2.5 sm:px-4 sm:py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
          <SearchIcon />
        </div>
      </div>
      <p className="mt-1 text-xs text-red-500 text-left">* Search user using name, email, or joined date</p>
    </div>
  );
}

export default Search_User_filter;
