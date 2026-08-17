import { useSelector, useDispatch } from "react-redux";
import { deleteWishListItem } from "../../App/wishlist";
import { addItems } from "../../App/cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishList.wishListCart);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.carts || []);

  const isAlreadyInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  const [itemAddMsg, setItemAddMsg] = useState("");
  const [itemAddImg, setItemAddImg] = useState("");

  const [showMsg, setShowMsg] = useState(false);

  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setShowMsg(true);

    const timer = setTimeout(() => {
      setShowMsg(false);
    }, 1500); // 👈 1.5 second

    return () => clearTimeout(timer);
  }, [trigger]);

  // EMPTY WISHLIST UI
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center px-4 py-8">
        <div className="text-center bg-[#111827] p-6 sm:p-10 rounded-xl w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Your Wishlist is Empty
          </h1>

          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Save items you love and come back anytime ❤️
          </p>

          <Link to="/">
            <button
              className="
                bg-blue-600
                px-5 sm:px-6
                py-2.5 sm:py-3
                rounded-md
                text-white
                font-medium
                text-sm sm:text-base
                hover:bg-blue-700
                transition
                cursor-pointer
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
    <div
      className="
        min-h-screen
        bg-[#1F2937]
        text-gray-200
        px-3 sm:px-6
        py-6 sm:py-10
        rounded-2xl
        mx-2 sm:m-10
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            My Wishlist
          </h1>

          {/* Alert Message */}
          {showMsg && (
            <div
              className="
                fixed
                top-4
                right-3 sm:right-6
                left-3 sm:left-auto
                z-50
                transition-all
                duration-300
                ease-out
              "
            >
              <div
                className="
                flex
                items-center
                gap-3
                bg-white
                px-3 sm:px-4
                py-2
                rounded-lg
                shadow-lg
              "
              >
                {itemAddImg && (
                  <img
                    src={itemAddImg}
                    alt="success"
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl object-cover shrink-0"
                  />
                )}

                <p className="text-xs sm:text-sm text-gray-800">{itemAddMsg}</p>
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4 sm:space-y-6">
          {wishlist.map((wishItem) => (
            <div
              key={wishItem.id}
              className="
                flex
                flex-col
                sm:flex-row
                gap-4 sm:gap-6
                bg-[#111827]
                p-3 sm:p-4
                rounded-lg
              "
            >
              {/* Image */}
              <div
                className="
                  bg-gray-800
                  rounded-md
                  p-3
                  flex
                  items-center
                  justify-center
                  w-full
                  sm:w-auto
                  shrink-0
                "
              >
                <img
                  src={wishItem.src}
                  alt={wishItem.itemName}
                  className="
                    h-36
                    sm:h-24
                    w-full
                    sm:w-28
                    object-contain
                  "
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-base sm:text-lg">
                  {wishItem.itemName}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">
                  {wishItem.itemDetail}
                </p>

                {/* Price + Actions */}
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-3
                    mt-4
                  "
                >
                  {/* Price */}
                  <span className="text-lg font-semibold text-white">
                    ₹{Number(wishItem.itemPrice || 0).toLocaleString("en-IN")}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        if (isAlreadyInCart(wishItem.id)) {
                          setItemAddMsg(
                            wishItem.itemName + " is already in the cart",
                          );

                          setItemAddImg(wishItem.src);

                          setTrigger((prev) => prev + 1);

                          return;
                        }

                        dispatch(
                          addItems({
                            id: wishItem.id,
                            src: wishItem.src,
                            name: wishItem.itemName,
                            price: Number(wishItem.itemPrice),
                            detail: wishItem.itemDetail,
                            count: 1,
                          }),
                        );

                        dispatch(deleteWishListItem(wishItem.id));

                        setItemAddMsg(wishItem.itemName + " added to cart");

                        setItemAddImg(wishItem.src);
                      }}
                      className="
                        text-sm
                        text-blue-400
                        hover:text-blue-500
                        cursor-pointer
                        whitespace-nowrap
                      "
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => dispatch(deleteWishListItem(wishItem.id))}
                      className="
                        text-sm
                        text-red-400
                        hover:text-red-500
                        cursor-pointer
                        whitespace-nowrap
                      "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
