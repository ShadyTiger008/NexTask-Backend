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

router.get("/getAllTodos", verifyJwt, todoController.getTodos);

router.post("/create", verifyJwt, todoController.addTodo);

router.post("/delete/:noteId", verifyJwt, todoController.dropTodo);

router.post("/updateTodo", verifyJwt, todoController.modifyTodo);

export default router;
