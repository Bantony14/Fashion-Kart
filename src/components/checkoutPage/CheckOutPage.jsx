import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../api/axios";

// ─── Inline Styles ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  .checkout-root {
    min-height: 100vh;
    background: #f5f6fa;
    background-image:
      radial-gradient(ellipse at 20% 10%, rgba(13,27,65,0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 90%, rgba(13,27,65,0.03) 0%, transparent 50%);
    padding: 48px 20px 80px;
    font-family: 'DM Sans', sans-serif;
    color: #1a2340;
  }

  .checkout-header {
    text-align: center;
    margin-bottom: 52px;
  }

  .checkout-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0d1b41;
    margin: 0 0 8px;
  }

  .checkout-header p {
    font-size: 0.8rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #0d1b41;
    opacity: 0.5;
  }

  .navy-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0d1b41, transparent);
    margin: 16px auto;
  }

  .checkout-grid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
  }

  @media (min-width: 1024px) {
    .checkout-grid {
      grid-template-columns: 1fr 380px;
    }
  }

  .left-col {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* ── Card ── */
  .card {
    background: #ffffff;
    border: 1px solid rgba(13,27,65,0.08);
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 2px 16px rgba(13,27,65,0.06);
    transition: box-shadow 0.3s, border-color 0.3s;
  }

  .card:hover {
    box-shadow: 0 6px 32px rgba(13,27,65,0.1);
    border-color: rgba(13,27,65,0.15);
  }

  .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #0d1b41;
    letter-spacing: 0.04em;
    margin: 0 0 4px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .card-title span.badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #0d1b41;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    color: #ffffff;
    font-weight: 600;
    flex-shrink: 0;
  }

  .card-subtitle {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8a93b0;
    margin-bottom: 28px;
  }

  /* ── Form fields ── */
  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    .field-grid { grid-template-columns: 1fr; }
  }

  .field-full { grid-column: 1 / -1; }

  .field-wrap { display: flex; flex-direction: column; gap: 4px; }

  .field-label {
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5a6380;
    margin-bottom: 2px;
    font-weight: 500;
  }

  .input {
    width: 100%;
    background: #f8f9fc;
    border: 1.5px solid #e0e4f0;
    border-radius: 10px;
    padding: 13px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: #1a2340;
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    box-sizing: border-box;
  }

  .input::placeholder { color: #b0b8cc; }

  .input:focus {
    border-color: #0d1b41;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(13,27,65,0.08);
  }

  textarea.input { resize: vertical; min-height: 90px; }

  .error-msg {
    font-size: 0.7rem;
    color: #d04040;
    letter-spacing: 0.05em;
    margin-top: 2px;
  }

  /* ── Payment radio ── */
  .payment-options {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .payment-radio {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border: 1.5px solid #e0e4f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s;
    background: #f8f9fc;
  }

  .payment-radio:hover {
    border-color: #0d1b41;
    background: #f0f2f8;
  }

  .payment-radio input[type="radio"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #c0c8e0;
    border-radius: 50%;
    transition: all 0.2s;
    flex-shrink: 0;
    cursor: pointer;
  }

  .payment-radio input[type="radio"]:checked {
    border-color: #0d1b41;
    background: #0d1b41;
    box-shadow: inset 0 0 0 4px #ffffff;
  }

  .radio-label { flex: 1; }

  .radio-title {
    font-size: 0.92rem;
    font-weight: 500;
    color: #1a2340;
  }

  .radio-sub {
    font-size: 0.72rem;
    color: #8a93b0;
    margin-top: 2px;
  }

  .radio-tag {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: rgba(13,27,65,0.07);
    color: #0d1b41;
    border: 1px solid rgba(13,27,65,0.15);
    border-radius: 4px;
    padding: 3px 8px;
    font-weight: 600;
  }

  /* ── Right column ── */
  .right-col { display: flex; flex-direction: column; gap: 20px; }

  /* Cart items */
  .cart-items-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .cart-items-list::-webkit-scrollbar { width: 4px; }
  .cart-items-list::-webkit-scrollbar-track { background: transparent; }
  .cart-items-list::-webkit-scrollbar-thumb { background: rgba(13,27,65,0.2); border-radius: 2px; }

  .cart-item {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px;
    background: #f8f9fc;
    border: 1px solid #e8ecf4;
    border-radius: 10px;
    transition: border-color 0.2s;
  }

  .cart-item:hover { border-color: rgba(13,27,65,0.2); }

  .cart-item img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e0e4f0;
    flex-shrink: 0;
  }

  .cart-item-info { flex: 1; min-width: 0; }

  .cart-item-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: #1a2340;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cart-item-qty {
    font-size: 0.7rem;
    color: #8a93b0;
    margin-top: 2px;
  }

  .cart-item-price {
    font-size: 0.9rem;
    font-weight: 700;
    color: #0d1b41;
    white-space: nowrap;
  }

  /* Summary */
  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #8a93b0;
    padding: 6px 0;
  }

  .summary-row.total {
    border-top: 1.5px solid #e0e4f0;
    margin-top: 8px;
    padding-top: 16px;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0d1b41;
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: 0.04em;
  }

  /* Submit button */
  .submit-btn {
    margin-top: 24px;
    width: 100%;
    padding: 16px;
    background: #0d1b41;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ffffff;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;
  }

  .submit-btn:hover {
    background: #1a2f66;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(13,27,65,0.25);
  }

  .submit-btn:active { transform: translateY(0); }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  .submit-btn:hover::after { transform: translateX(100%); }

  .secure-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 14px;
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #b0b8cc;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
function CheckoutPage() {
  const [formData, setFormData] = useState(null);

  const cart = useSelector((state) => state.cart.carts);
  const subTotal = cart.reduce((total, items) => {
    return total + Number(items.itemPrice) * items.itemCount;
  }, 0);
  const shipping = 50;
  const tax = Math.round((subTotal * 0.18) / 100);
  const grandTotal = subTotal + shipping + tax;

  console.log(cart);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payment: "cod",
    },
  });

  const payment = watch("payment");
  const navigate = useNavigate();

  // ⭐⭐⭐ Razorpay popup
  const handleRazorpay = async (formValues) => {
    const { data } = await API.post("/payment/create-order", {
      amount: grandTotal,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: "INR",
      name: "FashionKart",
      order_id: data.id,

      // ⭐⭐⭐ YAHI
      handler: async function (response) {
        await API.post("/orders/save", {
          items: cart.map((i) => ({
            name: i.itemName,
            price: i.itemPrice,
            image: i.src,
            qty: i.itemCount,
            size: i.itemSize,
          })),
          amount: grandTotal,
          address: formValues,
          paymentId: response.razorpay_payment_id,
        });

        navigate("/payment-success");
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const onSubmit = (data) => {
    if (data.payment === "online") {
      handleRazorpay(data);
    } else {
      API.post("/orders/save", {
        items: cart.map((i) => ({
          name: i.itemName,
          price: i.itemPrice,
          image: i.src,
          qty: i.itemCount,
          size: i.itemSize,
        })),
        amount: grandTotal,
        address: data,
        paymentId: "COD",
      });

      navigate("/payment-success");
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="checkout-root">
        {/* Header */}
        <div className="checkout-header">
          <p>FashionKart</p>
          <div className="navy-divider" />
          <h1>Checkout</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-grid">
            {/* ── LEFT ── */}
            <div className="left-col">
              {/* Address */}
              <div className="card">
                <h2 className="card-title">
                  <span className="badge">1</span>
                  Delivery Address
                </h2>
                <p className="card-subtitle">Where should we send your order?</p>

                <div className="field-grid">
                  <div className="field-wrap">
                    <label className="field-label">Full Name</label>
                    <input
                      placeholder="John Doe"
                      className="input"
                      {...register("name", { required: "Name required" })}
                    />
                    {errors.name && (
                      <p className="error-msg">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Phone Number</label>
                    <input
                      placeholder="+91 98765 43210"
                      className="input"
                      {...register("phone", {
                        required: "Phone required",
                        minLength: { value: 10, message: "Invalid phone" },
                      })}
                    />
                    {errors.phone && (
                      <p className="error-msg">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="field-wrap field-full">
                    <label className="field-label">Full Address</label>
                    <textarea
                      rows="3"
                      placeholder="House / Building, Street, Area"
                      className="input"
                      {...register("address", { required: "Address required" })}
                    />
                    {errors.address && (
                      <p className="error-msg">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">City</label>
                    <input
                      placeholder="Mumbai"
                      className="input"
                      {...register("city", { required: "City required" })}
                    />
                    {errors.city && (
                      <p className="error-msg">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Pincode</label>
                    <input
                      placeholder="400001"
                      className="input"
                      {...register("pincode", {
                        required: "Pincode required",
                        minLength: { value: 6, message: "Invalid pincode" },
                      })}
                    />
                    {errors.pincode && (
                      <p className="error-msg">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="card">
                <h2 className="card-title">
                  <span className="badge">2</span>
                  Payment Method
                </h2>
                <p className="card-subtitle">Choose how you'd like to pay</p>

                <div className="payment-options">
                  <label className="payment-radio">
                    <input type="radio" value="cod" {...register("payment")} />
                    <div className="radio-label">
                      <div className="radio-title">Cash on Delivery</div>
                      <div className="radio-sub">Pay when your order arrives</div>
                    </div>
                    <span className="radio-tag">COD</span>
                  </label>

                  <label className="payment-radio">
                    <input type="radio" value="online" {...register("payment")} />
                    <div className="radio-label">
                      <div className="radio-title">Online Payment</div>
                      <div className="radio-sub">UPI, Cards, Net Banking via Razorpay</div>
                    </div>
                    <span className="radio-tag">Secure</span>
                  </label>
                </div>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="right-col">
              {/* Cart items */}
              <div className="card">
                <h2 className="card-title">Your Items</h2>
                <p className="card-subtitle">
                  {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
                </p>

                <div className="cart-items-list">
                  {cart.map((i, idx) => (
                    <div key={idx} className="cart-item">
                      <img src={i.src} alt={i.itemName} />
                      <div className="cart-item-info">
                        <p className="cart-item-name">{i.itemName}</p>
                        <p className="cart-item-qty">Qty {i.itemCount}</p>
                      </div>
                      <span className="cart-item-price">₹{i.itemPrice}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="card">
                <h2 className="card-title">Order Summary</h2>

                <div style={{ marginTop: "16px" }}>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span>₹{shipping.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Place Order
                </button>

                <div className="secure-note">
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                    <path
                      d="M5.5 0L0.5 2.5V6C0.5 9.1 2.7 12 5.5 13C8.3 12 10.5 9.1 10.5 6V2.5L5.5 0Z"
                      fill="currentColor"
                    />
                  </svg>
                  Secured by 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export { CheckoutPage };