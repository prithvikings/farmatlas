import React from "react";
import { BorderTrailCard1 } from "../BorderTrailCard1";

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
      <h1 className="text-2xl font-roboto mb-6 ">Features</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardInfo.map((card) => (
          <BorderTrailCard1
            key={card.id}
            className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <h2 className="font-poppins text-xl font-medium mb-2 selection:bg-[#EA580C] selection:text-zinc-100">
              {card.title}
            </h2>
            <p className="font-inter text-sm text-zinc-700 dark:text-zinc-300 selection:bg-[#EA580C] selection:text-zinc-100">
              {card.desc}
            </p>
          </BorderTrailCard1>
        ))}
      </div>
    </div>
  );
};

export default Features;
