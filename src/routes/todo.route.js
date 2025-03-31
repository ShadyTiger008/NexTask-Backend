// Imports
import express from "express";
// End Imports

// Controllers
import todoController from "../controllers/todo.controller.js";
// End Controllers

// Middlewares
import { verifyJwt } from "../middleware/auth.middleware.js";
// End Middlewares

const router = express.Router();

router.get("/getAll", verifyJwt, todoController.getTodos);

router.post("/create", verifyJwt, todoController.addTodo);

router.delete("/delete/:id", verifyJwt, todoController.dropTodo);

router.put("/update", verifyJwt, todoController.modifyTodo);

export default router;
