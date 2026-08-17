import { useDispatch, useSelector } from "react-redux";
import { addProductDetail } from "../../App/productDetail";
import { Link } from "react-router-dom";
import { addItems } from "../../App/cart";
import { useNavigate } from "react-router-dom";

function ListCard({ image, name, price, detail, count, id, size }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);
  const isItInCart = cartItems.some((item) => item.id === id);
  const isAuthenticated = () => !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      navigate("/loginPage");
      return;
    }

    dispatch(
      addItems({
        id,
        src: image,
        name,
        price,
        detail,
        size,
        count,
      }),
    );
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      hover:shadow-lg
      transition
      duration-300
      w-full
      max-w-[230px]
      mx-auto
      overflow-hidden
    "
    >
      {/* Image Section */}
      <div
        className="
        bg-gray-100
        flex
        items-center
        justify-center
        h-36
        sm:h-40
      "
      >
        <Link to="/pdp">
          <img
            onClick={() =>
              dispatch(
                addProductDetail({
                  id,
                  src: image,
                  name,
                  price,
                  detail,
                  size,
                  count,
                }),
              )
            }
            src={image}
            alt={name}
            className="
            h-24
            sm:h-28
            w-full
            object-contain
            cursor-pointer
            transition-transform
            duration-300
            hover:scale-105
          "
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
          {name}
        </h3>

        {/* Detail */}
        <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2">
          {detail}
        </p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <span className="font-bold text-sm sm:text-base shrink-0">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {!isItInCart ? (
            <button
              onClick={() => handleAddToCart()}
              className="
              bg-gray-900
              text-white
              px-2.5 sm:px-3
              py-1.5
              rounded-md
              text-[10px] sm:text-xs
              cursor-pointer
              hover:bg-gray-800
              transition
              whitespace-nowrap
            "
            >
              Add to Cart
            </button>
          ) : (
            <Link to="/cart">
              <button
                className="
                bg-green-700
                text-white
                px-2.5 sm:px-3
                py-1.5
                rounded-md
                text-[10px] sm:text-xs
                cursor-pointer
                hover:bg-green-800
                transition
                whitespace-nowrap
              "
              >
                Go to Cart
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export { ListCard };
