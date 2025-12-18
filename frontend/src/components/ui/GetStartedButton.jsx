import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
export function GetStartedButton() {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => navigate("/signin")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeIn", delay: 0.4 }}
      className="group relative overflow-hidden mt-6 sm:mt-8
      rounded-md md:mt-5 md:px-4
            bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
            px-5 sm:px-6 py-2.5  
            text-sm sm:text-base
            text-white shadow-xl
            transition duration-300
            cursor-pointer font-poppins
            font-medium"
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        Explore More
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </motion.button>
  );
}
