const express = require("express");

const {
  fetchCartItems,
  addToCart,
  deleteCartItem,
  UpdateCartItemsQuantity,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", UpdateCartItemsQuantity);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
