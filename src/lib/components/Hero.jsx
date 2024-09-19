import Image from 'next/image'
import React from 'react'
import Button from './Button'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <>
    <Navbar/>
    <div className="max-w-7xl pt-4 mx-auto grid grid-cols-1 items-start lg:grid-cols-2 lg:pb-8 pb-6">
      
      <div className="flex flex-col h-full px-6 justify-center items-center pb-4">
            <div >
            <h3 className='font-bold text-lg'>Fast. Easy. Effective.</h3>
            <h2 className='font-bold md:text-5xl text-4xl'>Alpha! The Best CV Maker Online.</h2>
            <p className='mb-4'>If a sheet of paper represents your entire work life, personality, and skills, it better be a pretty amazing piece of paper — Let Zety do the heavy lifting.</p>
            <Button  title='Create Your Resume Now' path='/generate'/>
            </div>
      </div>
    

      <div className="">
        <Image 
            src={'/images/hero-image.avif'}
            alt='hero image'
            width={500}
            height={500}
        ></Image>
      </div>

    </div>
    </>
  )
}

export default Hero
