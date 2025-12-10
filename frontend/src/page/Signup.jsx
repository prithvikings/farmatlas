import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  const [Error, setError] = useState(false);
  const [role, setRole] = useState("Admin");

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-white to-green-200/50">
      <Link
        to="/"
        className="text-zinc-700 hover:text-zinc-900 transition duration-300 absolute z-100 top-20 left-30 font-inter text-sm flex items-center"
      >
        <ChevronLeft className="size-4 mr-2" /> Back to Home
      </Link>
      <h1 className="text-3xl font-medium font-inter mb-8">FarmAtlas</h1>

      {/* Auth card area */}
      <div className="flex flex-col items-center w-full max-w-md gap-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-poppins text-zinc-900">Welcome back</h2>
          <p className="text-zinc-600 text-md font-roboto">
            Already have a account?{" "}
            <Link to="/get-started" className="font-medium text-zinc-900">
              Sign In
            </Link>
          </p>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full py-2 font-inter bg-zinc-300 text-zinc-800 cursor-pointer transition duration-300 gap-4"
        >
          <FcGoogle size={20} /> Sign Up with Google
        </Button>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-300" />

        {/* Email + Password */}
        <div className="w-full space-y-4">
          <Input
            placeholder="Name"
            className="w-full h-12 font-inter text-zinc-700 transition duration-300"
          />
          <Input
            placeholder="Email address"
            className="w-full h-12 font-inter text-zinc-700 transition duration-300"
          />
          <Input
            placeholder="Password"
            type="password"
            className="w-full h-12 font-inter text-zinc-700 border-zinc-300 focus:border-none outline-0 transition duration-300"
          />
          <div className="gap-4 flex">
            {["Admin", "Worker", "Vet"].map((r) => (
              <Button
                key={r}
                onClick={() => setRole(r)}
                className={
                  "h-10 font-inter transition duration-300 cursor-pointer " +
                  (role === r
                    ? "bg-black text-white hover:bg-zinc-900" // selected
                    : "bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100") // unselected
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
            variant={"kala"}
            className="w-full h-10 font-inter text-white cursor-pointer transition duration-300"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
