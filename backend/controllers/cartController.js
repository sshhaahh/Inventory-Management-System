const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");



// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID!" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        cart.totalPrice += product.price * quantity;

        await cart.save();

        
        return res.status(200).json({ success: true, message: "Product added to cart!", });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ success: false, message: "Failed to add to cart." });
    }
};



exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found!" });
        }

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch cart." });
    }
};




exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found!" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        return res.status(200).json({ success: true, message: "Product removed from cart!", cart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ success: false, message: "Failed to remove from cart." });
    }
};
