import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
// IMPORT THE PARSER
import ReactMarkdown from "react-markdown";
import Navbar from "./Navbar";
import { MinimalFooter } from "../minimal-footer";

// --- UPDATED MOCK DATA SOURCE (Must be complete and accurate) ---
// Note: I am defining the complete array here for simplicity, but in a real app,
// this data should be imported from a separate, shared file.
const supportCategories = [
  {
    title: "Account & Team Access",
    description:
      "Setup, login, password resets, and managing team user access.",
    content: `
## Setting Up Your Farm Team Roles 🧑‍🌾

FarmAtlas utilizes **Role-Based Access Control (RBAC)** to ensure that team members only see and modify the data relevant to their job, keeping sensitive financial and administrative data secure.

### 1. Understanding the Core Roles

* **Admin (Farm Owner):** Full access to all modules, including **Financials**, User Management, and Settings.
* **Worker:** Restricted access. Can **log feeding, inventory usage, and general animal observations**. Cannot view financials or health records (read-only in some areas).
* **Veterinarian (Vet):** Primary focus on health. Can **create, view, and edit Health Records and medical notes**. Cannot view financials.

### 2. Creating New Users

1.  Navigate to the **Settings > User Management** tab (Admin Access Required).
2.  Click **"Add New User"**.
3.  Enter the user's name and email address.
4.  **Crucially, select the correct role (Worker, Vet, or Admin)** from the dropdown.
5.  The new user will receive an email invitation to set their initial password.

### Troubleshooting Access Issues

If a Worker cannot log feed: ensure their status is "Active" and their role is set correctly to "Worker." If a Vet cannot edit a record, confirm their account is activated and they are using the correct login credentials.
`,
  },
  {
    title: "Animal Lifecycle Tracking",
    description:
      "Creating profiles, status updates, and logging animal location.",
    content: `
## Managing Animal Profiles from Birth to Sale 

The **Animal Profile** is the central hub for all historical data, treatments, and logs for an individual animal. Maintaining accurate status and location tracking is vital for inventory and health reporting.

### 1. Creating a New Profile

1.  Click the **"+ Add Animal"** Quick Action button on the Dashboard or navigate to the main Animals module.
2.  Enter the **Unique Tag/ID** (this is mandatory and must be unique).
3.  Specify the **Species, Breed, Date of Birth, and Acquisition Date**.
4.  Set the initial **Status** to 'Active' and assign an initial **Location** (e.g., Barn 3, North Pasture).

### 2. Updating Animal Status

The Status field controls how the animal appears in reports and dashboards (e.g., mortality rates, sales reports).

* **Active:** Currently on the farm, healthy, and part of the main herd.
* **Sick:** Requires immediate attention. Automatically triggers alerts (if enabled) and moves the animal to a priority health view.
* **Sold/Transferred:** Removes the animal from active tracking but retains the full historical record for analysis.
* **Dead/Missing:** Used for accurate mortality and inventory reconciliation.

### Tip for Location Logging

Encourage Workers to log location changes during routine checks. This ensures the Admin always knows where the animal is housed, especially critical during health outbreaks.
`,
  },
  {
    title: "Health & Vetting Records",
    description:
      "Logging treatments, vaccinations, and medical history per animal.",
    content: `
## Maintaining a Clean Medical Timeline 

Health records are the responsibility of the **Admin** and **Veterinarian** roles. The goal is to build an unalterable chronological timeline of medical events tied directly to the Animal Profile.

### 1. Adding a New Health Entry

1.  Navigate to the specific **Animal Profile**.
2.  Go to the **Health** tab and click **"+ New Record"**.
3.  Fields to complete:
    * **Date/Time:** When the event occurred.
    * **Type:** Select from predefined options (Vaccination, Illness, Treatment, Check-up).
    * **Description/Notes:** Detailed observations by the Vet or Admin.
    * **Medication/Dosage:** Log what was used (links to Inventory usage).

### 2. Reviewing the Timeline

The Health tab functions as a timeline. Reviewing this timeline helps Vets diagnose recurring issues and ensures the compliance of vaccination schedules. Look for patterns in **"Illness"** entries across animals in the same **Location** to spot potential pen-level issues.

### Security Note

Workers can generally only view a summary of the health record to understand basic restrictions, but they **cannot edit** records, protecting data integrity.
`,
  },
  {
    title: "Inventory & Feed Logs",
    description:
      "Tracking feed, medicine stock, usage history, and low-stock alerts.",
    content: `
## Keeping Stock Updated and Avoiding Shortages 

The **Inventory** module manages all non-animal assets: feed, medicines, supplies, etc. This module is essential for cost tracking and ensuring critical items are always available.

### 1. Setting Up Inventory Items

1.  Go to the **Inventory** module.
2.  Add a new item (e.g., "Cattle Feed Type A", "Broad Spectrum Antibiotic").
3.  Define the **Unit** (kg, liters, doses) and the **Low-Stock Threshold**. Setting this threshold activates the dashboard alert when stock drops below the safe level.

### 2. Logging Usage (Worker Task)

Workers are primarily responsible for logging usage to keep the system accurate.
1.  On the Worker Dashboard, click **"Log Inventory Usage."**
2.  Select the **Item**, enter the **Quantity Used**, and provide a brief note (e.g., "Fed to Barn 3").
3.  The system automatically **subtracts** the quantity from the main stock, updating the Admin dashboard instantly.

### Troubleshooting Low Stock Alerts

If the **Low Stock alert** on the Admin Dashboard is incorrect, check two things: 1) Has the **initial quantity** been correctly input? 2) Are Workers consistently logging **all usage** immediately?
`,
  },
  {
    title: "Finance & Profitability",
    description:
      "Income/expense logging, financial reports, and Admin-only controls.",
    content: `
## Understanding Your True Net Farm Profit 

The **Financial Tracking** module provides a simple, clear view of your cash flow. **This module is strictly restricted to Admin users.**

### 1. Logging Transactions

1.  Navigate to the **Financials** module.
2.  Click **"+ New Transaction."**
3.  Select **Type (Income or Expense)**.
4.  Enter the **Amount, Date, and Description.**
5.  Assign a **Category** (e.g., Feed, Medical, Sales, Equipment) for reporting purposes.

### 2. Analyzing Financial Reports

The dashboard provides KPI cards for monthly Income, Expenses, and Net Difference. Use the dedicated **Financials** page to:

* **Filter by Date Range:** Compare performance quarter-over-quarter.
* **Filter by Category:** Identify the largest areas of expense (e.g., Is Feed cost outstripping Sales income?).

### Security and Admin Control

Since only the Admin can access **Financials**, there is zero risk of Workers or Vets accidentally viewing proprietary sales data or mislogging monetary transactions.
`,
  },
  {
    title: "Pricing & Billing",
    description:
      "Invoices, subscription management, and upgrading your farm's plan.",
    content: `
## Managing Your FarmAtlas Subscription 

This section covers common questions regarding payment, plan levels, and invoices. Note that for the initial project scope, this is conceptual but prepares for real subscription management.

### 1. Plan Structure (Conceptual)

FarmAtlas currently operates on a **Single-Farm License** structure, where pricing is typically based on the number of active animals or the number of permitted team users.

### 2. Viewing Invoices and Payment History

1.  Navigate to **Settings > Billing**.
2.  Here you can download PDF copies of past invoices and review your payment method on file.
3.  All payments are processed securely via (Stripe/PayPal Mockup).

### 3. Upgrading or Changing Your Plan

If your animal count grows beyond your current plan tier, the **Billing** section will prompt you to upgrade. This ensures you maintain full functionality and avoid data limitations. Contact support directly if you encounter any billing errors.
`,
  },
  {
    title: "Data Import & Export",
    description:
      "Assistance with uploading existing records, CSV files, and exporting data for compliance.",
    content: `
## Moving Data In and Out of FarmAtlas 

Data integrity is crucial for tax compliance and historical analysis. FarmAtlas supports simple **CSV-based import and export** functions.

### 1. Preparing Data for Import

If you are migrating from spreadsheets, your data must match the required template structure: **Animal ID, Species, Date of Birth, Status**. Any misaligned columns will cause the import to fail.

* Download the **official CSV template** from **Settings > Data Management**.
* Populate the template carefully.

### 2. Exporting Records

For tax purposes, internal audits, or compliance:
1.  Go to the relevant module (Animals, Financials, or Health).
2.  Apply any necessary filters (e.g., export only 2024 financial transactions).
3.  Click the **"Export CSV"** button. The system will generate a file containing the filtered data.

### Troubleshooting Import Errors

If an import fails, the system will usually flag the row number where the error occurred (e.g., a duplicate Animal ID or an invalid date format). Correct the issue in your CSV file and retry the upload.
`,
  },
  {
    title: "Farm Customization & Setup",
    description:
      "Configuring initial farm details, setting thresholds, and managing preferences.",
    content: `
## Personalizing FarmAtlas to Fit Your Operation 

The **Settings** section allows the **Admin** to define farm-wide rules and customize the application's behavior. Proper setup ensures the alerts and reports are accurate from day one.

### 1. Farm Details

Navigate to **Settings > General**. Here you can set:
* **Farm Name** (Displays in the footer/header).
* **Default Species** (Reduces data entry time).
* **Time Zone** (Ensures all log entries are accurate for reporting).

### 2. Defining Low-Stock Thresholds

This is set per inventory item, but the overall alerting system is managed here. **Set your threshold to allow adequate lead time for reordering**. For example, if feed takes 5 days to deliver, set the threshold higher than 5 days' consumption.

### 3. Notification Preferences

Decide which events trigger alerts (e.g., a **'Sick'** status update, inventory hitting the low-stock threshold). You can choose to receive these alerts via in-app dashboard notification or via email (conceptual).
`,
  },
  {
    title: "System Integrations",
    description:
      "Connecting FarmAtlas with external accounting software or third-party tools.",
    content: `
## Connecting FarmAtlas to Your Existing Tools 

While built as a stand-alone solution, FarmAtlas is designed for easy **integration** with standard farm management tools and financial services (future feature readiness).

### 1. Accounting Software (Conceptual)

Future versions will offer one-click synchronization with major accounting platforms like QuickBooks or Xero. This will allow your **Finance transactions** logged in FarmAtlas to automatically update your general ledger.

### 2. API Access

For advanced users, we offer a dedicated API key via **Settings > Integrations**. This secure token allows third-party tools or custom scripts to read (and potentially write) basic animal and inventory data. **Warning:** Treat your API key like a password; never share it publicly.

### Support Scope

While we provide the tools for integration, support for specific issues arising from the third-party software itself (e.g., a bug in QuickBooks) must be handled by that vendor's support team.
`,
  },
];
// -----------------------------------------------------------------------
// Define custom components for ReactMarkdown to apply styling
/* ---------------- MARKDOWN STYLES ---------------- */
const customComponents = {
  h2: ({ ...props }) => (
    <h2
      className="text-xl sm:text-2xl md:text-3xl font-alegreya text-zinc-800 dark:text-white mt-8 mb-4 border-b pb-2 border-zinc-200 dark:border-zinc-700"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className="text-lg sm:text-xl md:text-2xl font-roboto text-zinc-800 dark:text-white mt-6 mb-3"
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <p
      className="mb-4 text-sm sm:text-base md:text-lg font-inter text-zinc-800 dark:text-zinc-300 leading-relaxed"
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul
      className="list-disc pl-6 mb-4 space-y-2 text-sm sm:text-base font-poppins text-zinc-700 dark:text-zinc-400"
      {...props}
    />
  ),
  ol: ({ ...props }) => (
    <ol
      className="list-decimal pl-6 mb-4 space-y-2 text-sm sm:text-base font-poppins text-zinc-700 dark:text-zinc-400"
      {...props}
    />
  ),
  li: ({ ...props }) => <li className="pl-2" {...props} />,
  strong: ({ ...props }) => (
    <strong className="font-poppins text-zinc-800 dark:text-white" {...props} />
  ),
};

const SupportBlog = () => {
  const { supportname } = useParams();
  const navigate = useNavigate();

  const normalizeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const articleData = supportCategories.find(
    (item) => normalizeSlug(item.title) === supportname
  );

  if (!articleData) {
    return (
      <div className="min-h-screen pt-24 text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          404 – Article Not Found
        </h1>
        <p className="mt-4 text-sm sm:text-base">
          The support topic you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/support")}
          className="mt-6 flex items-center justify-center mx-auto text-green-600 hover:text-green-800"
        >
          <ChevronLeft className="size-4 mr-2" /> Back to Support Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* NAVBAR */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Navbar />
      </div>

      {/* CONTENT */}
      <div className="pt-10 sm:pt-12 pb-20 sm:pb-32 px-4 sm:px-6">
        <button
          onClick={() => navigate("/support")}
          className="flex items-center text-sm sm:text-base text-orange-600 hover:text-orange-700 mb-6 font-poppins transition duration-300 ease-in-out cursor-pointer"
        >
          <ChevronLeft className="size-4 mr-1" /> Get Back
        </button>

        <div className="max-w-3xl mx-auto">
          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-rubik tracking-tight text-zinc-900 dark:text-white">
            {articleData.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-inter text-zinc-600 dark:text-zinc-400 border-b pb-4 sm:pb-6 border-zinc-300 dark:border-zinc-700">
            {articleData.description}
          </p>

          {/* MARKDOWN CONTENT */}
          <div className="mt-6 sm:mt-8">
            <ReactMarkdown components={customComponents}>
              {articleData.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <MinimalFooter />
    </div>
  );
};

export default SupportBlog;
