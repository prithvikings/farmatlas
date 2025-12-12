import React, { useState, useEffect } from "react";
import { Headset, ChevronDown, Ghost } from "lucide-react";
import { motion, animate } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Togglebtn } from "../togglebtn";
const Navbar = ({ featuresRef, pricingRef, faqsRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll position is beyond a certain threshold (e.g., 80px)
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const location = useLocation();
  const isSupportPage = location.pathname.startsWith("/support");
  // Function to smoothly scroll to a section
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const targetY = ref.current.offsetTop;
      const currentY = window.scrollY;

      animate(currentY, targetY, {
        type: "tween",
        duration: 0.8,
        ease: "easeInOut",
        onUpdate: (latest) => {
          window.scrollTo(0, latest);
        },
      });
    }
  };

  const NavLinks = () => (
    <div className="flex justify-center items-center gap-8 text-md font-poppins">
      <p
        onClick={() => scrollToSection(featuresRef)}
        className="cursor-pointer text-sm text-zinc-700  hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-300 transition duration-300"
      >
        Features
      </p>
      <p
        onClick={() => scrollToSection(pricingRef)}
        className="cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-300 transition duration-300 flex items-center justify-center gap-2"
      >
        Pricing
      </p>
      <p
        onClick={() => scrollToSection(faqsRef)}
        className="cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-300 transition duration-300"
      >
        Faqs
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(2px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeIn", delay: 0.1 }}
      // Apply fixed position, full width, and blurring effect here
      className={`transition-all duration-500 z-50 max-w-6xl mx-auto w-full
                            ${
                              isScrolled
                                ? "fixed top-0 backdrop-blur-[2px] supports-backdrop-blur:bg-white/10"
                                : "relative bg-transparent" // Stays relative and transparent when at top
                            }`}
    >
      {/* 2. INNER CONTAINER: Applies max-width and centering, ensuring content alignment */}
      <div
        className={`pt-4 pb-2 flex justify-between items-center transition-all duration-500 mx-auto max-w-6xl px-6`}
      >
        <div className="flex justify-center items-center gap-6">
          <Link
            to="/"
            className="text-2xl font-roboto font-medium dark:text-white"
          >
            Farm
            <span className="text-[#EA580C]">Atlas</span>
          </Link>

          {!isSupportPage && <NavLinks />}
        </div>
        <div className="flex justify-center items-center gap-6">
          <Link
            to="/support"
            className={`font-inter flex gap-2 items-center justify-center cursor-pointer text-zinc-700 hover:text-zinc-900  dark:text-zinc-100 dark:hover:text-zinc-300 transition duration-300`}
          >
            Support <Headset size={16} />
          </Link>
          <Link
            to="/signin"
            className="rounded-full bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] px-6 py-2 text-white cursor-pointer  transition duration-300 shadow-xl"
          >
            Get Start
          </Link>
          <Togglebtn />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
