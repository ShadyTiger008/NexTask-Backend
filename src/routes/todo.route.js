// Imports
const express = require("express");
// End Imports

// Controllers
const todoController = require("../controllers/todo.controller");
// End Controllers

// Middlewares
const authMiddleware = require("../middleware/auth.middleware");
// End Middlewares

const router = express.Router();

router.get("/getAllTodos", authMiddleware.verifyJwt(), todoController.getTodos);

router.post("/create", authMiddleware.verifyJwt(), todoController.addTodo);

router.post(
  "/delete/:noteId",
  authMiddleware.verifyJwt(),
  todoController.dropTodo
);

router.post(
  "/updateTodo",
  authMiddleware.verifyJwt(),
  todoController.modifyTodo
);

module.exports = router;
