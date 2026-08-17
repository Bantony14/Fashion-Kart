import { useDispatch } from "react-redux";
import { addProductDetail } from "../../App/productDetail";
import { Link } from "react-router-dom";

export function YouMayLike() {
  const dispatch = useDispatch();

  const product = [
    {
      id: 101,
      title: "Men Oversized Graphic T-Shirt",
      price: 1199,
      originalPrice: 1999,
      category: "tshirt",
      gender: "men",
      brand: "Urban Threads",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.4,
      reviews: 132,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
      isTrending: true,
      isNew: false,
      description:
        "Premium oversized cotton t-shirt with bold front graphic print.",
      fabric: "100% Cotton",
      fit: "Oversized Fit",
      deliveryInfo: "Free delivery within 3-5 working days.",
      returnPolicy: "7 days easy return & exchange.",
      care: "Machine wash cold. Do not bleach.",
    },
    {
      id: 102,
      title: "Women High Waist Straight Jeans",
      price: 1799,
      originalPrice: 2499,
      category: "jeans",
      gender: "women",
      brand: "DenimCo",
      sizes: ["26", "28", "30", "32"],
      rating: 4.6,
      reviews: 210,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80",
      isTrending: true,
      isNew: true,
      description: "Stylish high waist straight fit jeans for everyday wear.",
      fabric: "Stretch Denim",
      fit: "Straight Fit",
      deliveryInfo: "Free delivery in 4-6 days.",
      returnPolicy: "10 days easy return.",
      care: "Wash inside out. Do not tumble dry.",
    },
    {
      id: 103,
      title: "Men Slim Fit Formal Shirt",
      price: 1499,
      originalPrice: 1999,
      category: "shirt",
      gender: "men",
      brand: "Formals Hub",
      sizes: ["M", "L", "XL"],
      rating: 4.2,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=500&q=80",
      isTrending: false,
      isNew: true,
      description: "Classic slim fit formal shirt perfect for office wear.",
      fabric: "Cotton Blend",
      fit: "Slim Fit",
      deliveryInfo: "Delivered within 3-5 days.",
      returnPolicy: "7 days return available.",
      care: "Gentle machine wash.",
    },
    {
      id: 104,
      title: "Women Floral Summer Dress",
      price: 2199,
      originalPrice: 2999,
      category: "dress",
      gender: "women",
      brand: "StyleNest",
      sizes: ["S", "M", "L"],
      rating: 4.7,
      reviews: 320,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80",
      isTrending: true,
      isNew: false,
      description: "Lightweight floral summer dress with elegant design.",
      fabric: "Polyester Blend",
      fit: "Regular Fit",
      deliveryInfo: "Free delivery within 4 days.",
      returnPolicy: "10 days easy exchange.",
      care: "Hand wash recommended.",
    },
    {
      id: 105,
      title: "Unisex Streetwear Hoodie",
      price: 2499,
      originalPrice: 3499,
      category: "hoodie",
      gender: "unisex",
      brand: "StreetMode",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.8,
      reviews: 410,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80",
      isTrending: true,
      isNew: true,
      description: "Premium streetwear hoodie with soft fleece lining.",
      fabric: "Cotton Fleece",
      fit: "Regular Fit",
      deliveryInfo: "Delivery in 3-5 working days.",
      returnPolicy: "7 days hassle-free return.",
      care: "Machine wash cold. Do not iron on print.",
    },
  ];

  return (
    <>
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        You May Also Like
      </h2>

      <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-3 scrollbar-hide">
        {product.map((item) => (
          <div
            key={item.id}
            className="
            min-w-[165px]
            sm:min-w-[190px]
            md:min-w-[210px]
            bg-white
            rounded-lg
            border
            p-2.5 sm:p-3
            hover:shadow-md
            transition-shadow
            shrink-0
          "
          >
            {/* Image */}
            <div className="bg-gray-100 p-3 sm:p-4 rounded">
              <img
                src={item.image}
                alt={item.title}
                className="
                h-28
                sm:h-36
                w-full
                object-contain
                mx-auto
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-105
              "
                onClick={() =>
                  dispatch(
                    addProductDetail({
                      id: item.id,
                      src: item.image,
                      name: item.title,
                      price: item.price,
                      detail: item.description,
                      oldPrice: item.originalPrice,
                    }),
                  )
                }
              />
            </div>

            {/* Product Name */}
            <p className="text-xs sm:text-sm mt-2 font-medium line-clamp-2">
              {item.title}
            </p>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className="font-semibold text-sm sm:text-base">
                ₹{item.price}
              </span>

              <span className="text-[10px] sm:text-xs line-through text-gray-400">
                ₹{item.originalPrice}
              </span>
            </div>

            {/* Delivery */}
            <p className="text-[10px] sm:text-xs text-green-600 mt-1">
              Free Delivery
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
