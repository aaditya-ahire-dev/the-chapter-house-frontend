"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

// 1. Create the context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
        const idTokenResult = await currentUser.getIdTokenResult();

        const role = idTokenResult.claims.role || 'user';
        setUserRole(role);
      } else {
        // User is signed out
        setUser(null);
      }
      // Set loading to false once the check is complete
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); 

  const value = { user, userRole, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  return useContext(AuthContext);
};