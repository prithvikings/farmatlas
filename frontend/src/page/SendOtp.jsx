import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

const SendOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
    const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto move focus
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP verified:", code);
        navigate("/reset-password");
      // Redirect or show success
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-white to-green-200/50">

      {/* Back link */}
      <Link
        to="/signin"
        className="text-zinc-700 hover:text-zinc-900 transition duration-300 absolute z-100 top-20 left-30 font-inter text-sm flex items-center"
      >
        <ChevronLeft className="size-4 mr-2" /> Back to Signin
      </Link>

      {/* Branding */}
      <h1 className="text-3xl font-medium font-inter mb-8">FarmAtlas</h1>

      {/* Card */}
      <div className="flex flex-col items-center w-full max-w-md gap-6">

        <div className="text-center space-y-1">
          <h2 className="text-lg font-poppins text-zinc-900">Verify your OTP</h2>
          <p className="text-zinc-600 text-md font-roboto">
            Enter the 6-digit code sent to your phone.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 w-full">
          {otp.map((digit, i) => (
            <Input
              key={i}
              id={`otp-${i}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-12 text-center text-xl font-inter"
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-200 px-4 py-2 border border-red-500 text-red-600 text-sm rounded mt-2">
            Invalid or incomplete OTP. Try again.
          </div>
        )}

        {/* Verify button */}
        <Button
          onClick={handleVerify}
          disabled={loading}
          variant="kala"
          className="w-full h-10 font-inter text-white cursor-pointer"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        {/* Resend */}
        <button
          className="text-sm font-roboto text-zinc-700 hover:text-zinc-900 transition cursor-pointer"
          onClick={() => console.log("Resend OTP")}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default SendOtp;
