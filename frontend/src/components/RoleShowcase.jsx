import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircledIcon,
  PersonIcon,
  BackpackIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import Farm from "../assets/Farm.webp";
import Worker from "../assets/Worker.webp";
import Vet from "../assets/Vet.webp";
import { cn } from "@/lib/utils";

// --- 1. THE RELAY BORDER TRAIL ---
// This component runs ONE lap and then dies (triggers callback)
const BorderTrail = ({ className, size = 60, onComplete }) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square bg-orange-500", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 5, // 5 seconds for exactly one lap
          ease: "linear",
          repeat: 0, // Do NOT repeat. Finish the lap.
        }}
        onAnimationComplete={onComplete} // Tell parent: "I'm done, switch tabs!"
      />
    </div>
  );
};

// --- DATA ---
const roles = [
  {
    id: "owner",
    label: "Farm Owner",
    icon: <PersonIcon />,
    title: "The Command Center",
    description:
      "Complete oversight from a single dashboard. Manage finances, authorize staff, and track global farm metrics in real-time.",
    capabilities: [
      "Financial Analytics",
      "Staff Authorization",
      "Inventory Control",
    ],
    color: "blue",
    image: Farm,
  },
  {
    id: "vet",
    label: "Veterinarian",
    icon: <HeartFilledIcon />,
    title: "Medical Authority",
    description:
      "Authorized access to health records. Update vaccination logs, prescribe treatments, and flag critical health alerts immediately.",
    capabilities: [
      "Health History Access",
      "Prescription Logging",
      "Epidemic Alerts",
    ],
    color: "rose",
    image: Vet,
  },
  {
    id: "worker",
    label: "Field Worker",
    icon: <BackpackIcon />,
    title: "Task Execution",
    description:
      "Simplified view for daily operations. Workers see their feed logs, assigned tasks, and can report issues without accessing sensitive data.",
    capabilities: ["Feed Logging", "Task Checklists", "Incident Reporting"],
    color: "amber",
    image: Worker,
  },
];

const RoleShowcase = () => {
  const [activeRole, setActiveRole] = useState(roles[0]);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // LOGIC: This function is called ONLY when the border trail finishes a lap
  const handleTrailFinish = useCallback(() => {
    const currentIndex = roles.findIndex((r) => r.id === activeRole.id);
    const nextIndex = (currentIndex + 1) % roles.length;
    setActiveRole(roles[nextIndex]); // Switch to next tab
    setIsImageLoading(true);
  }, [activeRole]);

  // MANUAL CLICK: Interrupts the flow and starts the trail on the new tab
  const handleTabClick = (role) => {
    setActiveRole(role);
    setIsImageLoading(true);
  };

  return (
    <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
      {/* Top Hatch Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 border-b border-zinc-200 dark:border-zinc-800 flex bg-zinc-50 dark:bg-zinc-950">
        <div
          className="w-full h-full block dark:hidden opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
        <div
          className="w-full h-full hidden dark:block opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
      </div>

      {/* Bottom Hatch Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 border-b border-zinc-200 dark:border-zinc-800 flex bg-zinc-50 dark:bg-zinc-950">
        <div
          className="w-full h-full block dark:hidden opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
        <div
          className="w-full h-full hidden dark:block opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
      </div>

      {/* Preloader */}
      <div className="hidden">
        {roles.map((role) => (
          <img key={role.id} src={role.image} alt="preload" />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Header */}
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins text-zinc-700 mb-4 tracking-tight">
            Built for the entire{" "}
            <span className="text-zinc-900 dark:text-zinc-100">
              farm ecosystem.
            </span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-md md:text-lg font-inter md:w-2/3 w-full mx-auto">
            Give every team member the exact tools they need with granular,
            role-based access control.
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {roles.map((role) => {
            const isActive = activeRole.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => handleTabClick(role)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border font-poppins overflow-hidden
                  ${
                    isActive
                      ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black shadow-lg scale-105"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                  }`}
              >
                {/* THE RELAY LOGIC:
                   - Only render trail if active.
                   - Trail runs ONCE (repeat: 0).
                   - When it finishes, it triggers handleTrailFinish(), which updates state.
                   - The new state causes this button to lose 'isActive', and the next button gains it.
                   - The loop continues.
                */}
                {isActive && (
                  <BorderTrail
                    className="bg-orange-500"
                    size={40}
                    onComplete={handleTrailFinish}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {role.icon} {role.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-rubik text-zinc-900 dark:text-white mb-4">
                  {activeRole.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 font-poppins w-10/12">
                  {activeRole.description}
                </p>
                <ul className="space-y-4">
                  {activeRole.capabilities.map((cap, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-inter"
                    >
                      <CheckCircledIcon className="w-5 h-5 text-zinc-900 dark:text-white flex-shrink-0" />
                      <span>{cap}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual */}
          <div className="relative order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 relative group
                   bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black
                   after:absolute after:inset-0 after:bg-radial-gradient after:from-${activeRole.color}-500/10 after:to-transparent dark:after:from-${activeRole.color}-400/10
                `}
              >
                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-10">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    </div>
                  )}
                  <motion.img
                    key={activeRole.image}
                    src={activeRole.image}
                    alt={`${activeRole.label} 3D Illustration`}
                    loading="eager"
                    onLoad={() => setIsImageLoading(false)}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{
                      opacity: isImageLoading ? 0 : 1,
                      y: isImageLoading ? 20 : 0,
                      scale: isImageLoading ? 0.95 : 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95,
                      transition: { duration: 0.15 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain drop-shadow-xl transform perspective-1000 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleShowcase;
