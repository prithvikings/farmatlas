import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [farmName, setFarmName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Signup (creates admin + farm)
      await api.post("/auth/signup", {
        name,
        email,
        password,
        farmName,
      });

      // 2️⃣ Fetch logged-in user
      const res = await api.get("/auth/me");
      const user = res.data.user;

      // 3️⃣ Store user
      setUser(user);

      // 4️⃣ Redirect admin
      navigate("/admin");

    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-white to-[#F97316]/10 dark:from-zinc-900 dark:to-zinc-800">
      <Link
        to="/"
        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-400 transition duration-300 absolute top-6 left-6 font-inter text-sm flex items-center"
      >
        <ChevronLeft className="size-4 mr-2" /> Back to Home
      </Link>

      <h1 className="text-3xl font-medium font-inter mb-8">FarmAtlas</h1>

      <div className="flex flex-col items-center w-full max-w-md gap-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-poppins text-zinc-900 dark:text-zinc-100">
            Create your farm account
          </h2>
          <p className="text-zinc-600 text-md font-roboto dark:text-zinc-400">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium">
              Sign In
            </Link>
          </p>
        </div>


        <div className="w-full h-px bg-zinc-300 dark:bg-zinc-600" />

        <div className="w-full space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />

          <Input
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            placeholder="Farm Name (unique)"
          />

          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 border border-red-400">
              {error}
            </div>
          )}

          <Button
            onClick={handleSignup}
            disabled={loading}
            variant="kala"
            className="w-full"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
