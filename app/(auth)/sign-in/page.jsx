"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { images } from "../../../public/constants"
import FormField from '@/components/custom/FormField'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/Context/useAuth'

const SignInPage = () => {
  const { loginUser } = useAuth();

  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    setIsSubmitting(true)
    try {
      const result = await loginUser(form.email, form.password)

      if (result) {
        toast(
          <p className='text-sm font-bold text-green-500'>
            Logged in Successfully
          </p>
        )
        router.push('/dashboard')
      }
    } catch (error) {
      console.log("register error: ", error);
      toast(
        <p className='text-sm font-bold text-red-500'>
          Internal error occured while logging in the user
        </p>
      )
    }
    setIsSubmitting(false)
  }

  return (
    <div className='p-10'>
      <div className='flex flex-col justify-start items-start w-full px-4 my-6'>
        <Image src={images.logo} alt='logo' width={100} height={100} />

        <h2 className='mt-4 text-lg font-semibold'>
          Sign In
        </h2>

        <div className='w-full'>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e.target.value })}
            otherStyles="mt-7"
            keyboardType="email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e.target.value })}
            otherStyles="mt-7"
          />

          <Button onClick={submit} className="mt-7 bg-secondary hover:bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center text-primary font-bold w-full" disabled={isSubmitting}>
            Sign In
          </Button>

          <p className='text-xs text-center mt-5'>Don't have an account? <Link href={'/sign-up'} className='text-secondary-100 cursor-pointer'>Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage