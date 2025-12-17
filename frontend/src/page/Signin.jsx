import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Login
      await api.post("/auth/signin", { email, password });

      // 2️⃣ Fetch logged-in user
      const res = await api.get("/auth/me");
      const user = res.data.user;

      // 3️⃣ Store user in context
      setUser(user);

      // 4️⃣ Redirect based on role
      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "WORKER") navigate("/worker");
      else if (user.role === "VET") navigate("/vet");
      else navigate("/");

    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
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
            Welcome back
          </h2>
          <p className="text-zinc-600 text-md font-roboto dark:text-zinc-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-medium">
              Register
            </Link>
          </p>
        </div>


        <div className="w-full h-px bg-zinc-300" />

        <div className="w-full space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
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
            onClick={handleSignin}
            disabled={loading}
            variant="kala"
            className="w-full"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <Link
            to="/forgot-password"
            className="text-sm flex justify-center"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
