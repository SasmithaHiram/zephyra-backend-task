import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from './src/routes/authRoutes.js'

const app = express();
dotenv.config();
const port = process.env.PORT;
const mongoURL = process.env.MONGOURL;
app.use(express.json());

app.use('/api/auth', authRoutes);

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
