const express = require('express');
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').get(getTodoById).put(updateTodo).delete(deleteTodo);
router.patch('/:id/status', updateTodoStatus);

module.exports = router;
