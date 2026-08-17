import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/payment-success");
    }, 2000); // 2 sec fake processing

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow text-center space-y-4">
        <div className="h-10 w-10 sm:h-12 sm:w-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto" />

        <h2 className="text-base sm:text-lg font-semibold">
          Processing Payment
        </h2>

        <p className="text-xs sm:text-sm text-gray-500">
          Please wait, do not refresh the page
        </p>
      </div>
    </div>
  );
}

export { PaymentProcessing };
