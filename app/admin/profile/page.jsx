"use client";
import React, { useMemo, useState,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { ProfileIcon, EditSmallIcon , StarSmallIcon} from '@/app/services/IconSvg'
import AdminSidebar from '@/app/components/AdminSidebar'
import { updateUser } from '@/app/services/Api';
import { auth} from '@/app/lib/firebase';
import { updateProfile,updateEmail ,signOut} from 'firebase/auth';
import { useAuth } from '@/app/lib/AuthContext';
import { signOut as apiSignOut } from '@/app/services/Api';
function AccountProfile(){
    const { user, userRole } = useAuth();
    const [account, setAccount] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        if (user && userRole === 'admin') {
            setAccount(user);
        } else {
            setAccount(null); 
        }
    }, [user, userRole]);

    useEffect(() => {
        if (account) {
            setFormData({
                name: account.displayName || '',
                email: account.email || ''
            });
        }
    }, [account]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const nameChanged = formData.name !== account.displayName;
        const emailChanged = formData.email !== account.email;

        if (!nameChanged && !emailChanged) {
            alert("No changes were made.");
            return;
        }

        try {
            if (nameChanged) {
                await updateProfile(auth.currentUser, { displayName: formData.name });
            }
            if (emailChanged) {
                await updateEmail(auth.currentUser, formData.email);
            }
            
            await updateUser(account.uid, { name: formData.name, email: formData.email });

            alert("Profile updated successfully. You will be logged out.");
            await apiSignOut();
            await signOut(auth);
            router.push('/admin/login'); 

        } catch (error) {
            // Handle security error for email change
            if (error.code === 'auth/requires-recent-login') {
                const password = prompt("For security, please re-enter your password to change your email:");
                if (password) {
                    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
                    try {
                        await reauthenticateWithCredential(auth.currentUser, credential);
                        await handleFormSubmit(e); // Retry the submission
                    } catch (reauthError) {
                        alert("Incorrect password. Please try again.");
                    }
                }
            } else {
                alert(error.message || "Failed to update profile.");
            }
        }
    };
    if(!account){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">No account data found. Please log in.</div>
            </div>
        )
    }

    return(
        <div className="flex min-h-screen">
            {account.role === "admin" && (
            <AdminSidebar />
            )}
            <div className={`flex-1 bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 ${account.role === "admin" ? "lg:ml-60" : ""}`}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-10 text-center overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-gradient-to-b from-blue-200/40 to-blue-100/20 rounded-full blur-3xl" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium shadow-sm">
                       <StarSmallIcon/>
                        Profile
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                        Account Profile
                    </h1>
                    <div className="mt-6 mx-auto h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                </div>

                {/* Added a container to constrain width on larger screens */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <span className="cursor-pointer transition-transform duration-300 ease-out hover:scale-110">
                                <ProfileIcon />
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">{account.displayName}</h2>
                            <p className="text-sm text-gray-500">{account.email}</p>
                        </div>
                        <div className="ml-auto">
                            <button onClick={() => setIsEditing((v) => !v)} className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md group">
                                <span className="transition-transform duration-300 ease-out group-hover:rotate-3 group-hover:scale-110">
                                    <EditSmallIcon />
                                </span>
                                {isEditing ? 'Close' : 'Edit'}
                            </button>
                        </div>
                    </div>

                    {!isEditing && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 sm:col-span-2">
                                <p className="text-sm text-gray-500">Account ID</p>
                                <p className="text-gray-900 font-medium break-all">{account.uid}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="text-gray-900 font-medium break-all">{account.displayName}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-gray-900 font-medium break-all">{account.email}</p>
                            </div>
                           
                        </div>
                    )}

                    {isEditing && (
                        <form onSubmit={handleFormSubmit} className="mt-6 space-y-5">
                            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm">
                                Warning: Changing your profile details will log you out. You will need to log in again.
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button type="submit" className="cursor-pointer px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md">
                                    Save Changes
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="cursor-pointer px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium transition-all duration-300 hover:bg-gray-200">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountProfile;