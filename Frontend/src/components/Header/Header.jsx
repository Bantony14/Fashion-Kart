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
      <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-5 text-sm font-medium">
          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link to="profilePage">
                  <img
                    src={user.avatar || "https://i.pravatar.cc/100"}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>

                <p className="font-medium">Hi, {user.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <NavLink to="/loginPage">
                {" "}
                <button
                  className="
              bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer
              hover:bg-blue-700 transition
            "
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/signuppage">
                {" "}
                <button
                  className="
              bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer
              hover:bg-blue-700 transition
            "
                >
                  Signup
                </button>
              </NavLink>
            </div>
          )}

          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 
                                     ${isActive ? "text-orange-700" : "text-gray-700"}
                                    lg:p-0`
            }
          >
            <button className="relative hover:text-primary cursor-pointer">
              <Heart size={22} />
              <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1">
                {wishLength}
              </span>
            </button>
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 
                                     ${isActive ? "text-orange-700" : "text-gray-700"}
                                    lg:p-0`
            }
          >
            <button className="relative hover:text-primary cursor-pointer">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1">
                {cartLength}
              </span>
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
