"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { icons } from '@/public/constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={`space-y-2 ${otherStyles}`}>
            <label className='text-base text-gray-100 font-medium'>{title}</label>

            <div className='relative'>
                <Input
                    className='flex-1 text-white font-psemibold text-base focus:border-secondary-100'
                    value={value}
                    type={!showPassword && title == "Password" ? "password" : keyboardType}
                    placeholder={placeholder}
                    onChange={handleChangeText}
                />
                {title == "Password" && (
                    <Image onClick={() => setShowPassword(!showPassword)} src={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6 absolute right-3 bottom-2 cursor-pointer' sizes='contain' />
                )}
            </div>
        </div>
    )
}

export default FormField