import React, { useState, useEffect } from "react";
import { Headset, Menu, X } from "lucide-react";
import { motion, animate } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Togglebtn } from "../togglebtn";

const Navbar = ({ featuresRef, pricingRef, faqsRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const isSupportPage = location.pathname.startsWith("/support");

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
        className="cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-300 transition duration-300"
      >
        Features
      </p>
      <p
        onClick={() => scrollToSection(pricingRef)}
        className="cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-300 transition duration-300"
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
      className={`transition-all duration-500 z-50 max-w-6xl mx-auto w-full
        ${
          isScrolled
            ? "fixed top-0 backdrop-blur-[2px] supports-backdrop-blur:bg-white/10"
            : "relative bg-transparent"
        }`}
    >
      {/* MAIN NAVBAR */}
      <div className="pt-4 pb-2 flex justify-between items-center mx-auto max-w-6xl px-6">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-2xl font-roboto font-medium dark:text-white"
          >
            Farm<span className="text-[#EA580C]">Atlas</span>
          </Link>

          {/* Desktop Nav Links */}
          {!isSupportPage && (
            <div className="hidden lg:block">
              <NavLinks />
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 dark:text-zinc-100"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/support"
              className="flex gap-2 items-center text-zinc-700 hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-300 transition"
            >
              Support <Headset size={16} />
            </Link>

            <Link
              to="/signin"
              className="rounded-full bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] px-4 py-1.5 text-white shadow-xl hover:scale-105 active:scale-95 font-poppins transition duration-300"
            >
              Get Start
            </Link>

            <Togglebtn />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && !isSupportPage && (
        <div className="lg:hidden px-6 pb-4">
          <div className="flex flex-col gap-4 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-lg">
            <p
              onClick={() => {
                scrollToSection(featuresRef);
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-sm text-zinc-700 dark:text-zinc-100"
            >
              Features
            </p>

            <p
              onClick={() => {
                scrollToSection(pricingRef);
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-sm text-zinc-700 dark:text-zinc-100"
            >
              Pricing
            </p>

            <p
              onClick={() => {
                scrollToSection(faqsRef);
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-sm text-zinc-700 dark:text-zinc-100"
            >
              Faqs
            </p>

            <Link
              to="/support"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-100"
            >
              Support <Headset size={14} />
            </Link>

            <Link
              to="/signin"
              onClick={() => setIsMenuOpen(false)}
              className="text-center rounded-full bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] px-4 py-2 text-white"
            >
              Get Start
            </Link>

            <div className="pt-2">
              <Togglebtn />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;

{
  /* <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-zinc-200 dark:bg-zinc-800 rounded-sm grid place-items-center">
              <div className="h-3 w-3 border-2 border-orange-500 rounded-full" />
            </div>
            <span className="text-zinc-700 dark:text-zinc-300 font-poppins font-medium tracking-tight text-xl">
              FarmAtlas
            </span>
          </div> */
}
