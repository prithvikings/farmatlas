import React, { useEffect, useState } from "react";

/* ---------------- CUSTOM ANIMATION STYLES (UNCHANGED) ---------------- */
const customStyles = `
  @keyframes drawLine { to { stroke-dashoffset: 0; } }
  @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)} }
  @keyframes pulse-ring { 0%{transform:scale(.8);opacity:.5}100%{transform:scale(1.3);opacity:0} }

  .animate-draw {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: drawLine 1.5s ease-out forwards;
  }
  .animate-float { animation: float 3s ease-in-out infinite; }
`;

/* ---------------- LIVESTOCK ANIMATION ---------------- */
const LivestockAnimation = ({ step }) => {
  const [sequenceStep, setSequenceStep] = useState(0);

  useEffect(() => {
    setSequenceStep(0);
    const interval = setInterval(() => {
      setSequenceStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, [step]);

  const baseClasses = `
    w-full
    h-48 sm:h-56 md:h-64
    bg-zinc-50 dark:bg-zinc-900
    rounded-xl
    border border-zinc-200 dark:border-zinc-800
    shadow-sm
    flex items-center justify-center
    overflow-hidden relative select-none
  `;

  /* --- renderContent(): UNCHANGED --- */
  const renderContent = () => {
    switch (step) {
      // -----------------------------------------------------------------------
      // STEP 1: SETUP (Network Topology / Access Control)
      // -----------------------------------------------------------------------
      case 1:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Central Farm Hub */}
            <div className="z-20 w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-orange-500 shadow-xl flex items-center justify-center relative animate-float">
              <svg
                className="w-8 h-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {/* Pulsing ring behind hub */}
              <div className="absolute inset-0 bg-orange-500 rounded-2xl -z-10 animate-[pulse-ring_2s_infinite]"></div>
            </div>

            {/* Orbiting Users */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`absolute transition-all duration-700 ease-out`}
                style={{
                  transform: `rotate(${i * 120}deg) translate(${
                    sequenceStep >= 1 ? "110px" : "40px"
                  }) rotate(-${i * 120}deg)`,
                  opacity: sequenceStep >= 1 ? 1 : 0,
                }}
              >
                <div
                  className={`flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-zinc-800 border ${
                    i === 0
                      ? "border-orange-200"
                      : "border-zinc-200 dark:border-zinc-700"
                  } shadow-lg scale-90`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      i === 0 ? "bg-orange-500" : "bg-zinc-400"
                    }`}
                  ></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-600 rounded"></div>
                    <div className="w-8 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded"></div>
                  </div>
                  {/* Checkmark appears in stage 2 */}
                  <div
                    className={`absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-0.5 transition-all duration-300 ${
                      sequenceStep >= 2 ? "scale-100" : "scale-0"
                    }`}
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {sequenceStep >= 1 &&
                [0, 1, 2].map((i) => {
                  const angle = i * 120 * (Math.PI / 180);
                  return (
                    <line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + Math.cos(angle) * 35}%`}
                      y2={`${50 + Math.sin(angle) * 35}%`}
                      className="stroke-zinc-300 dark:stroke-zinc-700 animate-draw"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  );
                })}
            </svg>
          </div>
        );

      // -----------------------------------------------------------------------
      // STEP 2: ADD ANIMAL (Form Simulation / Database Entry)
      // -----------------------------------------------------------------------
      case 2:
        return (
          <div className="w-full h-full p-6 flex flex-col items-center justify-center relative bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
            {/* Background List (Blurred) */}
            <div className="w-full space-y-3 opacity-30 blur-[1px] absolute top-6 px-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded flex items-center px-3 gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="w-20 h-2 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>

            {/* Active Modal / Card */}
            <div
              className={`z-10 bg-white dark:bg-zinc-800 w-64 p-4 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 transition-all duration-500 ${
                sequenceStep === 3
                  ? "scale-95 opacity-0 translate-y-10"
                  : "scale-100 opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  New Entry
                </div>
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              </div>

              {/* Form Fields Simulation */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-1.5 w-10 bg-zinc-200 dark:bg-zinc-600 rounded"></div>
                  <div
                    className={`h-8 w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded flex items-center px-2 text-sm text-zinc-700 dark:text-zinc-300 transition-colors ${
                      sequenceStep >= 1 ? "border-orange-400" : ""
                    }`}
                  >
                    {sequenceStep >= 1 && (
                      <span className="animate-pulse">Bessie_04</span>
                    )}
                    {sequenceStep === 0 && (
                      <span className="w-0.5 h-4 bg-zinc-400 animate-blink"></span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-12 bg-zinc-200 dark:bg-zinc-600 rounded"></div>
                  <div className="flex gap-2">
                    <div
                      className={`h-6 w-16 rounded text-[10px] flex items-center justify-center border transition-colors ${
                        sequenceStep >= 1
                          ? "bg-orange-100 border-orange-500 text-orange-700"
                          : "bg-zinc-100 border-zinc-200 text-zinc-400"
                      }`}
                    >
                      Holstein
                    </div>
                    <div className="h-6 w-16 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] flex items-center justify-center text-zinc-400">
                      Jersey
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div
                className={`mt-4 h-8 w-full bg-orange-600 rounded flex items-center justify-center text-white text-xs font-medium transition-transform duration-100 ${
                  sequenceStep === 2 ? "scale-95" : "scale-100"
                }`}
              >
                Add Livestock
              </div>
            </div>

            {/* Mouse Cursor Simulation - FIXED COORDINATES */}
            <svg
              className="absolute z-50 w-6 h-6 text-zinc-900 dark:text-white drop-shadow-xl pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{
                // Step 0: Idle at bottom right
                // Step 1: Moves to Input Field (approx 45% top, 60% left)
                // Step 2: Moves to Submit Button (approx 72% top, 60% left)
                top:
                  sequenceStep === 0
                    ? "80%"
                    : sequenceStep === 1
                    ? "45%"
                    : "72%",
                left:
                  sequenceStep === 0
                    ? "80%"
                    : sequenceStep === 1
                    ? "60%"
                    : "60%",
                transform: sequenceStep === 2 ? "scale(0.85)" : "scale(1)",
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            </svg>

            {/* Success Toast (Appears at end) */}
            <div
              className={`absolute bottom-4 bg-zinc-900 text-white px-4 py-2 rounded-lg text-xs shadow-xl flex items-center gap-2 transition-all duration-500 ${
                sequenceStep === 3
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <svg
                className="w-4 h-4 text-green-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Animal Added Successfully
            </div>
          </div>
        );

      // -----------------------------------------------------------------------
      // STEP 3: HEALTH TRACKING (Vitals Monitor / Timeline)
      // -----------------------------------------------------------------------
      case 3:
        return (
          <div className="w-full h-full bg-zinc-900 relative flex items-center justify-center overflow-hidden p-6">
            {/* Grid Background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Main Vitals Card */}
            <div className="w-full max-w-sm bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden relative shadow-2xl">
              <div className="h-10 bg-zinc-700/50 border-b border-zinc-700 flex items-center justify-between px-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  ID: COW_8922
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Heart Rate Graph */}
                <div className="h-16 relative border border-zinc-700/50 rounded bg-zinc-900/50 overflow-hidden">
                  {/* Moving Line */}
                  <svg
                    className="absolute inset-0 h-full w-[200%] animate-[slide-left_4s_linear_infinite]"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 30 L20 30 L25 10 L35 50 L40 30 L60 30 L65 5 L75 55 L80 30 L100 30 L105 20 L115 40 L120 30 L200 30"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  {/* Scan line overlay */}
                  <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-zinc-900 right-0 z-10"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-700/30 p-2 rounded border border-zinc-700/50">
                    <div className="text-[10px] text-zinc-500">Weight</div>
                    <div className="text-lg font-mono text-zinc-200">
                      1,204 <span className="text-xs text-zinc-500">lbs</span>
                    </div>
                  </div>
                  <div className="bg-zinc-700/30 p-2 rounded border border-zinc-700/50 relative overflow-hidden">
                    <div className="text-[10px] text-zinc-500">Temp</div>
                    <div
                      className={`text-lg font-mono transition-colors duration-500 ${
                        sequenceStep === 1 ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {sequenceStep === 1 ? "103.2°F" : "101.5°F"}
                    </div>
                    {/* Alert Pill */}
                    {sequenceStep === 1 && (
                      <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[8px] rounded animate-pulse border border-red-500/30">
                        FEVER
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div className="h-8 bg-zinc-900 border-t border-zinc-700 flex items-center px-4 justify-between">
                <span className="text-[10px] text-zinc-500">Status</span>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      sequenceStep === 1
                        ? "bg-red-500 animate-ping"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <span
                    className={`text-[10px] font-medium ${
                      sequenceStep === 1 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {sequenceStep === 1 ? "ATTENTION" : "HEALTHY"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      // -----------------------------------------------------------------------
      // STEP 4: INVENTORY & COST (Dynamic Charts) - FIXED
      // -----------------------------------------------------------------------
      case 4:
        return (
          <div className="w-full h-full p-8 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
            {/* FIX: Removed "items-end" from container to prevent children collapsing.
                Instead, we use explicit height for the bar tracks.
            */}
            <div className="w-full max-w-sm h-48 flex gap-6 items-end relative">
              {/* Tooltip that follows the active bar */}
              <div
                className={`absolute top-2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded shadow-lg transition-all duration-500 z-20`}
                style={{
                  left:
                    sequenceStep <= 1
                      ? "10%"
                      : sequenceStep === 2
                      ? "40%"
                      : "70%",
                  opacity: sequenceStep > 0 && sequenceStep < 3 ? 1 : 0,
                }}
              >
                $
                {sequenceStep <= 1 ? "450" : sequenceStep === 2 ? "890" : "230"}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900"></div>
              </div>

              {/* Bar 1: Feed */}
              <div className="flex-1 flex flex-col justify-end gap-2 group">
                {/* FIX: Explicit height h-32 ensures bar track is visible */}
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-t-lg relative overflow-hidden h-32">
                  {/* FIX: sequenceStep > 0 allows bar to animate FROM zero */}
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-1000 ease-out"
                    style={{ height: sequenceStep > 0 ? "45%" : "0%" }}
                  ></div>
                </div>
                <div className="text-center text-[10px] text-zinc-400 font-medium">
                  Feed
                </div>
              </div>

              {/* Bar 2: Meds */}
              <div className="flex-1 flex flex-col justify-end gap-2">
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-t-lg relative overflow-hidden h-32">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-1000 ease-out delay-100"
                    style={{ height: sequenceStep > 0 ? "75%" : "0%" }}
                  ></div>
                </div>
                <div className="text-center text-[10px] text-zinc-400 font-medium">
                  Meds
                </div>
              </div>

              {/* Bar 3: Labor */}
              <div className="flex-1 flex flex-col justify-end gap-2">
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-t-lg relative overflow-hidden h-32">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-1000 ease-out delay-200"
                    style={{ height: sequenceStep > 0 ? "30%" : "0%" }}
                  ></div>
                </div>
                <div className="text-center text-[10px] text-zinc-400 font-medium">
                  Labor
                </div>
              </div>

              {/* Floating Total Cost Card */}
              <div
                className={`absolute top-0 right-0 p-3 bg-white dark:bg-zinc-800 rounded-lg shadow border border-zinc-100 dark:border-zinc-700 transition-all duration-700 z-10 ${
                  sequenceStep >= 2
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-zinc-400 uppercase">
                    Net Profit
                  </span>
                </div>
                <div className="text-xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1">
                  $8,420
                  <svg
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className={baseClasses}>{renderContent()}</div>
    </>
  );
};

/* ---------------- HOW IT WORKS SECTION ---------------- */
const HowitWork = () => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6">
      {/* Badge */}
      <div className="mt-12 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm font-medium font-poppins">
        How it works
      </div>

      {/* Heading */}
      <h1
        className="
          mt-4
          text-2xl sm:text-3xl md:text-5xl
          max-w-xl
          text-center
          font-roboto
          leading-tight md:leading-[1.2]
        "
      >
        The simplest way to <br className="hidden sm:block" /> manage your
        livestock
      </h1>

      {/* Subheading */}
      <p
        className="
          mt-4
          text-sm sm:text-base md:text-lg
          text-center
          max-w-xl
          font-inter
          text-zinc-900 dark:text-zinc-400
        "
      >
        Track animals, monitor health, manage feed, and control farm operations
        — all from one dashboard.
      </p>

      {/* STEP 1 */}
      <div
        className="
          mt-12 sm:mt-16 md:mt-24
          grid grid-cols-1 md:grid-cols-2
          gap-8 sm:gap-12 md:gap-16
          items-center
          w-full max-w-7xl
        "
      >
        <div>
          <h2 className="text-xl md:text-2xl font-medium">
            1. Set up your farm
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-md">
            Create your farm workspace, add users like workers and
            veterinarians, and define roles.
          </p>
        </div>
        <div className="flex justify-center p-4 sm:p-6 md:p-8">
          <LivestockAnimation step={1} />
        </div>
      </div>

      {/* STEP 2 */}
      <div
        className="
          mt-12 sm:mt-16 md:mt-24
          grid grid-cols-1 md:grid-cols-2
          gap-8 sm:gap-12 md:gap-16
          items-center
          w-full max-w-7xl
        "
      >
        <div className="order-2 md:order-1 flex justify-center p-4 sm:p-6 md:p-8">
          <LivestockAnimation step={2} />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-xl md:text-2xl font-medium">
            2. Add your animals
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-md">
            Register each animal with tags, species, breed, age, and status.
          </p>
        </div>
      </div>

      {/* STEP 3 */}
      <div
        className="
          mt-12 sm:mt-16 md:mt-24
          grid grid-cols-1 md:grid-cols-2
          gap-8 sm:gap-12 md:gap-16
          items-center
          w-full max-w-7xl
        "
      >
        <div>
          <h2 className="text-xl md:text-2xl font-medium">
            3. Track health and feeding
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-md">
            Log vaccinations, treatments, illnesses, and daily feeding.
          </p>
        </div>
        <div className="flex justify-center p-4 sm:p-6 md:p-8">
          <LivestockAnimation step={3} />
        </div>
      </div>

      {/* STEP 4 */}
      <div
        className="
          mt-12 sm:mt-16 md:mt-24
          grid grid-cols-1 md:grid-cols-2
          gap-8 sm:gap-12 md:gap-16
          items-center
          w-full max-w-7xl
        "
      >
        <div className="order-2 md:order-1 flex justify-center p-4 sm:p-6 md:p-8">
          <LivestockAnimation step={4} />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-xl md:text-2xl font-medium">
            4. Manage inventory and costs
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-md">
            Monitor feed, medicines, and supplies with real-time stock levels.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 sm:mt-20 md:mt-24 mb-20 text-center max-w-md">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter">
          5. Run your farm smarter
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg">
          Make better decisions, reduce guesswork, and keep livestock healthy.
        </p>
        <button className="mt-5 px-6 py-2 rounded-full bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] text-white shadow-lg">
          Start managing livestock
        </button>
      </div>
    </div>
  );
};

export default HowitWork;
