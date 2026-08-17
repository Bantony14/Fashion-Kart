import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItems } from "../../App/cart";
import { addWishList } from "../../App/wishlist";
import { updateSize } from "../../App/productDetail";
import { Form, Link } from "react-router-dom";
import { YouMayLike } from "./YouMayLike";
import Input from "../Input";

function PDP() {
  const dispatch = useDispatch();
  const [checkMsg, setCheckMsg] = useState("");

  const [pincode, setPincode] = useState("");
  const productDetail = useSelector(
    (state) => state.productDetail.productDetailPage,
  );
  const [trigger, setTrigger] = useState(false);
  const cartItem = useSelector((state) => state.cart.carts);
  const isItAvl = cartItem.some(
    (item) =>
      item.id === productDetail.id && item.itemSize === productDetail.itemSize,
  );

  const product = {
    oldPrice: 1999,
    rating: 4,
    stock: true,
    specs: {
      Fabric: "100% Cotton",
      Fit: "Regular Fit",
      Sleeve: "Full Sleeve",
      Pattern: "Solid",
      WashCare: "Machine Wash",
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl p-4 sm:p-6">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white border rounded-2xl p-4 sm:p-8 flex items-center justify-center shadow-sm">
              {/* Discount */}
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-500 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                {product?.discount || "Best Deal"}
              </span>

              {/* Product Image */}
              <img
                src={productDetail.src}
                alt={productDetail.itemName}
                className="
                w-full
                h-[280px]
                sm:h-[380px]
                object-contain
                transition duration-300
                hover:scale-105
              "
              />

              {/* Wishlist */}
              <button
                className={`
                absolute top-3 right-3
                sm:top-4 sm:right-4
                ${!trigger ? "bg-white" : "bg-red-500"}
                border rounded-full
                h-9 w-9 sm:h-10 sm:w-10
                flex items-center justify-center
                shadow hover:shadow-md
                cursor-pointer
              `}
                onClick={() => {
                  dispatch(
                    addWishList({
                      id: productDetail.id,
                      src: productDetail.src,
                      name: productDetail.itemName,
                      detail: productDetail.itemDetail,
                      count: productDetail.itemCount,
                      size: productDetail.itemSize,
                      price: productDetail.itemPrice,
                    }),
                  );

                  setTrigger(!trigger);
                }}
              >
                ♡
              </button>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="w-full lg:w-1/2">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">
              {productDetail.itemName}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400 text-sm">★★★★☆</div>

              <span className="text-xs sm:text-sm text-gray-500">
                (120 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-4xl font-bold text-gray-900">
                ₹{Number(productDetail.itemPrice || 0).toLocaleString("en-IN")}
              </span>

              <span className="line-through text-gray-400 text-base sm:text-lg">
                ₹{productDetail?.itemOldPrice || 1999}
              </span>

              <span className="text-green-600 font-medium text-xs sm:text-sm">
                Best Price
              </span>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-gray-500">
              <span>100% Original</span>
              <span>Secure Payment</span>
              <span>Easy Returns</span>
            </div>

            {/* Offers */}
            <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4">
              <p className="font-medium text-green-700 text-sm">
                Available Offers
              </p>

              <ul className="list-disc ml-5 mt-2 text-xs sm:text-sm text-gray-600 space-y-1">
                <li>10% instant discount on cards</li>
                <li>No cost EMI available</li>
                <li>Extra 5% on prepaid</li>
              </ul>
            </div>

            {/* Pincode */}
            <Form>
              <div className="mt-5 sm:mt-6">
                <p className="text-sm font-medium mb-1">Check Delivery</p>

                <div className="flex gap-2 w-full">
                  <Input
                    value={pincode}
                    type="number"
                    maxLength={10}
                    className="
                    border rounded-lg
                    px-3 py-2
                    text-sm
                    w-full sm:w-44
                    focus:outline-none
                    focus:ring-2
                    focus:ring-gray-900
                  "
                    onChange={(e) => setPincode(e.target.value)}
                  />

                  <button
                    onClick={() =>
                      pincode.length === 6
                        ? setCheckMsg("Verified")
                        : setCheckMsg("Wrong Pincode")
                    }
                    className="text-sm font-medium text-blue-600 cursor-pointer shrink-0"
                  >
                    Check
                  </button>
                </div>

                <p
                  className={
                    checkMsg === "Verified"
                      ? "text-green-500 text-sm mt-1"
                      : "text-red-500 text-sm mt-1"
                  }
                >
                  {checkMsg}
                </p>
              </div>
            </Form>

            {/* Description */}
            <p className="text-gray-600 mt-5 leading-relaxed text-sm sm:text-base">
              {productDetail.itemDetail ||
                "Premium quality product with comfortable fabric and durable stitching."}
            </p>

            {/* Size */}
            <div className="mt-6">
              <p className="font-medium mb-2">Select Size</p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => dispatch(updateSize({ size }))}
                    className={`
                    px-3 sm:px-4
                    py-1.5
                    border rounded-md
                    text-sm
                    cursor-pointer
                    ${
                      productDetail.itemSize === size
                        ? "bg-blue-900 text-white"
                        : "hover:border-gray-900"
                    }
                  `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-7 sm:mt-8">
              <button
                className="
                w-full
                bg-yellow-600
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:bg-yellow-700
                cursor-pointer
              "
              >
                Buy Now
              </button>

              {!isItAvl ? (
                <button
                  onClick={() =>
                    dispatch(
                      addItems({
                        id: productDetail.id,
                        src: productDetail.src,
                        name: productDetail.itemName,
                        detail: productDetail.itemDetail,
                        count: productDetail.itemCount,
                        size: productDetail.itemSize,
                        price: productDetail.itemPrice,
                      }),
                    )
                  }
                  className="
                  w-full
                  bg-gray-800
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-gray-900
                  cursor-pointer
                "
                >
                  Add to Cart
                </button>
              ) : (
                <Link to="/cart" className="w-full">
                  <button
                    className="
                    w-full
                    bg-green-700
                    text-white
                    py-3
                    rounded-xl
                    hover:bg-green-900
                    cursor-pointer
                  "
                  >
                    Go to Cart
                  </button>
                </Link>
              )}

              <button
                onClick={() =>
                  dispatch(
                    addWishList({
                      id: productDetail.id,
                      src: productDetail.src,
                      name: productDetail.itemName,
                      detail: productDetail.itemDetail,
                      count: productDetail.itemCount,
                      size: productDetail.itemSize,
                      price: productDetail.itemPrice,
                    }),
                  )
                }
                className="
                w-full
                border
                py-3
                rounded-xl
                hover:bg-gray-50
                cursor-pointer
                sm:col-span-2
              "
              >
                Add to Wishlist
              </button>
            </div>

            {/* Delivery */}
            <div className="mt-7 sm:mt-8 border-t pt-5 sm:pt-6 space-y-2 text-sm text-gray-600">
              <p>Free Delivery by Tomorrow</p>
              <p>7 Days Easy Return</p>
              <p>1 Year Brand Warranty</p>
              <p>Cash on Delivery Available</p>
            </div>
          </div>
        </div>

        <hr className="my-8 sm:my-12" />

        {/* SPECIFICATIONS */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Product Details
        </h2>

        <div className="border rounded-lg overflow-hidden">
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              className="
              flex flex-col sm:flex-row
              sm:justify-between
              gap-1 sm:gap-4
              px-4 py-3
              border-b last:border-0
              bg-gray-50
              even:bg-white
            "
            >
              <span className="text-gray-500 text-sm">{key}</span>

              <span className="font-medium text-gray-800 text-sm break-words sm:text-right">
                {value}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-8 sm:my-12" />

        {/* DESCRIPTION */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Product Description
        </h2>

        <p className="text-gray-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          {product.detail} Designed for comfort and durability. Perfect for
          office, casual outings and daily wear with premium stitching quality.
        </p>

        <hr className="my-8 sm:my-12" />

        {/* REVIEWS */}
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          Ratings & Reviews
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* Rating breakdown */}
          <div className="w-full md:w-56 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span>{star}★</span>

                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-yellow-400 rounded w-3/4"></div>
                </div>

                <span className="text-gray-500">23</span>
              </div>
            ))}
          </div>

          {/* Review list */}
          <div className="flex-1 space-y-6">
            {[1, 2, 3].map((r) => (
              <div key={r} className="border-b pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-medium">Rahul Sharma</span>

                  <span className="text-yellow-400">★★★★☆</span>
                </div>

                <p className="text-sm text-gray-600">
                  Quality is very good. Fabric comfortable and fitting perfect.
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-8 sm:my-12" />

        {/* YOU MAY ALSO LIKE */}
        <YouMayLike />
      </div>
    </div>
  );
}

export { PDP };
