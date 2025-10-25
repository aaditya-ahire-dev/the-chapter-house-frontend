'use server'; 
import { cookies } from 'next/headers';
import admin from '@/app/lib/firebase-admin'; 

export async function verifySession() {
 const cookieStore = await cookies();
 const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {

    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie, true);
    return decodedToken;
  } catch (error) {
    return null;
  }
}