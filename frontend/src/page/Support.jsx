import React, { useState } from "react"; // <-- IMPORTED useState
import Navbar from "../components/Landing/Navbar";
import { Button } from "../components/ui/button";
import { AccordionComp } from "../components/AccordianComp";
import { Mail, MessageSquare, FileQuestion, HelpCircle, UserCircle2, ShieldCheck, DollarSign, LocateFixed, X, Settings, GitMerge, Grid2X2Plus } from "lucide-react"; // Added X icon for clearing search
import { MinimalFooter } from "../components/minimal-footer";
import { useNavigate } from "react-router-dom";
// 1. New Support Card Data
const supportCategories = [
	{
		icon: <UserCircle2 className="w-7 h-7" />,
		title: "Account & Team Access",
		description: "Setup, login, password resets, and managing team user access.",
	},
	{
		icon: <HelpCircle className="w-7 h-7" />,
		title: "Animal Lifecycle Tracking",
		description: "Creating profiles, status updates, and logging animal location.",
	},
	{
		icon: <ShieldCheck className="w-7 h-7" />,
		title: "Health & Vetting Records",
		description: "Logging treatments, vaccinations, and medical history per animal.",
	},
	{
		icon: <LocateFixed className="w-7 h-7" />,
		title: "Inventory & Feed Logs",
		description: "Tracking feed, medicine stock, usage history, and low-stock alerts.",
	},
	{
		icon: <DollarSign className="w-7 h-7" />,
		title: "Finance & Profitability",
		description: "Income/expense logging, financial reports, and Admin-only controls.",
	},
	{
		icon: <FileQuestion className="w-7 h-7" />,
		title: "Pricing & Billing",
		description: "Invoices, subscription management, and upgrading your farm's plan.",
	},
	{
		icon: <Grid2X2Plus className="w-7 h-7" />,
		title: "Data Import & Export",
		description: "Assistance with uploading existing records, CSV files, and exporting data for compliance.",
	},
	{
		icon: <Settings className="w-7 h-7" />,
		title: "Farm Customization & Setup",
		description: "Configuring initial farm details, setting thresholds, and managing preferences.",
	},
	{
		icon: <GitMerge className="w-7 h-7" />,
		title: "System Integrations",
		description: "Connecting FarmAtlas with external accounting software or third-party tools.",
	},
];

const Support = () => {
  // 2. Initialize useNavigate
  const navigate = useNavigate();
  
  // 3. Function to create a clean URL slug from the title
  const createSlug = (title) => {
    return title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  // 4. Navigation Handler
  const handleCardClick = (title) => {
    const slug = createSlug(title);
    navigate(`/support/${slug}`);
  };
	// 2. STATE FOR SEARCH TERM
	const [searchTerm, setSearchTerm] = useState("");

	// Dummy search handler for the button (not required for filtering, but good practice)
	const handleSearchClick = () => {
		console.log(`Searching for: ${searchTerm}`);
		// In a real app, this would trigger a knowledge base API search.
	};

	// 3. FILTER LOGIC
	const filteredCategories = supportCategories.filter((card) => {
		const term = searchTerm.toLowerCase();
		return (
			card.title.toLowerCase().includes(term) ||
			card.description.toLowerCase().includes(term)
		);
	});

	return (
		<div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-900">
			<div className="mx-auto max-w-6xl">
				<Navbar />
				<div className="pt-24 pb-32">
					{/* Header + Search */}
					<div className="max-w-4xl mx-auto text-center px-6">
						<h1 className="text-4xl text-zinc-900 dark:text-white tracking-tight font-rubik">
							Support for FarmAtlas. Ready to Work.
						</h1>
						<p className="mt-3 text-zinc-600 dark:text-zinc-400 text-lg font-inter">
							Find answers fast in our knowledge base or submit a ticket.
						</p>

						<div className="mt-8 flex gap-3">
							{/* 4. INPUT FIELD WITH ONCHANGE HANDLER */}
							<div className="relative flex-1">
								<input
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search for 'Animal Status' or 'Low Stock Alert'..."
									className="h-12 dark:bg-zinc-800 outline-none focus:ring-1 focus:ring-green-600 transition duration-300 w-full font-poppins px-4 bg-zinc-100 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 pr-10"
								/>
								{searchTerm && (
									<X
										className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 cursor-pointer hover:text-zinc-700"
										onClick={() => setSearchTerm("")}
									/>
								)}
							</div>
							<Button
								variant={"btntheme"}
								onClick={handleSearchClick} // Retain search button functionality (optional)
								className="h-12 px-6 cursor-pointer font-poppins bg-green-600 hover:bg-green-700 text-white rounded-lg"
							>
								Search
							</Button>
						</div>
					</div>

					{/* Support Categories - Now maps filteredCategories */}
					<div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
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
							// Display message if no cards match the search
							<div className="md:col-span-3 text-center py-10">
								<p className="text-xl text-zinc-600 dark:text-zinc-400">
									No categories found matching "{searchTerm}". Try broadening your search.
								</p>
							</div>
						)}
					</div>

					{/* FAQ Section - Improved Header */}
					<div className="mx-auto max-w-4xl pt-24 pb-16 px-6">
						<h1 className="text-3xl font-roboto font-medium mb-10 text-center text-zinc-900 dark:text-white">
							Essential Questions. Clear Answers.
						</h1>
						<AccordionComp />
					</div>

					{/* Final Contact CTA - More Actionable */}
					<div className="max-w-xl mx-auto mt-20 text-center px-6">
						<h3 className="text-3xl font-poppins font-medium text-zinc-900 dark:text-white">
							Need Direct Assistance?
						</h3>
						<p className="text-lg text-zinc-600 dark:text-zinc-400 mt-3 font-inter">
							If our knowledge base didn't solve it, connect <br /> directly with a technical specialist.
						</p>

						<Button variant={"btntheme"} className="mt-6 px-8 py-3 font-poppins bg-green-600 hover:bg-green-700 text-white rounded-lg">
							Submit a Support Ticket (1-Hour Response)
						</Button>
					</div>
				</div>
			</div>
			<div>
				{/* Footer Component */}
				<MinimalFooter />
			</div>
		</div>
	);
};

const SupportCard = ({ icon, title, description, onClick }) => {
	return (
		<div
    onClick={onClick}
			className="p-6 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-sm shadow-2xs  hover:shadow-lg transition cursor-pointer hover:-translate-y-1 duration-300"
		>
			<div className="mb-4 text-green-600 dark:text-green-400">{icon}</div>
			<h3 className="font-semibold text-xl text-zinc-800 dark:text-white font-poppins">{title}</h3>
			<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-inter">{description}</p>
		</div>
	);
};

export default Support;