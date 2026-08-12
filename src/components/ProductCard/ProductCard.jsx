import {useDispatch, useSelector} from 'react-redux';
import { addItems } from '../../App/cart';
import { addWishList } from '../../App/wishlist';
import { Link } from 'react-router-dom';
import {addProductDetail} from "../../App/productDetail"
import { useNavigate } from "react-router-dom";



function ProductCard({ id, image, name, price, detail,size, count }) {
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
    })
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
    })
  );
};

const isInCart = cartItems.some(item => item.id === id);


  const dispatch = useDispatch()
  return (
    <div className="
      bg-white rounded-xl p-4
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-lg
      w-50
    ">

      {/* Image */}
      <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
        <Link to ='/pdp'>
        <img
          onClick={()=>{dispatch(addProductDetail({id : id , src : image, name : name , price : price , detail : detail , size : size , count : count }))}}
          src={image}
          alt={name}
          className="h-40 w-60 object-contain"
        />
        </Link>

        
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-l font-medium text-textMain ">
          {name}
        </h3>

         <p className="text-sm text-gray-400 mt-1">
          {detail}
        </p>

        <p className="mt-1 text-lg font-semibold text-textMain">
          ₹{price.toLocaleString("en-IN")}
        </p>

    {!isInCart
    ? (<button
          className="
            mt-3 w-full bg-primary text-white text-sm
            py-2 rounded-md
            transition-colors duration-200
            bg-[#1F2937]
            cursor-pointer
            hover:shadow-md
            hover:bg-[#363a3f]
          "
          onClick={()=>handleAddToCart()}
        >
          Add to Cart
        </button>)
        :(

          <Link to='/cart'>
          <button
          className="
            mt-3 w-full bg-primary text-white text-sm
            py-2 rounded-md
            transition-colors duration-200
            bg-green-800
            cursor-pointer
            hover:shadow-md
            hover:bg-green-900
          "
         
        >
          Go to Cart
        </button>
        </Link>
        )
        
    }
        

        {/* add to wishlist*/ }
          <button
          className="
            mt-3 w-full bg-primary text-white text-sm
            py-2 rounded-md
            transition-colors duration-200
            bg-[#1F2937]
            cursor-pointer
            hover:shadow-md
            hover:bg-[#363a3f]
          "
          onClick={()=>handleAddToWishList()}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

export  {ProductCard};
