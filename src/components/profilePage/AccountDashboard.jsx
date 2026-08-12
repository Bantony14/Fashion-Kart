import { useEffect, useState } from "react";
import API from "../../Api/axios.js";
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
        const res = await API.get("/orders/my-orders");
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
        const res = await API.get("/auth/profile");
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
      const res = await API.put("/auth/update", form);
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
        const res = await API.put("/auth/avatar", {
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
    <div className="max-w-6xl mx-auto mt-24 flex gap-6 px-4">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow rounded-lg p-5">
        <h2 className="font-semibold mb-4">My Account</h2>

        <ul className="space-y-3 text-sm">
          <li
            onClick={() => setActiveTab("dashboard")}
            className={
              activeTab === "dashboard"
                ? "text-blue-600 font-medium cursor-pointer"
                : "cursor-pointer hover:text-blue-600"
            }
          >
            Dashboard
          </li>

          <li
            onClick={() => setActiveTab("orders")}
            className={
              activeTab === "orders"
                ? "text-blue-600 font-medium cursor-pointer"
                : "cursor-pointer hover:text-blue-600"
            }
          >
            Orders
          </li>

          <li
            onClick={() => setActiveTab("wishlist")}
            className={
              activeTab === "wishlist"
                ? "text-blue-600 font-medium cursor-pointer"
                : "cursor-pointer hover:text-blue-600"
            }
          >
            Wishlist
          </li>

          <li
            onClick={() => setActiveTab("details")}
            className={
              activeTab === "details"
                ? "text-blue-600 font-medium cursor-pointer"
                : "cursor-pointer hover:text-blue-600"
            }
          >
            Account Details
          </li>

          <li onClick={logout} className="cursor-pointer text-red-500">
            Logout
          </li>
        </ul>
      </div>

      {/* Right Panel */}
      <div className="flex-1 space-y-6">
        {activeTab === "dashboard" && (
          <>
            {/* Profile Card */}
            <div className="bg-white shadow rounded-lg p-6 flex items-center gap-5">
              <div className="relative">
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

              <div className="flex-1">
                {edit ? (
                  <div className="space-y-2">
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />

                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />

                    <button
                      onClick={handleUpdate}
                      className="bg-black text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-semibold text-lg">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>

                    <button
                      onClick={() => {
                        setForm({ name: user.name, email: user.email });
                        setEdit(true);
                      }}
                      className="text-blue-600 text-sm mt-1"
                    >
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-gray-500 text-sm">Total Orders</p>
                <h3 className="text-xl font-semibold">{orders.length}</h3>
              </div>

              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-gray-500 text-sm">Wishlist Items</p>
                <h3 className="text-xl font-semibold">0</h3>
              </div>

              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-gray-500 text-sm">Pending Orders</p>
                <h3 className="text-xl font-semibold">0</h3>
              </div>
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-semibold mb-4">Orders</h3>

            {orders.length === 0 ? (
              <p className="text-gray-500">No orders yet</p>
            ) : (
              orders.map((o) => (
                <div
                  key={o._id}
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md transition mb-5 overflow-hidden"
                >
                  {/* 🔹 Order Header */}
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b">
                    <p className="text-sm text-gray-500">
                      Order ID:{" "}
                      <span className="font-medium text-gray-700">
                        {o._id.slice(-6)}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* 🔹 Items */}
                  <div className="p-4">
                    {o.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-4 items-center mb-4 last:mb-0 border-b pb-3 last:border-none"
                      >
                        {/* Image */}
                        <img
                          src={item.image}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />

                        {/* Info */}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 line-clamp-1">
                            {item.name}
                          </p>

                          <div className="flex gap-3 text-sm text-gray-500 mt-1">
                            <span>Qty: {item.qty}</span>
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                        </div>

                        {/* Price */}
                        <p className="font-bold text-gray-900">₹{item.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* 🔹 Footer */}
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-t">
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

        {activeTab === "wishlist" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-semibold mb-4">Wishlist</h3>
            <p className="text-gray-500">Wishlist items will appear here.</p>
          </div>
        )}

        {activeTab === "details" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-semibold mb-4">Account Details</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { AccountDashboard };
