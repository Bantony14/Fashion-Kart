import { useEffect, useState } from "react";
import APIs from "../../Api/axios.js";
import { useNavigate } from "react-router-dom";

function AccountDashboard() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState({ name: "", email: "" });
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await APIs.get("/orders/my-orders");
        setOrders(res.data);
      } catch (err) {
        console.log("orders error", err);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/loginPage");

      try {
        const res = await APIs.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.log("profile error", err);
        navigate("/loginPage");
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/loginPage");
  };

  const handleUpdate = async () => {
    try {
      const res = await APIs.put("/auth/update", form);
      setUser(res.data);
      setEdit(false);
    } catch {
      alert("Update failed");
    }
  };

  const handleAvatar = async (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const res = await APIs.put("/auth/avatar", {
          avatar: reader.result,
        });
        setUser(res.data);
      } catch {
        alert("Image upload failed");
      }
    };

    reader.readAsDataURL(file);
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-20 sm:mt-24 px-3 sm:px-4 pb-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Sidebar */}
        <div
          className="
          w-full
          lg:w-64
          bg-white
          shadow
          rounded-lg
          p-4 sm:p-5
          lg:self-start
        "
        >
          <h2 className="font-semibold mb-3 sm:mb-4">My Account</h2>

          <ul
            className="
            flex
            lg:flex-col
            gap-2
            lg:gap-3
            overflow-x-auto
            pb-1
            lg:overflow-visible
            lg:pb-0
            text-sm
          "
          >
            <li
              onClick={() => setActiveTab("dashboard")}
              className={`
              shrink-0
              px-3 py-2
              lg:px-0 lg:py-0
              rounded-md lg:rounded-none
              cursor-pointer
              ${
                activeTab === "dashboard"
                  ? "text-blue-600 font-medium bg-blue-50 lg:bg-transparent"
                  : "hover:text-blue-600"
              }
            `}
            >
              Dashboard
            </li>

            <li
              onClick={() => setActiveTab("orders")}
              className={`
              shrink-0
              px-3 py-2
              lg:px-0 lg:py-0
              rounded-md lg:rounded-none
              cursor-pointer
              ${
                activeTab === "orders"
                  ? "text-blue-600 font-medium bg-blue-50 lg:bg-transparent"
                  : "hover:text-blue-600"
              }
            `}
            >
              Orders
            </li>

            <li
              onClick={() => setActiveTab("wishlist")}
              className={`
              shrink-0
              px-3 py-2
              lg:px-0 lg:py-0
              rounded-md lg:rounded-none
              cursor-pointer
              ${
                activeTab === "wishlist"
                  ? "text-blue-600 font-medium bg-blue-50 lg:bg-transparent"
                  : "hover:text-blue-600"
              }
            `}
            >
              Wishlist
            </li>

            <li
              onClick={() => setActiveTab("details")}
              className={`
              shrink-0
              px-3 py-2
              lg:px-0 lg:py-0
              rounded-md lg:rounded-none
              cursor-pointer
              ${
                activeTab === "details"
                  ? "text-blue-600 font-medium bg-blue-50 lg:bg-transparent"
                  : "hover:text-blue-600"
              }
            `}
            >
              Account Details
            </li>

            <li
              onClick={logout}
              className="
              shrink-0
              px-3 py-2
              lg:px-0 lg:py-0
              rounded-md lg:rounded-none
              cursor-pointer
              text-red-500
              hover:text-red-600
            "
            >
              Logout
            </li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <>
              {/* Profile Card */}
              <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={user.avatar || "https://i.pravatar.cc/100"}
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleAvatar(e.target.files[0])}
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 w-full text-center sm:text-left">
                    {edit ? (
                      <div className="space-y-2">
                        <input
                          className="border px-3 py-2 rounded w-full"
                          value={form.name}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              name: e.target.value,
                            })
                          }
                        />

                        <input
                          className="border px-3 py-2 rounded w-full"
                          value={form.email}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              email: e.target.value,
                            })
                          }
                        />

                        <button
                          onClick={handleUpdate}
                          className="
                          bg-black
                          text-white
                          px-4 py-2
                          rounded
                          text-sm
                          cursor-pointer
                          hover:bg-gray-800
                        "
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="font-semibold text-lg">{user.name}</h2>

                        <p className="text-sm text-gray-500 break-all">
                          {user.email}
                        </p>

                        <button
                          onClick={() => {
                            setForm({
                              name: user.name,
                              email: user.email,
                            });
                            setEdit(true);
                          }}
                          className="
                          text-blue-600
                          text-sm
                          mt-1
                          cursor-pointer
                          hover:underline
                        "
                        >
                          Edit Profile
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white shadow rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Total Orders</p>

                  <h3 className="text-xl font-semibold mt-1">
                    {orders.length}
                  </h3>
                </div>

                <div className="bg-white shadow rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Wishlist Items</p>

                  <h3 className="text-xl font-semibold mt-1">0</h3>
                </div>

                <div className="bg-white shadow rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Pending Orders</p>

                  <h3 className="text-xl font-semibold mt-1">0</h3>
                </div>
              </div>
            </>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Orders</h3>

              {orders.length === 0 ? (
                <p className="text-gray-500">No orders yet</p>
              ) : (
                orders.map((o) => (
                  <div
                    key={o._id}
                    className="
                    bg-white
                    border
                    rounded-xl
                    shadow-sm
                    hover:shadow-md
                    transition
                    mb-5
                    overflow-hidden
                  "
                  >
                    {/* Order Header */}
                    <div
                      className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:justify-between
                      sm:items-center
                      gap-1
                      bg-gray-50
                      px-3 sm:px-4
                      py-3
                      border-b
                    "
                    >
                      <p className="text-xs sm:text-sm text-gray-500">
                        Order ID:{" "}
                        <span className="font-medium text-gray-700">
                          {o._id.slice(-6)}
                        </span>
                      </p>

                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="p-3 sm:p-4">
                      {o.items.map((item, i) => (
                        <div
                          key={i}
                          className="
                          flex
                          gap-3 sm:gap-4
                          items-center
                          mb-4
                          last:mb-0
                          border-b
                          pb-3
                          last:border-none
                        "
                        >
                          {/* Image */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="
                            w-14 h-14
                            sm:w-16 sm:h-16
                            object-cover
                            rounded-lg
                            border
                            shrink-0
                          "
                          />

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 line-clamp-1 text-sm sm:text-base">
                              {item.name}
                            </p>

                            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mt-1">
                              <span>Qty: {item.qty}</span>

                              {item.size && <span>Size: {item.size}</span>}
                            </div>
                          </div>

                          {/* Price */}
                          <p className="font-bold text-gray-900 text-sm sm:text-base shrink-0">
                            ₹{item.price}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div
                      className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:justify-between
                      sm:items-center
                      gap-2
                      bg-gray-50
                      px-3 sm:px-4
                      py-3
                      border-t
                    "
                    >
                      <p className="font-semibold text-gray-800">
                        Total: ₹{o.amount}
                      </p>

                      <span className="text-green-600 text-sm font-medium">
                        ✓ Delivered
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Wishlist</h3>

              <p className="text-gray-500 text-sm">
                Wishlist items will appear here.
              </p>
            </div>
          )}

          {/* Account Details */}
          {activeTab === "details" && (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Account Details</h3>

              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <span className="font-medium">Name:</span> {user.name}
                </p>

                <p className="break-all">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { AccountDashboard };
