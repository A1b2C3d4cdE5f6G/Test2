'use client'
import Link from 'next/link'
import React from 'react'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
// import { dark, light } from '@clerk/themes';

// import { useTheme } from 'next-themes';
// import { FaMoon, FaSun } from 'react-icons/fa';
const header = () => {
  // const{theme,setTheme} = useTheme()
  return (
    <header>

       <div className='flex container mx-auto justify-between my-[50px]'>
        <div className='flex gap-30'>
         <span>Phoshino ForWorled</span>
         <ul className='flex gap-10'>
        <li>
          <Link href={'/'}>
           Home
         </Link>
        </li>
       <li>
          <Link href={'home'}>
           Man
          </Link>
        </li>
        <li>
           <Link href={'home'}>
            Women
           </Link>
         </li>
         <li>
           <Link href={'home'}>
             Chiled
           </Link>
          </li>
         </ul>  
        </div>
        <div className='flex gap-15' >   
          <div>
            <form action="#" className='flex items-center'>
          <input type="text" placeholder='Search...' className=''/>
          <button>
          </button>
            </form>
          </div>
          <div className='flex gap-5'>
            <Link href='/Cart'>
            ygjg
            </Link>
            <Link href='/Favorit'> 
            hgg
            </Link>
          </div>
            <SignedIn>
             <UserButton
              //  appearance={{
              //  baseTheme: theme === 'light' ? light : dark,
              //   }}
              //  userProfileUrl='/dashboard?tab=profile'
            />
            </SignedIn>
            <SignedOut>
              <Link href={'/sign-in'}>
              <button>logn</button> 
              </Link>           
            </SignedOut>
        </div>
       </div>
  
    </header>
  )
}

export default header