import express from "express";
import BookCategory from "../models/BookCategory.js"; // ✅ correct model import
import upload from "../middleware/upload.js"; // ✅ multer middleware import

const router = express.Router();

/* 🏷️ Add new category (with optional image) */
router.post("/addcategory", upload.single("image"), async (req, res) => {
  try {
    const newCategory = new BookCategory({
      categoryName: req.body.categoryName, // ✅ match model field
      image: req.file ? `uploads/${req.file.filename}` : null,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory); // ✅ use 201 Created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 📋 Get all categories */
router.get("/allcategories", async (req, res) => {
  try {
    const categories = await BookCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🗑️ Delete category by ID */
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await BookCategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
