import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = async () => {
    setErrorMsg("");

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));

      console.log("Password reset:", password);

      // redirect to login or success page
    } catch (err) {
      setErrorMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-white to-[#F97316]/10 dark:from-zinc-900 dark:to-zinc-800">
      
       <Link
              to="/signin"
              className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-400 transition duration-300 absolute z-100 top-20 left-30 font-inter text-sm flex items-center"
            >
              <ChevronLeft className="size-4 mr-2" /> Back to Signin
            </Link>

      {/* Branding */}
      <h1 className="text-3xl font-medium font-inter mb-8 text-zinc-900 dark:text-zinc-100">FarmAtlas</h1>

      {/* Card Container */}
      <div className="flex flex-col items-center w-full max-w-md gap-6">

        <div className="text-center space-y-1">
          <h2 className="text-lg font-poppins text-zinc-900 dark:text-zinc-100">Reset Password</h2>
          <p className="text-zinc-600 text-md font-roboto dark:text-zinc-400">
            Enter your new password below.
          </p>
        </div>

        <div className="w-full space-y-4">

          {/* New Password */}
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 font-inter text-zinc-700 dark:text-zinc-200"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-zinc-600 dark:text-zinc-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full h-12 font-inter text-zinc-700 dark:text-zinc-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-zinc-600 dark:text-zinc-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Errors */}
          {errorMsg && (
            <div className="bg-red-200 px-4 py-2 border border-red-500 text-red-600 text-sm rounded">
              {errorMsg}
            </div>
          )}

          {/* Reset Button */}
          <Button
            onClick={handleReset}
            disabled={loading}
            variant="kala"
            className="w-full h-10 font-inter text-white"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

          <Link
            to="/signin"
            className="text-sm font-roboto flex justify-center text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-400 hover:text-zinc-900 transition"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
