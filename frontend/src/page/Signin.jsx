import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // On success, redirect or show success message
      console.log("User signed in:", { email, password });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-white to-[#F97316]/10 dark:from-zinc-900 dark:to-zinc-800">
      <Link
        to="/"
        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-400 transition duration-300 absolute z-100 top-20 left-30 font-inter text-sm flex items-center"
      >
        <ChevronLeft className="size-4 mr-2" /> Back to Home
      </Link>
      <h1 className="text-3xl font-medium font-inter mb-8">FarmAtlas</h1>

      {/* Auth card area */}
      <div className="flex flex-col items-center w-full max-w-md gap-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-poppins text-zinc-900 dark:text-zinc-100">Welcome back</h2>
          <p className="text-zinc-600 text-md font-roboto dark:text-zinc-400">
            Don’t have an account?{" "}
            <Link to="/Signup" className="font-medium text-zinc-900 dark:text-zinc-300">
              Register
            </Link>
          </p>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full py-2 font-inter bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200 cursor-pointer transition duration-300 gap-4"
        >
          <FcGoogle size={20} /> Sign in with Google
        </Button>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-300 " />

        {/* Email + Password */}
        <div className="w-full space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full h-12 font-inter text-zinc-700 dark:text-zinc-200 transition duration-300"
          />
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full h-12 font-inter text-zinc-700 dark:text-zinc-200 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer transition duration-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {Error && (
            <div className="bg-red-200 px-4 py-2 border-2 border-red-500 text-red-500 shadow-xl my-8">
              Something went wrong. Please try again.
            </div>
          )}

          <Button
            onClick={handleSignin}
            disabled={loading}
            variant={"kala"}
            className="w-full h-10 font-inter text-white  cursor-pointer transition duration-300"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <Link to="/forgot-password" className="text-sm font-roboto flex justify-center text-zinc-700 cursor-pointer hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-400 transition duration-300">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
