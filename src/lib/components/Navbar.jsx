import React from 'react'
import Button from './Button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='mx-auto border-b-stone-300 border-2'>
    <div className=' max-w-7xl mx-auto  flex justify-between items-center px-4 py-2'>
      <Link href={'/'}>
      <h1 className=' font-bold'>LOGO</h1>
      </Link>
        <Button title='Create Resume' path='/generate'/>
    </div>
    </nav>
  )
}

export default Navbar
