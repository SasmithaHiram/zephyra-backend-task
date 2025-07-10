import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
const port = process.env.PORT;
const mongoURL = process.env.MONGOURL;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
