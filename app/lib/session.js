'use server'; 
import { cookies } from 'next/headers';
import admin from '@/app/lib/firebase-admin'; 

export async function verifySession() {
 const cookieStore = await cookies();
     // --- START DEBUG LOGGING ---
    const allCookies = cookieStore.getAll();
    console.log('--- SERVER COMPONENT COOKIE CHECK ---');
    console.log(`Total cookies found: ${allCookies.length}`);

        
    const sessionCookieEntry = allCookies.find(c => c.name === 'session');

    if (!sessionCookieEntry) {
        console.log('RESULT: Session cookie NOT found in request headers.');
        console.log('All cookies received:', JSON.stringify(allCookies.map(c => c.name)));
        return null;
    }
    // --- END DEBUG LOGGING ---


    const sessionCookie = sessionCookieEntry.value;

  if (!sessionCookie) {
    return null;
  }

  try {

 const decodedToken = await admin.auth().verifySessionCookie(sessionCookie, true);
        console.log('RESULT: Session verification successful.');
        return decodedToken;
  } catch (error) {
    return null;
  }
}