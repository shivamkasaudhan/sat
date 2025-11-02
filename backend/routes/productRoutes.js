// routes/productRoutes.js - COMPLETE WITH UPDATE & DELETE
import express from "express";
import upload from "../models/multerConfig.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to protect admin routes
const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Admin access only" });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Add Product — Admin Only
router.post("/add", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, price, pricePerUnit, description, category, unitType, inStock } = req.body;

    if (!name || !description || !category || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields including image are required" });
    }

    // Check if category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Use pricePerUnit if provided, otherwise fall back to price
    const finalPrice = pricePerUnit || price;

    const product = await Product.create({
      name,
      price: finalPrice,
      pricePerUnit: finalPrice,
      description,
      image: req.file.path,
      category,
      unitType: unitType || 'piece',
      inStock: inStock !== undefined ? inStock : true,
    });

    res
      .status(201)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Product Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Update Product — Admin Only
router.put("/:id", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, price, pricePerUnit, description, category, unitType, inStock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if category exists
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (unitType) product.unitType = unitType;
    if (inStock !== undefined) product.inStock = inStock;

    // Handle price
    const finalPrice = pricePerUnit || price;
    if (finalPrice) {
      product.price = finalPrice;
      product.pricePerUnit = finalPrice;
    }

    // Update image if new one provided
    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();

    res.json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update product error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Delete Product — Admin Only
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all Products — Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// ✅ Get single Product — Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name image");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

export default router;