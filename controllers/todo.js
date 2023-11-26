const User = require('../models/user');
const { ObjectId } = require('mongoose').Types;

const addTodo = async (req, res) => {
    try {
        const { userId } = req.params;
        const { todoName, todoDescription, createdAt, isCompleted } = req.body;
        const user = await User.findById(userId);
        if (user) {
            const updatedTodo = await user.todos.create({
                todoName: todoName,
                todoDescription: todoDescription,
                createdAt: createdAt,
                isCompleted: isCompleted
            });

            user.todos.push(updatedTodo);
            await user.save();

            res.status(201).json({
                message: "Todo created successfully!",
                todo: updatedTodo
            });
        } else {
            res.status(404).json({
                message: "User doesn't exist!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllTodos = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        
        if (user) {
            const todoList = await user.todos.map((todo) => todo);
            res.status(200).json({
                message: "Successfully retrieved all todo lists!",
                todoList: todoList
            });
        } else {
            res.status(404).json({
                message: "User doesn't exist!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteTodo = async (req, res) => {
   try {
    const { userId } = req.params;
    const { todoId } = req.body;
    const user = await User.findById(userId);
    
    if (user) {
        const objectIdTodoId = new ObjectId(todoId);

        user.todos = user.todos.filter((todo) => !todo._id.equals(objectIdTodoId));
        await user.save();

        res.status(200).json({
            message: "Successfully deleted!",
            TodoList: user.todos
        });
    } else {
        res.status(404).json({
            message: "User does not exist!"
        });
    }
   } catch (error) {
       res.status(500).json({
           message: error.message
       });
   } 
}

const updateTodoName = async (req, res) => {
    try {
        const { userId } = req.params;
        const { todoId, todoName } = req.body;
        const user = await User.findById(userId);

        if (user) {
            const todoToUpdate = user.todos.find(todo => todo._id.toString() === todoId);
            if (todoToUpdate) {
                todoToUpdate.todoName = todoName;
                await user.save();
                res.status(200).json({
                    message: 'Successfully updated todo name',
                    todo: todoToUpdate
                });
            } else {
                res.status(404).json({
                    message: 'Todo not found'
                });
            }
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateTodoDescription = async (req, res) => {
    try {
        const { userId } = req.params;
        const { todoId, todoDescription } = req.body;
        const user = await User.findById(userId);

        if (user) {
            const todoToUpdate = user.todos.find(todo => todo._id.toString() === todoId);
            if (todoToUpdate) {
                todoToUpdate.todoDescription = todoDescription;
                await user.save();
                res.status(200).json({
                    message: 'Successfully updated todo name',
                    todo: todoToUpdate
                });
            } else {
                res.status(404).json({
                    message: 'Todo not found'
                });
            }
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateState = async (req, res) => {
    try {
        const { userId } = req.params;
        const { todoId } = req.body;
        const user = await User.findById(userId);

        if (user) {
            const todoToUpdate = user.todos.find(todo => todo._id.toString() === todoId);
            if (todoToUpdate) {
                todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
                await user.save();
                res.status(200).json({
                    message: 'Successfully updated todo state',
                    todo: todoToUpdate
                });
            } else {
                res.status(404).json({
                    message: 'Todo not found'
                });
            }
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const completedTodoList = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (user) {
            const completedTodos = user.todos.filter(todo => todo.isCompleted === true);

            res.status(200).json({
                message: "Successfully retrieved completed todos!",
                todoList: completedTodos
            });
        } else {
            res.status(404).json({
                message: "User doesn't exist!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const inCompleteTodoList = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (user) {
            const completedTodos = user.todos.filter(todo => todo.isCompleted === false);

            res.status(200).json({
                message: "Successfully retrieved completed todos!",
                todoList: completedTodos
            });
        } else {
            res.status(404).json({
                message: "User doesn't exist!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getAllTodos, addTodo, updateTodoName, updateTodoDescription, updateState, deleteTodo, completedTodoList, inCompleteTodoList };