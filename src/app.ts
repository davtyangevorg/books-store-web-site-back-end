import express from "express";
import booksRouter from "./routes/books-router";
import usersRouter from "./routes/users-router";
import authRouter from "./routes/auth-router";
import path from "path";
import cartRouter from "./routes/cart-router";
const cors = require("cors"); // Import the CORS package
const cookieParser = require("cookie-parser");

const app = express();

// Use CORS middleware
app.use(
  cors({
    // origin: "https://gevbooks.store",
    credentials: true,
  })
);
app.use(cookieParser());

// return  html
app.get("/", (req, res) => {
  // Serve index.html from the public directory
  res.sendFile(path.join(__dirname, "index.html"));
});

// Middleware to parse JSON bodies
app.use(express.json());

// Use the books router
app.use("/books", booksRouter);
// Use the user router
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

export default app;
