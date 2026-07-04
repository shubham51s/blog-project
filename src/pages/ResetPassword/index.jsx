import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { showToast } from "../../utils/toaster";
import { useRequestHandler } from "../../hooks/requestHandler";
import GlobalLoaderComp from "../../components/Common/globalLoader";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function ResetPassword() {
  const { requestHandler } = useRequestHandler();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);

  const navigateToHome = () => {
    navigate("/");
  };

  const isValidPass = () => {
    if (!pass) {
      showToast("Please enter password", "error");
      return false;
    } else if (pass.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return false;
    } else if (pass !== confirmPass) {
      showToast("Password did not match", "error");
      return false;
    }
    return true;
  };

  const handleSubmitBtnClick = async () => {
    if (!isValidPass()) return;

    setIsLoading(true);
    try {
      const response = await requestHandler("/users/reset-password", "POST", { passwore: pass });
      const result = await response.json();

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

  const verifyResetPassToken = async () => {
    if (!token) {
      setInitialLoader(false);
      return;
    }

    try {
      const response = await requestHandler(`/users/verify-password-reset-token/${token}`);
      const result = await response.json();

      console.log("result: --> ", result);

      if (response?.status === 200) setIsTokenValid(true);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoader(false);
    }
  };

  useEffect(() => {
    verifyResetPassToken();
  }, []);

  return (
    <>
      {initialLoader && <GlobalLoaderComp />}
      {!initialLoader && (
        <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
          {isTokenValid && (
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <h1 className="text-center text-3xl font-bold text-gray-900">Reset your password</h1>

              <p className="mt-4 text-center text-sm leading-6 text-gray-600">Enter your new password below to regain access to your account.</p>

              <div className="mt-8 space-y-6">
                <div className="w-full margin53">
                  <FormLabel htmlFor="password" className="font-10">
                    Password
                  </FormLabel>
                  <div className="height-2 margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                    <TextField
                      id="password"
                      fullWidth
                      placeholder="Enter new password"
                      className="w-full h-full font-10"
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      sx={{
                        height: "100%",
                        "& .MuiOutlinedInput-root": {
                          height: "100%",
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="w-full height-2 margin53">
                  <TextField
                    fullWidth
                    placeholder="Confirm new password"
                    className="w-full h-full font-10"
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    sx={{
                      height: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                      },
                    }}
                  />
                </div>
                <div className="height-2 margin-8 flex items-center w-full justify-center" style={{ marginInline: 0, marginBottom: 0 }}>
                  <button onClick={handleSubmitBtnClick} disabled={isLoading} className={`h-full w-full flex items-center justify-center custom-gap-3 bg-black font-normal color-5 font13 rounded-full opacity-[0.95] transition-all ease duration-75 ${isLoading ? "!opacity-[0.85]" : "cursor-pointer hover:opacity-100"}`}>
                    {isLoading && <CircularProgress size={22} />}
                    Reset Password
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button disabled={isLoading} onClick={navigateToHome} className="text-sm font-medium text-gray-700 cursor-pointer transition duration-75 ease hover:text-black">
                  ← Back to Sign In
                </button>
              </div>
            </div>
          )}
          {!isTokenValid && (
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-lg border border-gray-200 p-10 text-center">
              <FaTimesCircle className="mx-auto margin-11 text-6xl text-red-500" style={{ marginTop: 0 }} />

              <h1 className="font18 font-semibold color-3">Password Reset Link Invalid</h1>

              <p style={{ marginBottom: 0, marginInline: 0 }} className="margin-34 color-4 line-h-8 font-9">
                This reset link is invalid or has expired.
                <br />
                Please request a new password reset link and try again.
              </p>
            </div>
          )}
        </main>
      )}
    </>
  );
}

export default ResetPassword;
