'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import SignInButton from './SignInButton';

export default function Header() {
    const router = useRouter();
  return (
    <div className='w-full h-12 shadow-2xl flex items-center'>
        <div className='container flex items-center justify-between'>
            <div onClick={() => router.push('/') } className='cursor-pointer'>FORM GENERATOR</div>
            <SignInButton />
        </div>
    </div>
  )
}

