import express from "express";

import userRoutes from "./user.route.js";
import todoRoutes from "./todo.route.js";
import notificationRoutes from "./notification.route.js";
import noteRoutes from "./note.route.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/todo", todoRoutes);
router.use("/notification", notificationRoutes);
router.use("/note", noteRoutes);

export default router;
