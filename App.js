import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes";
import TaskRoutes from "./routes/TaskRoutes";
import auth from "./middleware/auth";
import connectDB from "./config/dbConfig";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/task", auth, TaskRoutes);

// health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
