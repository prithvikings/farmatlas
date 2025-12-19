import React from "react";
import { motion } from "motion/react";
import { TextLoop } from "../ui/text-loop";
import { useNavigate } from "react-router-dom";
import { GetStartedButton } from "../ui/GetStartedButton";

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
  const navigate = useNavigate();
  const imageInfiniteScrollData = [
    {
      id: 1,
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
      alt: "React Logo",
    },
    {
      id: 3,
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png",
      alt: "Nodejs Logo",
    },
    {
      id: 5,
      src: "https://images.seeklogo.com/logo-png/44/2/mongodb-logo-png_seeklogo-444844.png",
      alt: "MongoDB Logo",
    },
    {
      id: 6,
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png",
      alt: "AWS Logo",
    },
    {
      id: 7,
      src: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
      alt: "Tailwind CSS Logo",
    },
    {
      id: 8,
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Redis_logo.svg/2560px-Redis_logo.svg.png",
      alt: "Redis Logo",
    },
    {
      id: 9,
      src: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/4/jwt-icon-138bxvrhijus263d2f2wur.png/jwt-icon-aqjx58uyj3lrxtborzgyg.png?_a=DATAg1AAZAA0",
      alt: "JWT Logo",
    },
    {
      id: 10,
      src: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      alt: "Motion Logo",
    },
    {
      id: 11,
      src: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/5/zod-jxeoj68ny4h94671educq4.png/zod-xe0a17we1j8ox6lns9ruf.png?_a=DATAg1AAZAA0",
      alt: "Zod Logo",
    },
    {
      id: 12,
      src: "https://avatars.githubusercontent.com/u/16486629?s=200&v=4",
      alt: "Nodemailer Logo",
    },
    {
      id: 13,
      src: "https://images.seeklogo.com/logo-png/48/2/docker-logo-png_seeklogo-481255.png",
      alt: "Docker Logo",
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
            font-poppins font-medium text-center   text-zinc-700 dark:text-zinc-500
            text-2xl sm:text-3xl lg:text-4xl
            leading-snug sm:leading-tight
            max-w-xs sm:max-w-2xl lg:max-w-4xl
            selection:bg-[#EA580C] selection:text-zinc-100
          "
        >
          <span className="dark:text-zinc-200 text-zinc-900">
            Manage Animals.
          </span>{" "}
          Stop Errors. <br className="hidden sm:block" /> Keep{" "}
          <span className="dark:text-zinc-200 text-zinc-900">Control..</span>
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
          Track health, feed,{" "}
          <span className="hidden md:inline">inventory, </span>and finances
          across your farm with specific <TextLoopCustomVariantsTransition />
        </p>

        <GetStartedButton />
      </div>

      {/* Powered by Modern Tech */}
      <div className="w-full mt-14 sm:mt-20 px-4 flex flex-col items-center">
        <h1 className="font-poppins text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-400 tracking-tight">
          Powered by Modern Tech
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
                  width={800} // Add the actual pixel width of your source image
                  height={600}
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
