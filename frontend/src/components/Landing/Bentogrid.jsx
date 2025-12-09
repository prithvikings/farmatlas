import React from "react";

const Bentogrid = () => {
  return (
    <div className="bento">
      <h1 className="font-roboto text-2xl">
        All Your Farm Data. Managed by Role.
      </h1>
      <div className="bento-grid grid grid-cols-3 mt-8 gap-4 ">

        <div className="bento-item bg-gray-300 px-4 py-6">
          <h1 className="font-poppins text-lg font-medium">
            Individual Animal Profiles
          </h1>
          <p className="font-inter text-sm mt-4 text-zinc-700">
            Log every animal with a unique ID, species, and status (Sick, Sold,
            Active). <span className="font-semibold">Access the full history of any animal in one click.</span>
          </p>
        </div>
        <div className="bento-item bg-gray-300 px-4 py-6">
          <h1 className="font-poppins text-lg font-medium">
            Real-Time Health Records
          </h1>
          <p className="font-inter text-sm mt-4 text-zinc-700">
            Vets and Admins instantly log treatments, vaccinations, and notes.
            <span className="font-semibold">Get proactive alerts on current health issues.</span>
          </p>
        </div>
        <div className="bento-item bg-gray-300 px-4 py-6">
          <h1 className="font-poppins text-lg font-medium">
            Simple Worker Feed Logging
          </h1>
          <p className="font-inter text-sm mt-4 text-zinc-700">
            Your field workers quickly log the exact feed type and quantity.
            <span className="font-semibold">End feeding guesswork and ensure compliance.</span>
          </p>
        </div>
        <div className="bento-item col-span-2 bg-gray-300 px-4 py-6">
          <h1 className="font-poppins text-lg font-medium">
            Secure Financial Oversight
          </h1>
          <p className="font-inter text-sm mt-4 text-zinc-700">
            Track income, expenses, and net profitability (Admin-only access).
            <span className="font-semibold">Know your farm's true financial health without sharing sensitive
            data.</span>
          </p>
        </div>
        <div className="bento-item bg-gray-300 px-4 py-6">
          <h1 className="font-poppins text-lg font-medium">
            Low-Stock Inventory Alerts
          </h1>
          <p className="font-inter text-sm mt-4 text-zinc-700">
            Track feed, medicine, and supply stock. Workers log usage; the
            <span className="font-semibold">Admin dashboard flags items below your defined threshold.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bentogrid;
