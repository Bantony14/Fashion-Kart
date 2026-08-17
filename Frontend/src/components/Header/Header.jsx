import { Heart, ShoppingCart, Search } from "lucide-react";
import Input from "../Input";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../logo/Logo";
import { useEffect, useState } from "react";
import API from "../../Api/axios";

function Header() {
  const cart = useSelector((state) => state.cart.carts);
  const cartLength = cart.length;

  const wish = useSelector((state) => state.wishList.wishListCart);
  const wishLength = wish.length;

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (error) {
        console.log("User fetch failed");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/loginPage");
    window.location.reload();
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-[64px] sm:h-[72px] flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-5 text-sm font-medium">
          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Profile */}
              <Link to="/profilePage" className="flex items-center gap-2">
                <img
                  src={user.avatar || "https://i.pravatar.cc/100"}
                  alt="profile"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                />

                {/* Hide name on mobile */}
                <p className="hidden sm:block font-medium">Hi, {user.name}</p>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-black text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <NavLink to="/loginPage">
                <button
                  className="
                  bg-blue-600 text-white
                  px-2.5 py-1.5
                  sm:px-4 sm:py-2
                  rounded-md
                  text-xs sm:text-sm
                  cursor-pointer
                  hover:bg-blue-700
                  transition
                "
                >
                  Login
                </button>
              </NavLink>

              <NavLink to="/signuppage">
                <button
                  className="
                  bg-blue-600 text-white
                  px-2.5 py-1.5
                  sm:px-4 sm:py-2
                  rounded-md
                  text-xs sm:text-sm
                  cursor-pointer
                  hover:bg-blue-700
                  transition
                "
                >
                  Signup
                </button>
              </NavLink>
            </div>
          )}

          {/* Wishlist */}
          <NavLink to="/wishlist">
            <div className="relative text-gray-700 hover:text-orange-700 cursor-pointer">
              <Heart size={20} className="sm:w-[22px] sm:h-[22px]" />

              <span className="absolute -top-2 -right-2 text-[9px] sm:text-[10px] bg-red-500 text-white rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-1">
                {wishLength}
              </span>
            </div>
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart">
            <div className="relative text-gray-700 hover:text-orange-700 cursor-pointer">
              <ShoppingCart size={20} className="sm:w-[22px] sm:h-[22px]" />

              <span className="absolute -top-2 -right-2 text-[9px] sm:text-[10px] bg-red-500 text-white rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-1">
                {cartLength}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
