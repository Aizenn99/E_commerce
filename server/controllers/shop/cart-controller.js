const Cart = require("../../models/Cart");
const product = require("../../models/product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    console.log("Received userId:", userId); // Debugging step
    console.log("Received productId:", productId);
    console.log("Received quantity:", quantity);

    // Validate request body
    if (!userId || !productId || !Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId, productId, or quantity",
      });
    }

    // Convert userId to ObjectId if needed
    const mongoose = require("mongoose");
    const userObjectId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : null;

    if (!userObjectId) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }

    // Check if product exists
    const productExists = await product.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({ userId: userObjectId });

    if (!cart) {
      cart = new Cart({
        userId: userObjectId, // Ensure correct field name
        items: [{ productId, quantity }],
      });
    } else {
      // Check if product already exists in the cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItemIndex === -1) {
        cart.items.push({ productId, quantity });
      } else {
        cart.items[existingItemIndex].quantity += quantity;
      }
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message, // Send detailed error message
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "ky tari chukla",
    });
  }
};

const UpdateCartItemsQuantity = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging

    const { userId, productId, quantity } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing productId" });
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the index of the product in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present",
      });
    }

    // Update quantity
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    // Populate the updated cart
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Prepare response data
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product Not Found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Bad request",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Not found",
      });
    }

    // Filter out the item to be deleted
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.productId && item.productId._id.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    await cart.save();

    // Populate again to ensure data consistency
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Map populated cart items
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product Not Found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = {
  addToCart,
  UpdateCartItemsQuantity,
  deleteCartItem,
  fetchCartItems,
};
