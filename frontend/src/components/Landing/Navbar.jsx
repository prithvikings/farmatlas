import React from 'react'
import {Headset,ChevronDown} from 'lucide-react'
import {motion} from 'motion/react';
const Navbar = () => {
  return (
    <motion.div
    initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.1 }}
    className='py-8 flex justify-between items-center'>
      <div
      
      className='flex justify-center items-center gap-6'>

        <h1 className='text-2xl font-roboto font-medium'>Farm

          <span className='text-green-700'>Atlas</span>
        </h1>
        <div className='flex justify-center items-center gap-8 text-md font-poppins'>
          <p className='cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 transition duration-300'>Features</p>
        <p className='cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 transition duration-300 flex items-center justify-center gap-2'>Pricing <ChevronDown size={16}/></p>
        <p className='cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 transition duration-300'>Faqs</p>
        </div>
      </div>
      <div className='flex justify-center items-center gap-6'>
        <h1 className='font-inter flex gap-2 items-center justify-center cursor-pointer text-zinc-700 hover:text-zinc-900 transition duration-300'>Support <Headset size={16}/></h1>
        <button className='rounded-full bg-green-500 px-6 py-2 text-white cursor-pointer hover:bg-green-700 transition duration-300 shadow-xl'>Get Start</button>
      </div>
    </motion.div>
  )
}

export default Navbar