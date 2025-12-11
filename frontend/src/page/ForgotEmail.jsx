import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotEmail = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleRecover = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Recovery request sent for:", phone);
      navigate("/send-otp");


      // Show success UI or redirect to verification page
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-white to-[#F97316]/10 dark:from-zinc-900 dark:to-zinc-800">
      
      {/* Back link */}
      <Link
        to="/signin"
        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-400 transition duration-300 absolute z-100 top-20 left-30 font-inter text-sm flex items-center"
      >
        <ChevronLeft className="size-4 mr-2" /> Back to Signin
      </Link>

      {/* Branding */}
      <h1 className="text-3xl font-medium font-inter mb-8 text-zinc-900 dark:text-zinc-100">FarmAtlas</h1>

      {/* Card container */}
      <div className="flex flex-col items-center w-full max-w-md gap-6">
        
        <div className="text-center space-y-1">
          <h2 className="text-lg font-poppins text-zinc-900 dark:text-zinc-100">Forgot your email?</h2>
          <p className="text-zinc-600 text-md font-roboto dark:text-zinc-400">
            Enter your Email to recover your account.
          </p>
        </div>

        <div className="w-full space-y-4">
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Email address"
            className="w-full h-12 font-inter text-zinc-700 dark:text-zinc-200"
          />

          {error && (
            <div className="bg-red-200 px-4 py-2 border border-red-500 text-red-600 text-sm rounded">
              Something went wrong. Try again.
            </div>
          )}

          <Button
            onClick={handleRecover}
            disabled={loading}
            variant="kala"
            className="w-full h-10 font-inter text-white cursor-pointer transition duration-300"
          >
            {loading ? "Sending..." : "Recover Email"}
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

export default ForgotEmail;
