'use client'
import React from 'react'
import Button from './Button'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className='mx-auto border-b-stone-300 border-2'>
      <div className=' max-w-7xl mx-auto  flex justify-between items-center px-4 py-2'>
        <Link href={'/'}>
          <h1 className=' font-bold'>LOGO</h1>
        </Link>
        <div className="flex items-center justify-center">
          <Button title='Create Resume' path='/generate' />
          <div className="pl-2">
            {user ? <UserButton />: 
            <div >
            <Button outlined title='Sign In' path='/sign-in' />
            </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
