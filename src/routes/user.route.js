// Imports
import express from "express";
// End Imports

// Controllers
import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";
// End Controllers

// Middlewares
import { verifyJwt } from "../middleware/auth.middleware.js";
// End Middlewares

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/getUser", verifyJwt, userController.getUser);

export default router;
