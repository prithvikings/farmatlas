import React from "react";
import { BorderTrailCard1 } from "../BorderTrailCard1";
import { motion } from "motion/react";

const Features = () => {
  const cardInfo = [
    {
      id: 1,
      title: "Delegation Without Risk",
      desc: "Assign specific, limited access to Workers (Feed/Usage) and Vets (Health Records). The Admin alone controls all finances and settings.",
    },
    {
      id: 2,
      title: "Zero Data Guesswork",
      desc: "Instantly access the complete, centralized history for every animal—from birth records and feed logs to treatment dates. Eliminate errors and misplaced paperwork.",
    },
    {
      id: 3,
      title: "See True Profitability",
      desc: "Simple, integrated financial tracking (Income vs. Expense). Filter by month or category to see where you are making or losing money. No accounting degree required.",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-roboto mb-6"
      >
        Features
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-36"
      >
        {cardInfo.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="h-full"
          >
            <BorderTrailCard1 className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="font-poppins text-xl font-medium mb-2 selection:bg-[#EA580C] selection:text-zinc-100">
                {card.title}
              </h2>
              <p className="font-inter text-sm text-zinc-700 dark:text-zinc-300 selection:bg-[#EA580C] selection:text-zinc-100">
                {card.desc}
              </p>
            </BorderTrailCard1>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
