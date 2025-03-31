const { ObjectId } = require("mongoose").Types;
const todoService = require("../services/todo.service");

const addTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Todo created successfully!",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodo(req.query);

    res.status(200).json({
      message: "Successfully retrieved all todo lists!",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const dropTodo = async (req, res) => {
  try {
    const deleted = await todoService.deleteTodo(req.params.id);

    res.status(200).json({
      message: "Todo deleted successfully!",
      deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const modifyTodo = async (req, res) => {
  try {
    const updatedTodo = await todoService.updateTodo(req.body);

    res.status(200).json({
      message: "Todo updated successfully!",
      updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTodo,
  getTodos,
  dropTodo,
  modifyTodo,
};
