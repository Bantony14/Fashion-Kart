import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../App/cart";
import { addWishList } from "../../App/wishlist";
import { Link } from "react-router-dom";
import { addProductDetail } from "../../App/productDetail";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, image, name, price, detail, size, count }) {
  const cartItems = useSelector((state) => state.cart.carts);
  // adjust path if your slice name is different

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

  const handleAddToWishList = () => {
    if (!isAuthenticated()) {
      navigate("/loginPage");
      return;
    }

    dispatch(
      addWishList({
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

  const isInCart = cartItems.some((item) => item.id === id);

  const dispatch = useDispatch();
  return (
    <div
      className="
      bg-white rounded-xl p-3 sm:p-4
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-lg
      w-full
      max-w-[260px]
      mx-auto
    "
    >
      {/* Image */}
      <div className="bg-gray-100 rounded-lg p-3 sm:p-4 flex items-center justify-center">
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
            h-36 w-full
            sm:h-40
            object-contain
            cursor-pointer
          "
          />
        </Link>
      </div>

      {/* Info */}
      <div className="mt-3 sm:mt-4">
        <h3 className="text-base sm:text-lg font-medium text-textMain truncate">
          {name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">
          {detail}
        </p>

        <p className="mt-1 text-base sm:text-lg font-semibold text-textMain">
          ₹{price.toLocaleString("en-IN")}
        </p>

        {/* Cart */}
        {!isInCart ? (
          <button
            className="
            mt-3 w-full
            bg-[#1F2937] text-white
            text-xs sm:text-sm
            py-2 rounded-md
            transition-colors duration-200
            cursor-pointer
            hover:shadow-md
            hover:bg-[#363a3f]
          "
            onClick={() => handleAddToCart()}
          >
            Add to Cart
          </button>
        ) : (
          <Link to="/cart" className="block">
            <button
              className="
              mt-3 w-full
              bg-green-800 text-white
              text-xs sm:text-sm
              py-2 rounded-md
              transition-colors duration-200
              cursor-pointer
              hover:shadow-md
              hover:bg-green-900
            "
            >
              Go to Cart
            </button>
          </Link>
        )}

        {/* Wishlist */}
        <button
          className="
          mt-2 sm:mt-3 w-full
          bg-[#1F2937] text-white
          text-xs sm:text-sm
          py-2 rounded-md
          transition-colors duration-200
          cursor-pointer
          hover:shadow-md
          hover:bg-[#363a3f]
        "
          onClick={() => handleAddToWishList()}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

export { ProductCard };
