import express from "express";
import { login, register } from "../controllers/Auth.Controller";

const router = express.Router();

// Login
router.post("/login", login);
router.post("/register", register);

export default router;


