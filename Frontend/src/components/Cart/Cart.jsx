import { Outlet } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { deleteItems ,countItemDecrease,countItemIncrease, updateSize } from "../../App/cart";
import {Link} from "react-router-dom"




function Cart() {

const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.carts)
  const subTotal = cart.reduce((total,items)=>{
    return  total + Number(items.itemPrice) * items.itemCount
  },0)
  const shipping = 50;
  const tax = Math.floor(subTotal*0.18/100)
  const grandTotal = subTotal+shipping+tax



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

    <>
    <Outlet/>

    <div className="min-h-screen bg-[#1F2937] text-gray-200 px-6 py-10  rounded-2xl m-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-8">
          Shopping Cart
        </h1>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* LEFT COLUMN  */}
<div className="md:col-span-2 space-y-6">

  {cart.map((allItems) => (
    <div
      key={allItems.id}
      className="flex gap-6 bg-[#111827] p-4 rounded-lg"
    >
      <div className="bg-gray-800 rounded-md p-3">
        <img
          src={allItems.src}
          alt={allItems.itemName}
          className="h-24 object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-white">
          {allItems.itemName}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {allItems.itemDetail}
        </p>
{/* Size Bttn */}
    <div className="flex gap-2 mt-2">
  {["S","M","L","XL"].map((size) => (
    <button
      key={size}
      onClick={() =>
        dispatch(updateSize({ cardId : allItems.cardId, size }))
      }
      className={`
        px-3 py-1 border rounded-md text-sm
        ${allItems.itemSize === size
          ? "bg-blue-900 text-white"
          : "hover:border-gray-900"}
      `}
    >
      {size}
    </button>
  ))}
</div>


        <div className="flex items-center justify-between mt-4">
          <div>   
            <span className="text-lg font-semibold text-white">
           ₹{Number(allItems.itemPrice || 0).toLocaleString("en-IN")}

          </span>

          {/* Right: Quantity Counter */}
  <div className="flex items-center gap-3">
{/* Decrease Bttn */}
    <button 
    onClick={()=> dispatch(countItemDecrease(allItems.id)) }
    className="
        h-8 w-8 flex items-center justify-center
        rounded-md bg-gray-700 text-white
        hover:bg-gray-600 transition
      "
    >
      −
    </button>
{/* Increase Bttn */}
    <span className="min-w-[24px] text-center text-white">
     {allItems.itemCount}
    </span>

    <button

   onClick={()=> dispatch(countItemIncrease(allItems.id))}
      className="
        h-8 w-8 flex items-center justify-center
        rounded-md bg-gray-700 text-white
        hover:bg-gray-600 transition
      "
    >
      +
    </button>

  </div>
          </div>
        
         {/* Remove Cart-Item Button */}

          <button onClick={()=>dispatch(deleteItems(allItems.cardId))} className="cursor-pointer text-sm text-red-400 hover:text-red-500">
            Remove
          </button>

          
        </div>
      </div>
    </div>
  ))}

</div>


{/* Total About of cart */}



          {/* Order Summary */}
          <div className="
           bg-[#111827] 
           p-6 rounded-lg 
           h-fit
           fixed
           top-40
          right-[calc((100%-72rem)/2)]
           w-[22rem] ">
            <h2 className="text-xl font-semibold text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subTotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>

              <hr className="border-gray-700 my-3" />

              <div className="flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* CheckOut Bttn */}
  <Link to = '/checkoutpage'>
         <button
              className="
                w-full mt-6 bg-primary py-3 rounded-md
                text-white font-medium
                hover:bg-blue-700 transition
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

export {Cart};
