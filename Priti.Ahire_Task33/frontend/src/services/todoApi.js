import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const apiClient = axios.create({
  baseURL: API_URL,
});

export const getTodos = async (search = '', status = 'all', signal) => {
  const params = {};

  if (search) params.search = search;
  if (status && status !== 'all') params.status = status;

  const response = await apiClient.get('/todos', { params, signal });
  return response.data;
};

export const getTodo = async (id) => {
  const response = await apiClient.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await apiClient.post('/todos', todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await apiClient.put(`/todos/${id}`, todo);
  return response.data;
};

export const updateTodoStatus = async (id, completed) => {
  const response = await apiClient.patch(`/todos/${id}/status`, { completed });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await apiClient.delete(`/todos/${id}`);
  return response.data;
};
