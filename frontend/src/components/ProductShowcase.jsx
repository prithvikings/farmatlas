import { useState, useRef } from "react";
import { motion, useInView } from "motion/react"; // IMPORT THIS
// REPLACE WITH YOUR ACTUAL PATHS
import lightDashboard from "../assets/dashboard-light.png";
import darkDashboard from "../assets/dashboard-dark.png";

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState("light");
  const ref = useRef(null);
  // This creates the "trigger" - animation starts when 30% of the component is visible
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animation Variants for cleaner code
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Custom bezier for "premium" feel
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full mx-auto max-w-5xl px-4 sm:px-6 mt-16 sm:mt-40 mb-24 font-poppins"
    >
      {/* 1. TEXT ANIMATION */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="text-center mb-10 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-poppins font-medium tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Complete control, <br />
          <span className="text-zinc-500">day or night.</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
          Manage your livestock, finances, and staff from a single, beautiful
          dashboard. Optimized for clarity in any lighting condition.
        </p>
      </motion.div>

      {/* 2. TOGGLE ANIMATION (Delay added) */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ delay: 0.2 }} // Stagger effect
        className="flex justify-center mb-10"
      >
        <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-full border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-sm inline-flex shadow-inner">
          <button
            onClick={() => setActiveTab("light")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out ${
              activeTab === "light"
                ? "bg-white text-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.1)] ring-1 ring-black/5"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setActiveTab("dark")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out ${
              activeTab === "dark"
                ? "bg-zinc-700 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] ring-1 ring-white/10"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            }`}
          >
            Dark Mode
          </button>
        </div>
      </motion.div>

      {/* 3. DASHBOARD IMAGE ANIMATION (Delay + Scale) */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={scaleIn}
        transition={{ delay: 0.3 }} // Enters last for dramatic effect
        className="relative group"
      >
        {/* Glow Effect */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-2xl blur-xl opacity-0 transition duration-1000 group-hover:opacity-100 ${
            activeTab === "light"
              ? "group-hover:opacity-40"
              : "group-hover:opacity-30"
          }`}
        ></div>

        {/* Browser Window Frame */}
        <div className="relative rounded-xl bg-zinc-50 dark:bg-zinc-900 ring-1 ring-zinc-900/5 dark:ring-white/10 shadow-2xl overflow-hidden">
          {/* Browser Header */}
          <div className="h-9 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 justify-between">
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 "></div>
            </div>
            <div className="hidden sm:block text-[10px] text-zinc-400 font-medium bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-md border border-zinc-100 dark:border-zinc-700/50">
              app.farmatlas.com/dashboard
            </div>
            <div className="w-10"></div>
          </div>

          {/* Image Wrapper */}
          <div className="bg-zinc-100 dark:bg-zinc-950/50 p-1 sm:p-2">
            <img
              src={activeTab === "light" ? lightDashboard : darkDashboard}
              alt="FarmAtlas Dashboard"
              width={800} // Add the actual pixel width of your source image
              height={600}
              className="w-full h-auto rounded-lg shadow-sm border border-zinc-200/50 dark:border-zinc-800/50"
            />
          </div>
        </div>

        {/* Reflection */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
      </motion.div>
    </section>
  );
};

export default ProductShowcase;
