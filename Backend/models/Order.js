const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: Array,
    amount: Number,
    address: Object,
    paymentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);