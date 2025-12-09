import React from 'react';
import {Headset,ChevronDown, Ghost} from 'lucide-react'
import {motion,animate} from 'motion/react';
import { Link, useLocation } from 'react-router-dom'; 
const Navbar = ({ featuresRef, pricingRef, faqsRef }) => {
    
    const location = useLocation();
    const isSupportPage = location.pathname.startsWith('/support');
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
                }
            });
        }
    };

    const NavLinks = () => (
        <div className='flex justify-center items-center gap-8 text-md font-poppins'>
            <p 
                onClick={() => scrollToSection(featuresRef)} 
                className='cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 transition duration-300'
            >
                Features
            </p>
            <p 
                onClick={() => scrollToSection(pricingRef)} 
                className='cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 transition duration-300 flex items-center justify-center gap-2'
            >
                Pricing
            </p>
            <p 
                onClick={() => scrollToSection(faqsRef)} 
                className='cursor-pointer text-sm text-zinc-700 hover:text-zinc-900 transition duration-300'
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
        className='py-8 flex justify-between items-center'>
            <div className='flex justify-center items-center gap-6'>

                <Link to='/' className='text-2xl font-roboto font-medium'>Farm
                    <span className='text-green-700'>Atlas</span>
                </Link>
                
                {!isSupportPage && <NavLinks />} 

            </div>
            <div className='flex justify-center items-center gap-6'>
                {/* Use ternary logic to highlight Support link if on support page */}
                <Link 
                to='/support'
                className={`font-inter flex gap-2 items-center justify-center cursor-pointer transition duration-300`}
                >
                    Support <Headset size={16}/>
                </Link>
                <button className='rounded-full bg-green-500 px-6 py-2 text-white cursor-pointer hover:bg-green-700 transition duration-300 shadow-xl'>Get Start</button>
            </div>

        </motion.div>
    )
}

export default Navbar