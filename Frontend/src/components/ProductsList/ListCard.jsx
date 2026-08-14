import { useDispatch, useSelector } from "react-redux";
import { addProductDetail } from "../../App/productDetail";
import {Link} from 'react-router-dom'
import { addItems } from "../../App/cart";
import { useNavigate } from "react-router-dom";


function ListCard({ image, name, price, detail,count,id,size }) {
const dispatch = useDispatch()
const cartItems = useSelector(state=>state.cart.carts)
const isItInCart = cartItems.some(item=>item.id===id)
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


  return (
    
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 w-[230px] overflow-hidden">
      
      {/* Image Section */}
      <div className="bg-gray-100 flex items-center justify-center h-40">
        <Link to='pdp'>
        <img 
        onClick={()=>{dispatch(addProductDetail({id : id , src : image, name : name , price : price , detail : detail , size : size , count : count }))}}
        src={image} alt={name} className="h-28 object-contain" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2">
          {name}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          {detail}
        </p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-base">
            ₹{price.toLocaleString("en-IN")}
          </span>

        {!isItInCart?( <button
           onClick={()=>handleAddToCart()}
          className="bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs">
            Add to Cart
          </button>)
        :(
          <Link to='/cart'>
           <button
          className="bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs">
            Go to Cart
          </button>
          </Link>
        )  
        }
         
        </div>
      </div>
    </div>
  );
}

export { ListCard };
