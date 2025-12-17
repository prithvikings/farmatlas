import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  CheckIcon,
  LockClosedIcon,
  PersonIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { ShieldCheckIcon } from "lucide-react";

// Mock Data - Simulating state passed from router
const selectedPlan = {
  name: "FarmAtlas Pro",
  price: 299, // Yearly price example
  period: "year",
  features: [
    "Unlimited Livestock Records",
    "Veterinary Health AI Analysis",
    "5 Worker Seats included",
    "Priority 24/7 Support",
  ],
};

export default function checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Input States
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  // Handlers
  const handleCardChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").substring(0, 16);
    setCardNumber(val);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (val.length >= 2) val = val.substring(0, 2) + "/" + val.substring(2);
    setExpiry(val);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2500);
  };

  // Success View (Minimalist Center)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
          <CheckIcon className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-3xl font-medium tracking-tight mb-2 font-poppins">
          Welcome to the future of farming.
        </h1>
        <p className="text-zinc-500 mb-8 text-center max-w-md font-poppins">
          Your payment was successful. Access to FarmAtlas Pro has been granted.
          A receipt has been sent to your email.
        </p>
        <Button
          className="bg-zinc-100 text-black hover:bg-zinc-300 px-8 py-6 rounded-full font-medium transition-all font-poppins cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Enter Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:h-screen w-full flex flex-col lg:flex-row bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-zinc-800">
      {/* LEFT COLUMN: The "Value" (Technical & Premium) */}
      <div className="relative w-full lg:w-[45%] bg-[#09090B] border-r border-zinc-800 p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-zinc-800/20 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="h-6 w-6 bg-zinc-100 rounded-sm grid place-items-center">
              <div className="h-3 w-3 border-2 border-zinc-900 rounded-full" />
            </div>
            <span className="font-bold tracking-tight text-lg">FarmAtlas</span>
          </div>

          {/* The rest of your content remains the same... */}
          <div className="space-y-2 mb-8">
            <h3 className="text-zinc-400 font-medium text-sm uppercase tracking-wider font-poppins">
              Subscribe to
            </h3>
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-white font-inter">
              {selectedPlan.name}
            </h1>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl text-white font-roboto">
                ${selectedPlan.price}
              </span>
              <span className="text-zinc-500 font-roboto">
                /{selectedPlan.period}
              </span>
            </div>
          </div>

          <div className="space-y-4 max-w-sm">
            {selectedPlan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 group">
                {/* Made checkmark container slightly more subtle to match new bg */}
                <div className="h-5 w-5 rounded-md border border-zinc-800 bg-zinc-900/50 flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                  <CheckIcon className="w-3 h-3 text-zinc-400 group-hover:text-orange-500" />
                </div>
                <span className="text-sm text-zinc-300 font-light font-poppins">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-12 lg:mt-0">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-poppins">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Secure encrypted payment</span>
            <div className="hidden md:flex items-center gap-3">
              <span> | </span>
              <span>100% secure</span>
              <span> | </span>
              <span>UPI</span>
              <span> | </span>
              <span>Netbanking</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: The "Action" (Clean & Sharp) */}
      <div className="flex-1 bg-[#050505] flex flex-col justify-center p-6 lg:p-24 relative">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white font-poppins">
              Payment Details
            </h2>
            <p className="text-sm text-zinc-500 font-poppins">
              Complete your transaction to begin.
            </p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Card Information Group */}
            <div className="space-y-4">
              {/* Card Number */}
              <div className="group">
                <label className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold ml-1 mb-2 block group-focus-within:text-white transition-colors font-inter">
                  Card Number
                </label>
                <div
                  className={cn(
                    "relative flex items-center h-12 w-full rounded-lg bg-zinc-900/50 border transition-all duration-200",
                    focusedField === "card"
                      ? "border-zinc-500 ring-1 ring-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div className="pl-4 text-zinc-400">
                    <LockClosedIcon className="w-4 h-4" />
                  </div>
                  <input
                    required
                    type="text"
                    value={cardNumber.replace(/(\d{4})/g, "$1 ").trim()}
                    onChange={handleCardChange}
                    onFocus={() => setFocusedField("card")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    className="w-full h-full bg-transparent border-none outline-none px-4 text-sm font-mono text-white placeholder:text-zinc-700"
                  />
                  <div className="pr-4">
                    {/* Dynamic Card Brand Mock */}
                    {cardNumber.startsWith("4") && (
                      <span className="text-[10px] font-bold text-white">
                        VISA
                      </span>
                    )}
                    {cardNumber.startsWith("5") && (
                      <span className="text-[10px] font-bold text-white">
                        MC
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Row: Expiry & CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold ml-1 mb-2 block group-focus-within:text-white transition-colors">
                    Expiry
                  </label>
                  <div
                    className={cn(
                      "relative flex items-center h-12 w-full rounded-lg bg-zinc-900/50 border transition-all duration-200",
                      focusedField === "expiry"
                        ? "border-zinc-500 ring-1 ring-zinc-500"
                        : "border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    <input
                      required
                      type="text"
                      value={expiry}
                      onChange={handleExpiryChange}
                      onFocus={() => setFocusedField("expiry")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full h-full bg-transparent border-none outline-none px-4 text-sm font-mono text-white placeholder:text-zinc-700 text-center"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold ml-1 mb-2 block group-focus-within:text-white transition-colors">
                    CVC
                  </label>
                  <div
                    className={cn(
                      "relative flex items-center h-12 w-full rounded-lg bg-zinc-900/50 border transition-all duration-200",
                      focusedField === "cvc"
                        ? "border-zinc-500 ring-1 ring-zinc-500"
                        : "border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    <input
                      required
                      type="password"
                      onChange={(e) => setCvc(e.target.value)}
                      onFocus={() => setFocusedField("cvc")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="•••"
                      maxLength="4"
                      className="w-full h-full bg-transparent border-none outline-none px-4 text-sm font-mono text-white placeholder:text-zinc-700 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Name on Card */}
              <div className="group">
                <label className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold ml-1 mb-2 block group-focus-within:text-white transition-colors">
                  Cardholder Name
                </label>
                <div
                  className={cn(
                    "relative flex items-center h-12 w-full rounded-lg bg-zinc-900/50 border transition-all duration-200",
                    focusedField === "name"
                      ? "border-zinc-500 ring-1 ring-zinc-500"
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div className="pl-4 text-zinc-400">
                    <PersonIcon className="w-4 h-4" />
                  </div>
                  <input
                    required
                    type="text"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Full Name"
                    className="w-full h-full bg-transparent border-none outline-none px-4 text-sm text-white placeholder:text-zinc-700 font-poppins"
                  />
                </div>
              </div>
            </div>

            {/* Total Row */}
            <div className="flex items-center justify-between py-4 border-t border-zinc-900 mt-6">
              <span className="text-sm text-zinc-400 font-poppins">
                Total due today
              </span>
              <span className="text-xl font-bold text-white font-roboto">
                ${selectedPlan.price}.00
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-12 rounded-lg text-sm font-medium transition-all duration-300",
                "bg-zinc-100 text-black hover:bg-zinc-300",
                "disabled:opacity-50 disabled:cursor-not-allowed font-poppins cursor-pointer"
              )}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
                </div>
              ) : (
                "Pay Now"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-900 flex justify-center gap-6 opacity-30 grayscale transition-opacity hover:opacity-50">
            {/* Simple CSS shapes to mock logos for minimalism */}
            <div className="h-6 w-10 bg-zinc-700 rounded flex items-center justify-center text-[8px] text-zinc-950 font-bold">
              VISA
            </div>
            <div className="h-6 w-10 bg-zinc-700 rounded flex items-center justify-center text-[8px] text-zinc-950 font-bold">
              AMEX
            </div>
            <div className="h-6 w-10 bg-zinc-700 rounded flex items-center justify-center text-[8px] text-zinc-950 font-bold">
              MC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
