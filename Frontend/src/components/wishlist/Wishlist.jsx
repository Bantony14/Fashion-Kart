
import { useSelector, useDispatch } from "react-redux";
import { deleteWishListItem } from "../../App/wishlist";
import { addItems } from "../../App/cart";
import { useState , useEffect} from "react";
import {Link} from "react-router-dom";

function Wishlist() {
  const wishlist = useSelector(
    (state) => state.wishList.wishListCart );
  const dispatch = useDispatch();

  const cartItems = useSelector(
  (state) => state.cart?.carts || []
);

const isAlreadyInCart = (id) => {
  return cartItems.some((item) => item.id === id);
};


  const [itemAddMsg,setItemAddMsg] = useState("")
  const [itemAddImg,setItemAddImg] = useState("")

  const [showMsg, setShowMsg] = useState(false);

  const [trigger , setTrigger] = useState(0)

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
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
        <div className="text-center bg-[#111827] p-10 rounded-xl max-w-md">
          <h1 className="text-3xl font-semibold text-white mb-4">
            Your Wishlist is Empty
          </h1>

          <p className="text-gray-400 mb-6">
            Save items you love and come back anytime ❤️
          </p>
      <Link to='/'>
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
    <div className="min-h-screen bg-[#1F2937] text-gray-200 px-6 py-10 rounded-2xl m-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
  <h1 className="text-3xl font-semibold text-white">
    My Wishlist
  </h1>
  {/* alert Msg adding wishItem */}
   {showMsg && (
  <div
  className={`
    fixed top-6 right-6 z-50
    transition-all duration-300 ease-out
    ${showMsg
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-3 pointer-events-none"}
  `}
>
  <div className="flex items-center gap-3 bg-green-900/20 px-4 py-2 rounded-lg shadow-lg">
    
    {/* Image ONLY if value exists */}
    {itemAddImg && (
      <img
        src={itemAddImg}
        alt="success"
        className="h-10 w-10 rounded-xl object-cover"
      />
    )}

    <p className="text-sm text-black">
      {itemAddMsg}
    </p>
  </div>
</div>

)}


</div>


        <div className="space-y-6">
          {wishlist.map((wishItem) => (
            <div
              key={wishItem.id}
              className="flex gap-6 bg-[#111827] p-4 rounded-lg"
            >
              {/* Image */}
              <div className="bg-gray-800 rounded-md p-3">
                <img
                  src={wishItem.src}
                  alt={wishItem.itemName}
                  className="h-24 object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-medium text-white">
                  {wishItem.itemName}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {wishItem.itemDetail}
                </p>

                <div className="flex items-center justify-between mt-4">
                  {/* Price */}
                  <span className="text-lg font-semibold text-white">
                   ₹{Number(wishItem.itemPrice || 0).toLocaleString("en-IN")}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                  <button
  onClick={() => {
    // 🔒 Already in cart check

    if (isAlreadyInCart(wishItem.id)) {
      setItemAddMsg(wishItem.itemName + " is already in the cart");
      setItemAddImg(wishItem.src);
      setTrigger((prev)=>prev+1)
      return;
    }

    // ✅ Add to cart (CORRECT KEYS)
    dispatch(
      addItems({
        id: wishItem.id,
        src: wishItem.src,
        name: wishItem.itemName,
        price: Number(wishItem.itemPrice),
        detail: wishItem.itemDetail,
        count: 1,
      })
    );

    // ✅ Remove from wishlist
    dispatch(deleteWishListItem(wishItem.id));

    // ✅ Success message
    setItemAddMsg(wishItem.itemName + " added to cart");
    setItemAddImg(wishItem.src);
    
  }}
  className="text-sm text-blue-400 hover:text-blue-500"
>
  Add to Cart
</button>


                    <button
                      onClick={() =>
                        dispatch(deleteWishListItem(wishItem.id))
                      }
                      className="text-sm text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                    {console.log(trigger)}
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



