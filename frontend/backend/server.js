import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

/* 🔹 Import Routes */
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";

/* 🔹 App Configuration */
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* 🔹 Middlewares */
app.use(cors());
app.use(express.json());

/* 🔹 Serve Uploaded Files */
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* 🔹 API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

/* 🔹 Root Route */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "📚 Welcome to the Library Management System Backend 🚀",
  });
});

/* 🔹 MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });

