import React from 'react'
import Hero from '../components/Landing/Hero'
import Navbar from '../components/Landing/Navbar'
import Bentogrid from '../components/Landing/Bentogrid'
import Features from '../components/Landing/Features'

const Landing = () => {
  return (
    <div>
      {/* Section 1 */}
      <div
        className="w-full min-h-screen relative 
        bg-gradient-to-b from-zinc-100 to-white "
      >
        <div className="mx-auto max-w-6xl">
          <Navbar />
          <Hero />
        </div>
        <div className='mx-auto max-w-4xl mt-16 py-18'>
          <Bentogrid />
        </div>
        <div className='mx-auto max-w-4xl py-18'>
          {/* Features Component */}
          <Features />
        </div>
      </div>

    </div>
  )
}

export default Landing