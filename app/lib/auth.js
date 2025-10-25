'use server';
import { cookies } from 'next/headers';

 
export async function getAuthToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  return token?.value || false
}
 
export async function getAdminAuthToken() {
  const cookieStore = await cookies()
  const admin_token = cookieStore.get('admin_token')
  return admin_token?.value || false
}