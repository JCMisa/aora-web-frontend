"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useAuth } from '@/Context/useAuth';
import { icons, images } from '@/public/constants';
import { getUserByEmail } from '@/Services/UserService';
import { getAllVideos } from '@/Services/VideoService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const DashboardPage = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const user = JSON.parse(localStorage.getItem('user'));


    const [userInfo, setUserInfo] = useState()
    const [videos, setVideos] = useState()

    const [play, setPlay] = useState(false)
    const videoRef = useRef(null);

    const handlePlay = () => {
        videoRef.current.play();
    };

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
    }, [])

    const getUser = async (email) => {
        const result = await getUserByEmail(email)
        if (result) {
            setUserInfo(result.data);
            console.log(result.data);
        } else {
            console.log("error fetching user by email");
        }
    }


    // get all videos
    useEffect(() => {
        getAllVideosFromDb()
    }, [])

    const getAllVideosFromDb = async () => {
        const result = await getAllVideos();
        if (result) {
            setVideos(result.data);
            console.log("videos: ", result.data);

        } else {
            console.log("error fetching all videos");
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <Button onClick={handleLogout}>Logout</Button>
            <div className='flex flex-row justify-between items-end'>
                <div>
                    <p className='text-sm text-gray-300'>Welcome Back</p>
                    <h2 className='text-xl font-bold'>{userInfo?.userName}</h2>
                </div>
                <Image src={images.logoSmall} alt='logo' width={30} height={20} />
            </div>

            <div className='relative'>
                <Input className="flex-1 text-white font-psemibold text-base focus:border-secondary-100 rounded-lg bg-black-100 border-black-200" placeholder="Search for a video topic..." />
                <Image src={icons.search} alt='serach' className='w-5 h-5 absolute right-3 bottom-3' />
            </div>

            <p className='text-sm mt-3'>Latest Videos</p>
            <div className='max-w-[100%] overflow-x-auto hide-scroll'>
                <div className='flex flex-row gap-5 justify-start items-start'>
                    {
                        videos && videos?.map((item, index) => (
                            <div key={item.id || index} className={`min-w-52 min-h-72 bg-black-100 rounded-[10%] relative`}>
                                <img src={item?.thumbnail} alt='thumbnail' width={100} height={100} className={`${play ? "" : "absolute top-0 left-0 w-full h-full object-cover"} rounded-[10%]`} />
                                <Image onClick={() => setPlay(true)} src={icons.play} alt='play' className='w-12 h-12 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                                <video src={item?.videoUrl} ref={videoRef} controls={false} muted={true} playsInline={true} autoPlay={play} className={`absolute top-0 left-0 w-full h-full ${play ? 'block' : 'hidden'}`}>

                                </video>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardPage