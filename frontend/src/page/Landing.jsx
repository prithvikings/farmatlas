import Hero from "../components/Landing/Hero";
import Navbar from "../components/Landing/Navbar";
import Bentogrid from "../components/Landing/Bentogrid";
import Features from "../components/Landing/Features";
import { AccordionComp } from "../components/AccordianComp";
import { CheckIcon } from "@radix-ui/react-icons";
import { PricingSection } from "../components/pricing-section";
import Whatwedo from "../components/Landing/Whatwedo";
import { MinimalFooter } from "../components/minimal-footer";
import HowitWork from "../components/Landing/HowitWork";
import ProductShowcase from "../components/ProductShowcase";
import { useRef } from "react";

const Landing = () => {
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const faqsRef = useRef(null);

  const tiers = [
    {
      name: "Starter",
      highlight: false,
      badge: null,
      icon: <CheckIcon />,
      price: { monthly: 9, yearly: 90 },
      description: "Perfect for small farms getting started.",
      features: [
        {
          name: "Animal tracking",
          description: "Full animal profiles",
          included: true,
        },
        {
          name: "Feed logs",
          description: "Basic feed entries",
          included: true,
        },
        {
          name: "Health records",
          description: "Manually logged",
          included: false,
        },
      ],
    },
    {
      name: "Pro",
      highlight: true,
      badge: "Most Popular",
      icon: <CheckIcon />,
      price: { monthly: 19, yearly: 190 },
      description: "Best for growing farms needing automation and alerts.",
      features: [
        {
          name: "Animal tracking",
          description: "Full animal profiles",
          included: true,
        },
        {
          name: "Health alerts",
          description: "Automatic warnings",
          included: true,
        },
        {
          name: "Inventory alerts",
          description: "Low-stock monitoring",
          included: true,
        },
        {
          name: "Finance dashboard",
          description: "Income, expenses",
          included: true,
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black">
      {/* HERO SECTION */}
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Navbar
            featuresRef={featuresRef}
            pricingRef={pricingRef}
            faqsRef={faqsRef}
          />
          <Hero />
        </div>
        <ProductShowcase />
      </div>

      {/* BENTO */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Bentogrid />
      </div>

      {/* FEATURES */}
      <div
        ref={featuresRef}
        className="mx-auto max-w-4xl mt-12 sm:mt-16 px-4 sm:px-6"
      >
        <Features />
      </div>

      {/* PRICING */}
      <div
        ref={pricingRef}
        className="mx-auto max-w-4xl mt-12 sm:mt-16 px-4 sm:px-6"
      >
        <PricingSection tiers={tiers} />
      </div>

      {/* WHAT WE DO */}
      <div className="mx-auto max-w-4xl mt-12 sm:mt-16 px-4 sm:px-6">
        <Whatwedo />
      </div>

      {/* HOW IT WORKS */}
      <div className="mx-auto max-w-6xl mt-12 sm:mt-16 px-4 sm:px-6">
        <HowitWork />
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-4xl mt-12 sm:mt-16 pb-12 sm:pb-16 px-4 sm:px-6">
        <h1
          ref={faqsRef}
          className="text-lg sm:text-xl font-poppins font-medium mb-4 sm:mb-6 selection:bg-[#EA580C] selection:text-zinc-100"
        >
          Frequently Asked Questions
        </h1>
        <AccordionComp />
      </div>

      {/* FOOTER */}
      <MinimalFooter />
    </div>
  );
};

export default Landing;

// //<div className="relative w-full min-h-screen bg-white dark:bg-zinc-950 selection:bg-orange-500/30">

//   {/* 1. Technical Grid Pattern (The "Premium" Texture) */}
//   <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

//   {/* 2. Ambient Top Glow (Adds depth behind the header) */}
//   <div className="absolute left-0 right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-orange-500/20 opacity-50 blur-[80px] m-auto pointer-events-none"></div>
//   {/* 3. Subtle Bottom Glow (Enhances footer area) */}
//   <div className="absolute left-0 right-0 bottom-[-10%] h-[400px] w-[400px] rounded-full bg-orange-500/10 opacity-50 blur-[80px] m-auto pointer-events-none"></div>

// <div className="relative w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 selection:bg-orange-500/30 overflow-hidden">

//   {/* 1. The "Stage Light" (Top Center Glow) */}
//   {/* This creates that premium 'sunrise' effect behind your nav/hero */}
//   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-30 dark:opacity-20 pointer-events-none">
//     <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0 blur-[100px]" />
//   </div>

//   {/* 2. The Technical Grid (Masked) */}
//   {/* We use [mask-image] to fade the grid out at the edges, so it looks like it's emerging from the center */}
//   <div className="absolute inset-0 h-full w-full pointer-events-none">
//       <div className="absolute h-full w-full
//         bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
//         bg-[size:24px_24px]
//         [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
//       </div>
//   </div>

//   {/* 3. Subtle Noise Texture (Optional: Adds 'film grain' realism) */}
//   <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
