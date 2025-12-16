import React from "react";
import { motion } from "motion/react";
import { TextLoop } from "../ui/text-loop";

export function TextLoopCustomVariantsTransition() {
  return (
    <span className="inline-flex whitespace-pre-wrap">
      acess for{" "}
      <TextLoop
        className="overflow-y-clip"
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 80,
          mass: 10,
        }}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: "blur(4px)",
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: "blur(4px)",
          },
        }}
      >
        <span>Workers</span>
        <span>Admin</span>
        <span>Vet</span>
      </TextLoop>
    </span>
  );
}

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
      {/* HERO CONTENT */}
      <div className="flex flex-col items-center justify-center mt-14 sm:mt-20 px-4">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeIn", delay: 0.2 }}
          className="
            font-poppins font-medium text-center text-zinc-900 dark:text-zinc-200
            text-2xl sm:text-3xl lg:text-4xl
            leading-snug sm:leading-tight
            max-w-xs sm:max-w-2xl lg:max-w-4xl
            selection:bg-[#EA580C] selection:text-zinc-100
          "
        >
          Manage Animals. Stop Errors. <br className="hidden sm:block" /> Keep
          Control..
        </motion.h1>

        <p
          className="
            mt-6 sm:mt-8
            max-w-xs sm:max-w-md
            text-center font-inter
            text-sm sm:text-base
            text-zinc-700 dark:text-zinc-400
            selection:bg-[#EA580C] selection:text-zinc-100
          "
        >
          Track health, feed, and finances across your farm with specific{" "}
          <TextLoopCustomVariantsTransition />
        </p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeIn", delay: 0.4 }}
          className="
            mt-6 sm:mt-8
            rounded-full
            bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
            px-5 sm:px-6 py-2.5
            text-sm sm:text-base
            text-white shadow-xl
            transition duration-300
          "
        >
          Get Started
        </motion.button>
      </div>

      {/* TRUSTED BY */}
      <div className="w-full mt-14 sm:mt-20 px-4 flex flex-col items-center">
        <h1 className="font-poppins text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-400 tracking-tight">
          Trusted By
        </h1>

        <div
          className="
            w-full overflow-hidden mt-4 sm:mt-6 relative
            [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          "
        >
          <div className="flex w-max animate-infinite-logo">
            {imageInfiniteScrollData
              .concat(imageInfiniteScrollData)
              .map(({ id, src, alt }, index) => (
                <img
                  key={id + "-img-" + index}
                  src={src}
                  alt={alt}
                  className="
  size-12 sm:size-16 lg:size-20
  mx-4 sm:mx-6 lg:mx-8
  object-contain
  opacity-80 hover:opacity-100
  transition
  grayscale hover:grayscale-0
  dark:grayscale-0 dark:hover:grayscale-100
"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
