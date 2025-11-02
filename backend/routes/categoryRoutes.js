import express from "express";
import upload from "../models/multerConfig.js";
import Category from "../models/Category.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to protect admin routes
const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ✅ CREATE - Add Category (Admin Only)
router.post("/add", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Category name and image are required" 
      });
    }

    const category = await Category.create({
      name,
      image: req.file.path, // Cloudinary URL
    });

    res.status(201).json({ 
      success: true, 
      message: "Category added successfully", 
      category 
    });
  } catch (error) {
    console.error("Add category error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// ✅ READ - Get all categories (Public)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch categories" 
    });
  }
});

// ✅ READ - Get single category by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: "Category not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      category 
    });
  } catch (err) {
    console.error("Fetch category error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch category" 
    });
  }
});

// ✅ UPDATE - Update category (Admin Only)
router.put("/:id", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: "Category not found" 
      });
    }

    // Update name if provided
    if (name) {
      category.name = name;
    }

    // Update image if new one is uploaded
    if (req.file) {
      category.image = req.file.path;
    }

    await category.save();

    res.status(200).json({ 
      success: true, 
      message: "Category updated successfully", 
      category 
    });
  } catch (error) {
    console.error("Update category error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update category" 
    });
  }
});

// ✅ DELETE - Delete category (Admin Only)
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: "Category not found" 
      });
    }

    await category.deleteOne();

    res.status(200).json({ 
      success: true, 
      message: "Category deleted successfully" 
    });
  } catch (error) {
    console.error("Delete category error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete category" 
    });
  }
});

export default router;