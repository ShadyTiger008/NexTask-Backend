// Imports
import express from "express";
// End Imports

// Controllers
import notificationController from "../controllers/notification.controller.js";
// End Controllers

// Middlewares
import { verifyJwt } from "../middleware/auth.middleware.js";
// End Middlewares

const router = express.Router();

router.get("/getAll", verifyJwt, notificationController.getNotifications);

export default router;
