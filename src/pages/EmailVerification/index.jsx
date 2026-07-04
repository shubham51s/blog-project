import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import GlobalLoaderComp from "../../components/Common/globalLoader";
import { useRequestHandler } from "../../hooks/requestHandler";
import { showToast } from "../../utils/toaster";

const EmailVerification = () => {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setIsSuccess] = useState(false);
  const navigateTimeout = useRef(null);

  const navigateToLogin = () => {
    if (navigateTimeout.current) clearTimeout(navigateTimeout.current);
    navigate("/");
  };

  const verifyEmail = async () => {
    if (!token) {
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await requestHandler(`/users/verify-email/${token}`);
      const result = await response.json();

      if (response?.status === 200) {
        setIsSuccess(true);
        showToast(result?.message || "");
        if (navigateTimeout.current) clearTimeout(navigateTimeout.current);
        navigate.current = setTimeout(() => {
          navigateToLogin();
        }, 3000);
      } else {
        setIsSuccess(false);
        showToast(result?.message || "Some error occured");
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <>
      {isLoading && <GlobalLoaderComp />}
      {!isLoading && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-lg border border-gray-200 p-10 text-center">
            {success ? (
              <>
                <FaCheckCircle className="mx-auto margin-11 text-6xl text-green-500" style={{ marginTop: 0 }} />

                <h1 className="font18 font-semibold color-3">Email Verified</h1>

                <p style={{ marginBottom: 0, marginInline: 0 }} className="margin-34 color-4 line-h-8 font-9">
                  Your email has been successfully verified.
                  <br />
                  You can now sign in and start exploring your account.
                </p>

                <button onClick={navigateToLogin} className="mt-8 w-full rounded-lg bg-[#000000] px-5 py-3 text-white font-medium cursor-pointer">
                  Continue to Sign In
                </button>
              </>
            ) : (
              <>
                <FaTimesCircle className="mx-auto margin-11 text-6xl text-red-500" style={{ marginTop: 0 }} />

                <h1 className="font18 font-semibold color-3">Verification Link Invalid</h1>

                <p style={{ marginBottom: 0, marginInline: 0 }} className="margin-34 color-4 line-h-8 font-9">
                  This verification link is invalid or has expired.
                  <br />
                  Please request a new verification email and try again.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerification;
