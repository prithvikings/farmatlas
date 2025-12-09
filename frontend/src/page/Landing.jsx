import Hero from '../components/Landing/Hero'
import Navbar from '../components/Landing/Navbar'
import Bentogrid from '../components/Landing/Bentogrid'
import Features from '../components/Landing/Features'
import {AccordionComp} from '../components/AccordianComp'
import { CheckIcon } from "@radix-ui/react-icons"
import { PricingSection } from '../components/pricing-section'
import Whatwedo from '../components/Landing/Whatwedo'
import { MinimalFooter } from '../components/minimal-footer'
import { useRef } from 'react';

const Landing = () => {

const featuresRef = useRef(null);
const pricingRef = useRef(null);
const faqsRef = useRef(null);

  const tiers = [
  {
    name: "Starter",
    highlight: false,
    badge: null,
    icon: <CheckIcon />, // replace with any icon you prefer
    price: { monthly: 9, yearly: 90 },
    description: "Perfect for small farms getting started.",
    features: [
      { name: "Animal tracking", description: "Full animal profiles", included: true },
      { name: "Feed logs", description: "Basic feed entries", included: true },
      { name: "Health records", description: "Manually logged", included: false },
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
      { name: "Animal tracking", description: "Full animal profiles", included: true },
      { name: "Health alerts", description: "Automatic warnings", included: true },
      { name: "Inventory alerts", description: "Low-stock monitoring", included: true },
      { name: "Finance dashboard", description: "Income, expenses", included: true },
    ],
  },
];

  return (
    <div>
      {/* Section 1 */}
      <div
        className="w-full min-h-screen relative 
        bg-gradient-to-b from-zinc-100 to-white "
      >
        <div className="mx-auto max-w-6xl">
          <Navbar featuresRef={featuresRef} pricingRef={pricingRef} faqsRef={faqsRef} />
          <Hero />
        </div>
        <div className='mx-auto max-w-4xl mt-16 pt-18'>
          <Bentogrid />
        </div>
        <div ref={featuresRef} className='mx-auto max-w-4xl pt-16'>
          {/* Features Component */}
          <Features />
        </div>
        <div ref={pricingRef} className='mx-auto max-w-4xl pt-16'>
          {/* Pricing Component */}
          <PricingSection tiers={tiers} />

        </div>
        <div className='mx-auto max-w-4xl'>
          < Whatwedo />
        </div>
        <div  className='mx-auto max-w-4xl pt-16 pb-16'>
          {/* Faqs Component */}
          <h1 ref={faqsRef} className='text-xl font-poppins font-medium mb-6'>Frequently Asked Questions</h1>
          <AccordionComp />
        </div>

        <div>
          {/* Footer Component */}
          <MinimalFooter />
        </div>
      </div>

    </div>
  )
}

export default Landing