import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { showToast } from "../../utils/toaster";
import { useRequestHandler } from "../../hooks/requestHandler";

function ForgotPassword() {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleNavigation = () => {
    navigate("/");
  };

  const handleSubmitBtnClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter valid email address", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestHandler("/users/forgot-password", "POST", { email });
      const result = await response.json();

      console.log("result: ", result);
      if (response?.status === 200) {
        if (result?.message) showToast(result.message, "success");
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-center text-3xl font-bold text-gray-900">Forgot your password?</h1>

        <p className="mt-4 text-center text-sm leading-6 text-gray-600">Enter the email address associated with your account and we'll send you a link to reset your password.</p>

        <div className="mt-8 space-y-6">
          <div className="w-full margin53">
            <FormLabel htmlFor="email" className="font-10">
              Email
            </FormLabel>
            <div className="height-2 margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
              <TextField
                fullWidth
                id="email"
                placeholder="Enter email address"
                className="w-full h-full font-10"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  height: "100%",
                  "& .MuiOutlinedInput-root": {
                    height: "100%",
                  },
                }}
              />
            </div>
          </div>
          <div className="height-2 margin-8 flex items-center w-full justify-center" style={{ marginInline: 0, marginBottom: 0 }}>
            <button onClick={handleSubmitBtnClick} disabled={isLoading} className={`h-full w-full flex items-center justify-center custom-gap-3 bg-black font-normal color-5 font13 rounded-full opacity-[0.95] transition-all ease duration-75 ${isLoading ? "!opacity-[0.85]" : "cursor-pointer hover:opacity-100"}`}>
              {isLoading && <CircularProgress size={22} />}
              Send Reset Link
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button disabled={isLoading} onClick={handleNavigation} className="text-sm font-medium text-gray-700 cursor-pointer transition duration-75 ease hover:text-black">
            ← Back to Sign In
          </button>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
