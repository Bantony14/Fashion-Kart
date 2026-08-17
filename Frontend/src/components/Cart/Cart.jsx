import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItems,
  countItemDecrease,
  countItemIncrease,
  updateSize,
} from "../../App/cart";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.carts);
  const subTotal = cart.reduce((total, items) => {
    return total + Number(items.itemPrice) * items.itemCount;
  }, 0);
  const shipping = 50;
  const tax = Math.floor((subTotal * 0.18) / 100);
  const grandTotal = subTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
        <div className="text-center bg-[#111827] p-10 rounded-xl max-w-md">
          <h1 className="text-3xl font-semibold text-white mb-4">
            Your Cart is Empty
          </h1>

          <p className="text-gray-400 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/">
            <button
              className="
              bg-primary px-6 py-3 rounded-md
              text-white font-medium
              hover:bg-blue-700 transition
            "
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <Outlet />

      <div className="min-h-screen bg-[#1F2937] text-gray-200 px-4 sm:px-6 py-6 sm:py-10 rounded-none sm:rounded-2xl sm:m-4 lg:m-10">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cart.map((allItems) => (
                <div
                  key={allItems.id}
                  className="
                flex flex-col sm:flex-row
                gap-4 sm:gap-6
                bg-[#111827]
                p-4
                rounded-lg
              "
                >
                  {/* Product Image */}
                  <div
                    className="
                  bg-gray-800 rounded-md p-3
                  flex items-center justify-center
                  w-full sm:w-auto
                  shrink-0
                "
                  >
                    <img
                      src={allItems.src}
                      alt={allItems.itemName}
                      className="h-32 sm:h-24 w-full sm:w-24 object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-base sm:text-lg">
                      {allItems.itemName}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {allItems.itemDetail}
                    </p>

                    {/* Size Buttons */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            dispatch(
                              updateSize({
                                cardId: allItems.cardId,
                                size,
                              }),
                            )
                          }
                          className={`
                        px-3 py-1
                        border border-gray-600
                        rounded-md
                        text-sm
                        transition
                        ${
                          allItems.itemSize === size
                            ? "bg-blue-900 text-white border-blue-700"
                            : "hover:border-gray-300"
                        }
                      `}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Price + Quantity + Remove */}
                    <div
                      className="
                    flex flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    mt-4
                  "
                    >
                      {/* Price + Quantity */}
                      <div className="flex items-center justify-between sm:justify-start gap-6">
                        <span className="text-lg font-semibold text-white">
                          ₹
                          {Number(allItems.itemPrice || 0).toLocaleString(
                            "en-IN",
                          )}
                        </span>

                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              dispatch(countItemDecrease(allItems.id))
                            }
                            className="
                          h-8 w-8
                          flex items-center justify-center
                          rounded-md
                          bg-gray-700
                          text-white
                          hover:bg-gray-600
                          transition
                        "
                          >
                            −
                          </button>

                          <span className="min-w-[24px] text-center text-white">
                            {allItems.itemCount}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(countItemIncrease(allItems.id))
                            }
                            className="
                          h-8 w-8
                          flex items-center justify-center
                          rounded-md
                          bg-gray-700
                          text-white
                          hover:bg-gray-600
                          transition
                        "
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => dispatch(deleteItems(allItems.cardId))}
                        className="
                      self-start sm:self-auto
                      cursor-pointer
                      text-sm
                      text-red-400
                      hover:text-red-500
                      transition
                    "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div
              className="
            bg-[#111827]
            p-5 sm:p-6
            rounded-lg
            h-fit
            lg:sticky
            lg:top-8
            w-full
          "
            >
              <h2 className="text-xl font-semibold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span>Subtotal</span>
                  <span>₹{subTotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Shipping</span>
                  <span>₹{shipping.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Tax</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>

                <hr className="border-gray-700 my-3" />

                <div className="flex justify-between gap-4 text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout */}
              <Link to="/checkoutpage">
                <button
                  className="
                w-full
                mt-6
                bg-primary
                py-3
                rounded-md
                text-white
                font-medium
                hover:bg-blue-700
                transition
              "
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Cart };
