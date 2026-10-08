const Todo = require('../models/Todo');

const buildFilters = ({ search = '', status = 'all' } = {}) => {
  const filters = {};

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (status === 'completed') {
    filters.completed = true;
  }

  if (status === 'pending') {
    filters.completed = false;
  }

  return filters;
};

const getTodos = async (filters = {}) => {
  const query = buildFilters(filters);
  return Todo.find(query).sort({ createdAt: -1 });
};

const getTodoById = async (id) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }

  return todo;
};

const createTodo = async (todoData) => {
  return Todo.create(todoData);
};

const updateTodo = async (id, todoData) => {
  const todo = await Todo.findByIdAndUpdate(id, todoData, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }

  return todo;
};

const updateTodoStatus = async (id, completed) => {
  const todo = await Todo.findByIdAndUpdate(
    id,
    { completed },
    { new: true, runValidators: true }
  );

  if (!todo) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }

  return todo;
};

const deleteTodo = async (id) => {
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }

  return todo;
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
};
