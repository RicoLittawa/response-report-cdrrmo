import express from "express";
import mongoose from "mongoose";
const app = express();

mongoose.connect("mongodb://localhost:27017/reports", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to database");
});


app.get("/", (req, res) => {
  res.send("Hello, World!"); // Replace with your desired response
});

app.listen(3000, () => {
  console.log("Server Started");
});
