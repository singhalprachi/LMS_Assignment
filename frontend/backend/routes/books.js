import express from "express";
import Book from "../models/Book.js";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

/* 📚 Get all books in DB */
router.get("/allbooks", async (req, res) => {
  try {
    const books = await Book.find({})
      .populate("transactions")
      .sort({ _id: -1 });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books", details: err.message });
  }
});

/* 📖 Get a single book by ID */
router.get("/getbook/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("transactions");
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book", details: err.message });
  }
});

/* 🔎 Get books by category name */
router.get("/", async (req, res) => {
  const category = req.query.category;
  try {
    const bookCategory = await BookCategory.findOne({ categoryName: category }).populate("books");
    if (!bookCategory) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(bookCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category books", details: err.message });
  }
});

/* ➕ Add a new book */
router.post("/addbook", async (req, res) => {
  if (!req.body.isAdmin) {
    return res.status(403).json({ error: "You don't have permission to add a book!" });
  }

  try {
    const newBook = new Book({
      bookName: req.body.bookName,
      alternateTitle: req.body.alternateTitle,
      author: req.body.author,
      bookCountAvailable: req.body.bookCountAvailable,
      language: req.body.language,
      publisher: req.body.publisher,
      bookStatus: req.body.bookStatus,
      categories: req.body.categories,
    });

    const savedBook = await newBook.save();

    // ✅ Add book to its category
    await BookCategory.updateMany(
      { _id: { $in: savedBook.categories } },
      { $push: { books: savedBook._id } }
    );

    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: "Failed to add book", details: err.message });
  }
});

/* ✏️ Update book details */
router.put("/updatebook/:id", async (req, res) => {
  if (!req.body.isAdmin) {
    return res.status(403).json({ error: "You don't have permission to update a book!" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book details updated successfully", updatedBook });
  } catch (err) {
    res.status(500).json({ error: "Failed to update book", details: err.message });
  }
});

/* 🗑️ Delete book */
router.delete("/removebook/:id", async (req, res) => {
  if (!req.body.isAdmin) {
    return res.status(403).json({ error: "You don't have permission to delete a book!" });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await BookCategory.updateMany(
      { _id: { $in: book.categories } },
      { $pull: { books: book._id } }
    );

    await book.deleteOne();
    res.status(200).json({ message: "Book has been deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book", details: err.message });
  }
});

export default router;
