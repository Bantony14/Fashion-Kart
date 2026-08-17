import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

function PaymentSuccess() {
  const orderId = nanoid(10);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-xl shadow text-center">
        <div className="text-green-500 text-4xl sm:text-5xl mb-4">✔</div>

        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Payment Successful
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mb-4">
          Your order has been placed successfully.
        </p>

        <p className="text-xs sm:text-sm text-gray-400 mb-6 break-all">
          Order ID: <span className="font-medium text-gray-500">{orderId}</span>
        </p>

        <Link
          to="/"
          className="
          inline-block
          w-full sm:w-auto
          bg-gray-900
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-gray-800
          transition
          text-sm sm:text-base
        "
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export { PaymentSuccess };
