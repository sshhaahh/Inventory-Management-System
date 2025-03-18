const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

// ✅ Add Product (Fixed Seller Verification)
exports.addProduct = async (req, res) => {
    try {
        const { name, description, quantity, category, price, seller } = req.body;

        if (!name || !description || !quantity || !category || !price || !seller) {
            return res.status(400).json({
                success: false,
                message: "All fields are required to add a product."
            });
        }

        // 🛠 Fix: findOne instead of findById
        const existingSeller = await User.findOne({ _id: seller, role: "Seller" });
        if (!existingSeller) {
            return res.status(404).json({
                success: false,
                message: "Seller not found or not a valid seller."
            });
        }

        // Create Product
        const newProduct = await Product.create({
            name, description, quantity, category, price, seller
        });

        // Push product to seller's product list
        await User.findByIdAndUpdate(seller, {
            $push: { products: newProduct._id }
        }, { new: true });

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: newProduct
        });

    } catch (e) {
        console.error("Failed to add product:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to add product.",
            error: e.message
        });
    }
};

// ✅ Show All Products (Includes Category & Seller Info)
exports.showAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("seller", "name email role") // Populate seller info
            .populate("category", "name"); // Populate category info

        if (!products || products.length === 0) {
            return res.status(204).json({
                success: false,
                message: "No products found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "All products retrieved successfully.",
            data: products
        });

    } catch (e) {
        console.error("Error fetching products:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products.",
            error: e.message
        });
    }
};

// ✅ Update Product (Fixed Typo & Added Validation)
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, quantity, price, category, seller } = req.body;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (quantity) updateFields.quantity = quantity;
        if (price) updateFields.price = price;
        if (category) updateFields.category = category;
        if (seller) updateFields.seller = seller;

        // 🛠 Fix: Typo `lenght` → `length`
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update."
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true },{new:true});

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: updatedProduct
        });

    } catch (e) {
        console.error("Update error:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to update product.",
            error: e.message
        });
    }
};

// ✅ Delete Product (Also Removes from Seller’s Product List)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID."
            });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // 🛠 Fix: Remove product from seller's product array
        await User.findByIdAndUpdate(product.seller, {
            $pull: { products: product._id }
        });

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            data: product
        });

    } catch (e) {
        console.error("Delete error:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to delete product.",
            error: e.message
        });
    }
};
