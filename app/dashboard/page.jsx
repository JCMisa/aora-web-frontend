"use client"

import { Button } from '@/components/ui/button'
import { useAuth } from '@/Context/useAuth';
import { getUserByEmail } from '@/Services/UserService';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const DashboardPage = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            const result = await logout();

            if (result) {
                toast(
                    <p className='text-sm font-bold text-green-500'>
                        Logged out successfully
                    </p>
                )
                router.push('/');
            }
        } catch (error) {
            console.log("log out error: ", error);
            toast(
                <p className='text-sm font-bold text-red-500'>
                    Internal error occured while logging out the user
                </p>
            )
        }
    }

    useEffect(() => {
        getUser(user?.email)
    }, [user])

    const getUser = async (email) => {
        const result = await getUserByEmail(email)
        if (result) {
            console.log(result.data);
        } else {
            console.log("error fetching user by email");
        }
    }

    return (
        <div>
            <Button className="bg-secondary cursor-pointer hover:bg-secondary-200" onClick={handleLogout}>Log out</Button>
            DashboardPage
            <p className='text-white'>{user?.email}</p>
        </div>
    )
}

export default DashboardPage