import express from "express";

import userRoutes from "./user.route.js";
import todoRoutes from "./todo.route.js";
import notificationRoutes from "./notification.route.js";

const router = express.Router();

router.post("/user", userRoutes);
router.post("/todo", todoRoutes);
router.post("/notification", notificationRoutes);

export default router;
