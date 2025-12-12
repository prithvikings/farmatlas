import React from "react";

const HowitWork = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 selection:bg-[#EA580C] selection:text-zinc-100 px-3 py-1 font-medium font-poppins rounded-full">
        How it works
      </div>
      <h1 className="text-5xl max-w-xl text-center font-roboto mt-4 leading-[1.2] text-zinc-900 dark:text-zinc-200 selection:bg-[#EA580C] selection:text-zinc-100">
        The simplest way to <br /> manage your livestock
      </h1>
      <p className="text-center font-inter mt-4 text-zinc-950 dark:text-zinc-400 text-lg selection:bg-[#EA580C] selection:text-zinc-100">
        Track animals, monitor health, manage feed, and control <br /> farm
        operations — all from one dashboard.
      </p>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        <div className="">
          <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-200 selection:bg-[#EA580C] selection:text-zinc-100">
            1. Set up your farm
          </h2>
          <p className="mt-4 text-lg text-zinc-900 dark:text-zinc-400 max-w-md font-inter selection:bg-[#EA580C] selection:text-zinc-100">
            Create your farm workspace, add users like workers and
            veterinarians, and define roles. Everything is scoped to one farm
            for clarity and control.
          </p>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center px-40 py-8">
          <img
            src="https://assets.ycodeapp.com/assets/app121112/Images/published/ai-training-gin1p50d1i.webp"
            className="w-full"
            alt=""
          />
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center px-40 py-8">
          <img
            src="https://assets.ycodeapp.com/assets/app121112/Images/published/design%20your%20brand-toqn73dipe.webp"
            className="w-full"
            alt=""
          />
        </div>
        <div className="">
          <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-200 selection:bg-[#EA580C] selection:text-zinc-100">
            2. Add your animals
          </h2>
          <p className="mt-4 text-lg text-zinc-900 dark:text-zinc-400 max-w-md font-inter selection:bg-[#EA580C] selection:text-zinc-100">
            Register each animal with tags, species, breed, age, and status.
            Maintain a complete lifecycle record from acquisition to sale or
            transfer.
          </p>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        <div className="">
          <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-200 selection:bg-[#EA580C] selection:text-zinc-100">
            3. Track health and feeding
          </h2>
          <p className="mt-4 text-lg text-zinc-900 dark:text-zinc-400 max-w-md font-inter selection:bg-[#EA580C] selection:text-zinc-100">
            Log vaccinations, treatments, illnesses, and daily feeding. Vets
            manage health records while workers handle feeding and observations.
          </p>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center px-40 py-8">
          <img
            src="https://assets.ycodeapp.com/assets/app121112/Images/published/connect%20your%20domain-xaq0sc05q6.webp"
            className="w-full"
            alt=""
          />
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center px-40 py-8">
          <img
            src="https://assets.ycodeapp.com/assets/app121112/Images/published/set%20up%20payments-toyn51uzlc.webp"
            className="w-full"
            alt=""
          />
        </div>
        <div className="">
          <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-200 selection:bg-[#EA580C] selection:text-zinc-100">
            4. Manage inventory and costs
          </h2>
          <p className="mt-4 text-lg text-zinc-900 dark:text-zinc-400 max-w-md font-inter selection:bg-[#EA580C] selection:text-zinc-100">
            Monitor feed, medicines, and supplies with real-time stock levels.
            Track expenses and income to understand where your money goes.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col mt-24">
        <h1 className="text-4xl font-inter text-zinc-900 dark:text-zinc-200 selection:bg-[#EA580C] selection:text-zinc-100">
          5. Run your farm smarter
        </h1>
        <p className="mt-4 text-lg text-zinc-900 dark:text-zinc-400 max-w-md font-inter text-center selection:bg-[#EA580C] selection:text-zinc-100">
          Your farm data is organized and accessible. Make better decisions,
          reduce guesswork, and keep your livestock healthy and productive.
        </p>
        <button className="bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] text-white selection:bg-[#EA580C] selection:text-zinc-100 cursor-pointer px-6 py-2 rounded-full mt-4">
          Start managing livestock
        </button>
      </div>
    </div>
  );
};

export default HowitWork;
