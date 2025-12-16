import React, { useState } from "react";
import Navbar from "../components/Landing/Navbar";
import { Button } from "../components/ui/button";
import { AccordionComp } from "../components/AccordianComp";
import {
  FileQuestion,
  HelpCircle,
  UserCircle2,
  ShieldCheck,
  DollarSign,
  LocateFixed,
  X,
  Settings,
  GitMerge,
  Grid2X2Plus,
} from "lucide-react";
import { MinimalFooter } from "../components/minimal-footer";
import { useNavigate } from "react-router-dom";

/* ---------------- SUPPORT DATA ---------------- */
const supportCategories = [
  {
    icon: <UserCircle2 className="w-7 h-7" />,
    title: "Account & Team Access",
    description:
      "Setup, login, password resets, and managing team user access.",
  },
  {
    icon: <HelpCircle className="w-7 h-7" />,
    title: "Animal Lifecycle Tracking",
    description:
      "Creating profiles, status updates, and logging animal location.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Health & Vetting Records",
    description:
      "Logging treatments, vaccinations, and medical history per animal.",
  },
  {
    icon: <LocateFixed className="w-7 h-7" />,
    title: "Inventory & Feed Logs",
    description:
      "Tracking feed, medicine stock, usage history, and low-stock alerts.",
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: "Finance & Profitability",
    description:
      "Income/expense logging, financial reports, and Admin-only controls.",
  },
  {
    icon: <FileQuestion className="w-7 h-7" />,
    title: "Pricing & Billing",
    description: "Invoices, subscription management, and upgrading plans.",
  },
  {
    icon: <Grid2X2Plus className="w-7 h-7" />,
    title: "Data Import & Export",
    description: "Uploading records, CSV files, and exporting data.",
  },
  {
    icon: <Settings className="w-7 h-7" />,
    title: "Farm Customization & Setup",
    description: "Configuring farm details, thresholds, and preferences.",
  },
  {
    icon: <GitMerge className="w-7 h-7" />,
    title: "System Integrations",
    description: "Connecting FarmAtlas with third-party tools.",
  },
];

/* ---------------- SUPPORT PAGE ---------------- */
const Support = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const createSlug = (title) =>
    title
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const handleCardClick = (title) => {
    navigate(`/support/${createSlug(title)}`);
  };

  const filteredCategories = supportCategories.filter((card) => {
    const term = searchTerm.toLowerCase();
    return (
      card.title.toLowerCase().includes(term) ||
      card.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* NAVBAR */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Navbar />
      </div>

      {/* CONTENT */}
      <div className="pt-16 sm:pt-20 pb-20 sm:pb-28">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h1 className="text-3xl leading-tight sm:leading-tight md:leading-tight font-rubik tracking-tight text-zinc-900 dark:text-white">
            Support for FarmAtlas. Ready to Work.
          </h1>
          <p
            className="
    mt-3
    mx-auto
    max-w-xs sm:max-w-none
    text-sm sm:text-base md:text-lg
    text-zinc-600 dark:text-zinc-400
    font-inter
  "
          >
            Find answers fast in our knowledge base or submit a ticket.
          </p>

          {/* SEARCH */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for 'Animal Status' or 'Low Stock Alert'..."
                className="h-12 w-full px-4 pr-10 text-sm font-poppins rounded-lg border bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-[#EA580C]"
              />
              {searchTerm && (
                <X
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-zinc-500 hover:text-zinc-700"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>

            <Button
              variant="btntheme"
              className="h-12 w-full sm:w-auto px-6 bg-[#F97316] hover:bg-[#EA580C] text-white font-poppins"
            >
              Search
            </Button>
          </div>
        </div>

        {/* SUPPORT CARDS */}
        <div
          className="
            max-w-6xl mx-auto
            mt-12 sm:mt-16
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-4 sm:gap-6
            px-4 sm:px-6
          "
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((card, index) => (
              <SupportCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                onClick={() => handleCardClick(card.title)}
              />
            ))
          ) : (
            <div className="md:col-span-3 text-center py-10">
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                No categories found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-4xl pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-roboto font-medium mb-8 text-center text-zinc-900 dark:text-white">
            Essential Questions. Clear Answers.
          </h2>
          <AccordionComp />
        </div>

        {/* FINAL CTA */}
        <div className="max-w-xl mx-auto mt-12 sm:mt-20 text-center px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-medium text-zinc-900 dark:text-white">
            Need Direct Assistance?
          </h3>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-inter">
            If our knowledge base didn’t solve it, connect directly with a
            technical specialist.
          </p>

          <Button
            variant="btntheme"
            className="mt-6 px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-poppins rounded-lg"
          >
            Submit a Support Ticket (1-Hour Response)
          </Button>
        </div>
      </div>

      {/* FOOTER */}
      <MinimalFooter />
    </div>
  );
};

/* ---------------- SUPPORT CARD ---------------- */
const SupportCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        p-6
        bg-white dark:bg-zinc-800
        border border-zinc-300 dark:border-zinc-700
        rounded-sm
        shadow-sm
        hover:shadow-lg
        transition
        cursor-pointer
        hover:-translate-y-1
      "
    >
      <div className="mb-4 text-[#F97316]">{icon}</div>
      <h3 className="text-lg font-semibold font-poppins text-zinc-800 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm font-inter text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
};

export default Support;
