'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function userLogoutAction() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (token) {
        cookieStore.delete('token');
    }
    redirect('/login');
}

export async function adminLogoutAction() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (token) {
        cookieStore.delete('admin_token');
    }
    redirect('/admin/login');
}