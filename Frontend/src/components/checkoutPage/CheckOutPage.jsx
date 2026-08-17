import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../Api/axios.js";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.carts);

  const subTotal = cart.reduce((total, items) => {
    return total + Number(items.itemPrice) * items.itemCount;
  }, 0);

  const shipping = 50;
  const tax = Math.round((subTotal * 0.18) / 100);
  const grandTotal = subTotal + shipping + tax;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payment: "cod",
    },
  });

  const payment = watch("payment");
  const navigate = useNavigate();

  // Razorpay
  const handleRazorpay = async (formValues) => {
    const { data } = await API.post("/payment/create-order", {
      amount: grandTotal,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "FashionKart",
      order_id: data.id,

      handler: async function (response) {
        await API.post("/orders/save", {
          items: cart.map((i) => ({
            name: i.itemName,
            price: i.itemPrice,
            image: i.src,
            qty: i.itemCount,
            size: i.itemSize,
          })),
          amount: grandTotal,
          address: formValues,
          paymentId: response.razorpay_payment_id,
        });

        navigate("/payment-success");
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const onSubmit = (data) => {
    if (data.payment === "online") {
      handleRazorpay(data);
    } else {
      API.post("/orders/save", {
        items: cart.map((i) => ({
          name: i.itemName,
          price: i.itemPrice,
          image: i.src,
          qty: i.itemCount,
          size: i.itemSize,
        })),
        amount: grandTotal,
        address: data,
        paymentId: "COD",
      });

      navigate("/payment-success");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#0d1b41]/60">
          FashionKart
        </p>

        <div className="w-12 sm:w-[60px] h-[2px] bg-[#0d1b41] mx-auto my-4" />

        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-[#0d1b41]">
          Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="
            max-w-[1100px]
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-[1fr_380px]
            gap-6 sm:gap-7
          "
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Delivery Address */}
            <div className="bg-white border border-[#0d1b41]/10 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-[#0d1b41]">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0d1b41] text-white text-xs sm:text-sm shrink-0">
                  1
                </span>
                Delivery Address
              </h2>

              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mt-2 mb-6 sm:mb-7">
                Where should we send your order?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-widest uppercase text-gray-600 font-medium">
                    Full Name
                  </label>

                  <input
                    placeholder="John Doe"
                    className="
                      w-full
                      bg-[#f8f9fc]
                      border-[1.5px]
                      border-[#e0e4f0]
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      text-[#1a2340]
                      outline-none
                      focus:border-[#0d1b41]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#0d1b41]/10
                      transition
                    "
                    {...register("name", {
                      required: "Name required",
                    })}
                  />

                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-widest uppercase text-gray-600 font-medium">
                    Phone Number
                  </label>

                  <input
                    placeholder="+91 98765 43210"
                    className="
                      w-full
                      bg-[#f8f9fc]
                      border-[1.5px]
                      border-[#e0e4f0]
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      text-[#1a2340]
                      outline-none
                      focus:border-[#0d1b41]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#0d1b41]/10
                      transition
                    "
                    {...register("phone", {
                      required: "Phone required",
                      minLength: {
                        value: 10,
                        message: "Invalid phone",
                      },
                    })}
                  />

                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs tracking-widest uppercase text-gray-600 font-medium">
                    Full Address
                  </label>

                  <textarea
                    rows="3"
                    placeholder="House / Building, Street, Area"
                    className="
                      w-full
                      bg-[#f8f9fc]
                      border-[1.5px]
                      border-[#e0e4f0]
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      text-[#1a2340]
                      outline-none
                      resize-y
                      focus:border-[#0d1b41]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#0d1b41]/10
                      transition
                    "
                    {...register("address", {
                      required: "Address required",
                    })}
                  />

                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-widest uppercase text-gray-600 font-medium">
                    City
                  </label>

                  <input
                    placeholder="Mumbai"
                    className="
                      w-full
                      bg-[#f8f9fc]
                      border-[1.5px]
                      border-[#e0e4f0]
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      text-[#1a2340]
                      outline-none
                      focus:border-[#0d1b41]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#0d1b41]/10
                      transition
                    "
                    {...register("city", {
                      required: "City required",
                    })}
                  />

                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-widest uppercase text-gray-600 font-medium">
                    Pincode
                  </label>

                  <input
                    placeholder="400001"
                    className="
                      w-full
                      bg-[#f8f9fc]
                      border-[1.5px]
                      border-[#e0e4f0]
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      text-[#1a2340]
                      outline-none
                      focus:border-[#0d1b41]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#0d1b41]/10
                      transition
                    "
                    {...register("pincode", {
                      required: "Pincode required",
                      minLength: {
                        value: 6,
                        message: "Invalid pincode",
                      },
                    })}
                  />

                  {errors.pincode && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-[#0d1b41]/10 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-[#0d1b41]">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0d1b41] text-white text-xs sm:text-sm shrink-0">
                  2
                </span>
                Payment Method
              </h2>

              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mt-2 mb-6 sm:mb-7">
                Choose how you'd like to pay
              </p>

              <div className="flex flex-col gap-3">
                {/* COD */}
                <label
                  className="
                    flex
                    items-center
                    gap-3 sm:gap-4
                    p-4 sm:px-5
                    border-[1.5px]
                    border-[#e0e4f0]
                    rounded-xl
                    cursor-pointer
                    bg-[#f8f9fc]
                    hover:border-[#0d1b41]
                    hover:bg-[#f0f2f8]
                    transition
                  "
                >
                  <input
                    type="radio"
                    value="cod"
                    {...register("payment")}
                    className="w-4 h-4 accent-[#0d1b41] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1a2340]">
                      Cash on Delivery
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      Pay when your order arrives
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs tracking-wider uppercase bg-[#0d1b41]/5 text-[#0d1b41] border border-[#0d1b41]/15 rounded px-2 py-1 shrink-0">
                    COD
                  </span>
                </label>

                {/* Online */}
                <label
                  className="
                    flex
                    items-center
                    gap-3 sm:gap-4
                    p-4 sm:px-5
                    border-[1.5px]
                    border-[#e0e4f0]
                    rounded-xl
                    cursor-pointer
                    bg-[#f8f9fc]
                    hover:border-[#0d1b41]
                    hover:bg-[#f0f2f8]
                    transition
                  "
                >
                  <input
                    type="radio"
                    value="online"
                    {...register("payment")}
                    className="w-4 h-4 accent-[#0d1b41] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1a2340]">
                      Online Payment
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      UPI, Cards, Net Banking via Razorpay
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs tracking-wider uppercase bg-[#0d1b41]/5 text-[#0d1b41] border border-[#0d1b41]/15 rounded px-2 py-1 shrink-0">
                    Secure
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Cart Items */}
            <div className="bg-white border border-[#0d1b41]/10 rounded-2xl p-5 sm:p-7 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0d1b41]">
                Your Items
              </h2>

              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mt-2 mb-6">
                {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
              </p>

              <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1">
                {cart.map((i, idx) => (
                  <div
                    key={idx}
                    className="
                      flex
                      items-center
                      gap-3
                      p-2.5
                      bg-[#f8f9fc]
                      border
                      border-[#e8ecf4]
                      rounded-lg
                      hover:border-[#0d1b41]/20
                      transition
                    "
                  >
                    <img
                      src={i.src}
                      alt={i.itemName}
                      className="
                        w-12
                        h-12
                        object-cover
                        rounded-lg
                        border
                        border-[#e0e4f0]
                        shrink-0
                      "
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a2340] truncate">
                        {i.itemName}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Qty {i.itemCount}
                      </p>
                    </div>

                    <span className="text-sm font-bold text-[#0d1b41] whitespace-nowrap">
                      ₹{i.itemPrice}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-[#0d1b41]/10 rounded-2xl p-5 sm:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0d1b41]">
                Order Summary
              </h2>

              <div className="mt-4">
                <div className="flex justify-between items-center gap-4 text-sm text-gray-400 py-2">
                  <span>Subtotal</span>
                  <span>₹{subTotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center gap-4 text-sm text-gray-400 py-2">
                  <span>Delivery</span>
                  <span>₹{shipping.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center gap-4 text-sm text-gray-400 py-2">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center gap-4 border-t-[1.5px] border-[#e0e4f0] mt-2 pt-4 text-lg sm:text-xl font-bold text-[#0d1b41]">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="submit"
                className="
                  mt-6
                  w-full
                  py-3.5 sm:py-4
                  bg-[#0d1b41]
                  hover:bg-[#1a2f66]
                  rounded-xl
                  text-sm
                  font-semibold
                  tracking-[0.15em]
                  uppercase
                  text-white
                  cursor-pointer
                  transition
                  active:scale-[0.99]
                "
              >
                Place Order
              </button>

              <div className="flex justify-center items-center gap-2 mt-4 text-[10px] sm:text-xs tracking-wider uppercase text-gray-400 text-center">
                <svg
                  width="11"
                  height="13"
                  viewBox="0 0 11 13"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M5.5 0L0.5 2.5V6C0.5 9.1 2.7 12 5.5 13C8.3 12 10.5 9.1 10.5 6V2.5L5.5 0Z"
                    fill="currentColor"
                  />
                </svg>
                Secured by 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export { CheckoutPage };
