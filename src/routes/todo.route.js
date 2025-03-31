const express = require('express');
const todoController = require('../controllers/todo.controller');

const router = express.Router();

router.get('/getAllTodos/:userId', todoController.getAllTodos);
router.get('/completedTodList/:userId', todoController.completedTodoList);
router.get('/inCompleteTodoList/:userId', todoController.inCompleteTodoList);
router.post('/create/:userId', todoController.addTodo);
router.post('/delete/:userId', todoController.deleteTodo);
router.post('/updateName/:userId', todoController.updateTodoName);
router.post('/updateDescription/:userId', todoController.updateTodoDescription);
router.post('/updateState/:userId', todoController.updateState);

module.exports = router;