const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

// SAVE ORDER
router.post("/save", auth, async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    items: req.body.items,
    amount: req.body.amount,
    address: req.body.address,
    paymentId: req.body.paymentId,
  });

  res.json(order);
});

// GET MY ORDERS
router.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

module.exports = router;