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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center space-y-4">
        <div className="h-12 w-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto" />
        <h2 className="text-lg font-semibold">
          Processing Payment
        </h2>
        <p className="text-sm text-gray-500">
          Please wait, do not refresh the page
        </p>
      </div>
    </div>
  );
}

export {PaymentProcessing};
