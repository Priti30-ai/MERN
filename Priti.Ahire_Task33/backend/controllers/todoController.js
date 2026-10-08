const mongoose = require('mongoose');
const todoService = require('../services/todoService');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const createTodo = asyncHandler(async (req, res) => {
  const todo = await todoService.createTodo(req.body);
  res.status(201).json({
    success: true,
    data: todo,
  });
});

const getTodos = asyncHandler(async (req, res) => {
  const { search = '', status = 'all' } = req.query;
  const todos = await todoService.getTodos({ search, status });

  res.json({
    success: true,
    count: todos.length,
    data: todos,
  });
});

const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid Todo ID');
    error.statusCode = 400;
    throw error;
  }

  const todo = await todoService.getTodoById(id);
  res.json({
    success: true,
    data: todo,
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid Todo ID');
    error.statusCode = 400;
    throw error;
  }

  const { title, description, completed } = req.body;
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (completed !== undefined) updateData.completed = completed;

  const todo = await todoService.updateTodo(id, updateData);
  res.json({
    success: true,
    data: todo,
  });
});

const updateTodoStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid Todo ID');
    error.statusCode = 400;
    throw error;
  }

  const { completed } = req.body;

  if (completed === undefined || typeof completed !== 'boolean') {
    const error = new Error('Completed status is required and must be a boolean');
    error.statusCode = 400;
    throw error;
  }

  const todo = await todoService.updateTodoStatus(id, completed);
  res.json({
    success: true,
    data: todo,
  });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid Todo ID');
    error.statusCode = 400;
    throw error;
  }

  const deletedTodo = await todoService.deleteTodo(id);

  res.json({
    success: true,
    message: 'Todo deleted successfully',
    data: deletedTodo,
  });
});

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
};
