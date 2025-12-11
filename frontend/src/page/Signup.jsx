import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState(false);
  const [role, setRole] = useState("Admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // On success, redirect or show success message
      console.log("User signed up:", { name, email, password, role });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

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
            Already have a account?{" "}
            <Link to="/signin" className="font-medium text-zinc-900 dark:text-zinc-300">
              Sign In
            </Link>
          </p>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full py-2 font-inter bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200 cursor-pointer transition duration-300 gap-4"
        >
          <FcGoogle size={20} /> Sign Up with Google
        </Button>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-300 dark:bg-zinc-600" />

        {/* Email + Password */}
        <div className="w-full space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full h-12 font-inter text-zinc-700 dark:text-zinc-200 transition duration-300"
          />
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition duration-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="gap-4 flex w-full justify-center">
            {["Admin", "Worker", "Vet"].map((r) => (
              <Button
                key={r}
                onClick={() => setRole(r)}
                className={
                  "h-10 font-inter transition duration-300 cursor-pointer " +
                  (role === r
                    ? "bg-black text-white hover:bg-zinc-900 flex-1" // selected
                    : "bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100 flex-1") // unselected
                }
              >
                {r}
              </Button>
            ))}
          </div>

          {Error && (
            <div className="bg-red-200 px-4 py-2 border-2 border-red-500 text-red-500 shadow-xl my-8">
              Something went wrong. Please try again.
            </div>
          )}

          <Button
            onClick={handleSignup}
            disabled={loading}
            variant={"kala"}
            className="w-full h-10 font-inter text-white cursor-pointer transition duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
