import React from 'react'
import {motion} from 'motion/react';

const Hero = () => {
  
  const imageInfiniteScrollData = [
    {
      id: 1,
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/PepsiCo_logo.svg/2500px-PepsiCo_logo.svg.png",
      alt: "PepsiCo Logo",
    },
    {
      id: 3,
      src: "https://1000logos.net/wp-content/uploads/2017/03/Nestle-Logo.png",
      alt: "Nestle Logo",
    },
    {
      id: 5,
      src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/ITC_Limited_Logo.svg",
      alt: "ITC Limited Logo",
    },
    {
      id: 6,
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Britannia_Industries_logo.svg/1200px-Britannia_Industries_logo.svg.png",
      alt: "Britannia Industries Logo",
    },
    {
      id: 7,
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1200px-Dabur_Logo.svg.png",
      alt: "Dabur Logo",
    },
    {
      id: 8,
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Marico_Logo.svg/1200px-Marico_Logo.svg.png",
      alt: "Marico Logo",
    },
    {
      id: 9,
      src: "https://upload.wikimedia.org/wikipedia/en/2/22/Varun_Beverages.svg",
      alt: "Varun Beverages Logo",
    },
    {
      id: 10,
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo.svg/1200px-Procter_%26_Gamble_logo.svg.png",
      alt: "Procter & Gamble Logo",
    },
  ];
  return (
    <div>
      <div className='flex items-center justify-center flex-col mt-18'>
      <motion.h1 
      initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.2 }}
      className='font-poppins text-4xl max-w-4xl text-center font-medium leading-tight text-zinc-900'>Manage Animals. Stop Errors. <br /> Keep Control..</motion.h1>
      <motion.p 
      initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.3 }}
      className='max-w-lg text-center font-inter mt-8 text-zinc-700'>Track health, feed, and finances across your farm with specific access for Workers, Vets, and Admin.</motion.p>
      <motion.button 
      initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.4 }}
      className='rounded-full bg-green-600 px-4 py-2 text-white mt-8 hover:bg-green-700 cursor-pointer transition duration-300 shadow-xl'>Get 14 days Free Access</motion.button>
    </div>
    <div className="w-full mt-16 px-4 flex flex-col items-center justify-center">
          <h1 className="font-poppins text-sm font-medium text-neutral-900 tracking-tight">
            Trusted By
          </h1>

          <div
            className="w-full overflow-hidden mt-6 relative
    [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            <div className="flex w-max animate-infinite-logo">
              {imageInfiniteScrollData
                .concat(imageInfiniteScrollData)
                .map(({ id, src, alt }, index) => (
                  <img
                    key={id + "-img-" + index}
                    src={src}
                    alt={alt}
                    className="size-20 mx-8 object-contain opacity-80 hover:opacity-100 transition grayscale hover:grayscale-0"
                  />
                ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero