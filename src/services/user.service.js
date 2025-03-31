const Todo = require("../../models/todo.model");

const createTodo = async (data) => {
  const { userId, todoName, todoDescription, reminderAt } = data;

  const newTodo = await Todo.create({
    userId,
    todoName,
    todoDescription,
    reminderAt,
  });

  return newTodo;
};

const deleteTodo = async (id) => {
  return await Todo.deleteOne({ _id: id });
};

const updateTodo = async (data) => {
  let query = {};

  if (data.todoName) query.todoName = data.todoName;
  if (data.todoDescription) query.todoDescription = data.todoDescription;
  if (data.reminderAt) query.reminderAt = data.reminderAt;
  if (data.status) query.status = data.status;
  if (data.isDeleted !== undefined) query.isDeleted = data.isDeleted;
  if (data.isCompleted !== undefined) query.isCompleted = data.isCompleted;

  return await Todo.updateOne({ _id: data.id }, { $set: query });
};

const getAllTodo = async (filters) => {
  let query = {
    userId: filters.userId,
    isDeleted: false,
  };

  // Apply filters dynamically
  if (filters.isCompleted !== undefined)
    query.isCompleted = filters.isCompleted;
  if (filters.isDeleted !== undefined) query.isDeleted = filters.isDeleted;
  if (filters.status) query.status = filters.status;
  if (filters.reminderAt)
    query.reminderAt = { $gte: new Date(filters.reminderAt) };

  // Text Search (if search term is provided)
  let todos;
  if (filters.search) {
    todos = await Todo.aggregate([
      {
        $search: {
          index: "todo_search",
          text: {
            query: filters.search,
            path: ["todoName", "todoDescription"],
          },
        },
      },
      { $match: query },
    ]);
  } else {
    todos = await Todo.find(query);
  }

  return todos;
};

module.exports = { createTodo, deleteTodo, updateTodo, getAllTodo };
