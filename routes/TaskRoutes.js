import { createTask, getTask, getTasks, updateTask, deleteTask } from "../controllers/Task.Controller";
import express from "express";

const router = express.Router();

// Create Task
router.post("/create-task", createTask);

// Get Task
router.get("/get-task/:id", getTask);

// Get Tasks with Filters
router.get("/tasks", getTasks);

// Update Task
router.put("/update-task/:id", updateTask);

// Delete Task
router.delete("/delete-task/:id", deleteTask);

export default router;
