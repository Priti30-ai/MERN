import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  updateTodoStatus,
} from './services/todoApi';

const initialFormData = {
  title: '',
  description: '',
};

function TaskFlowLogo() {
  return (
    <svg className="brand-icon" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="4" y="4" width="40" height="40" rx="13" fill="currentColor" />
      <path
        d="m14 24 6.5 6.5L34 17"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M14 14h7"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function EmptyTaskIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="7" y="8" width="34" height="33" rx="8" />
      <path d="M16 18h15M16 25h9M16 32h5" />
      <path d="m29 31 3 3 6-7" />
    </svg>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchTodos = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const response = await getTodos(search, filter, signal);
      setTodos(response.data || []);
    } catch (err) {
      if (signal?.aborted) return;
      setError(err.response?.data?.message || 'Unable to load your tasks. Please try again.');
      setTodos([]);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [search, filter]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetchTodos(controller.signal);
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [fetchTodos]);

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();

    if (trimmedTitle.length < 3) {
      setError('Task title must be at least 3 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isEditing && editingId) {
        await updateTodo(editingId, {
          title: trimmedTitle,
          description: trimmedDescription,
        });
      } else {
        await createTodo({
          title: trimmedTitle,
          description: trimmedDescription,
        });
      }

      resetForm();
      await fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setFormData({
      title: todo.title,
      description: todo.description || '',
    });
    setEditingId(todo._id);
    setIsEditing(true);
    setError('');
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this task? This action cannot be undone.');
    if (!confirmed) return;

    setLoading(true);
    setError('');

    try {
      await deleteTodo(id);
      if (isEditing && editingId === id) {
        resetForm();
      }
      await fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete this task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (todo) => {
    setLoading(true);
    setError('');

    try {
      await updateTodoStatus(todo._id, !todo.completed);
      await fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update this task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href={import.meta.env.BASE_URL || '/'} aria-label="TaskFlow home">
          <TaskFlowLogo />
          <span className="brand-name">TaskFlow</span>
        </a>
        <div className="brand-copy">
          <p className="brand-tagline">Plan it. Track it. Finish it.</p>
          <p className="brand-subtitle">Your simple daily productivity space</p>
        </div>
      </header>

      <main className="todo-app">
        <section className="dashboard" aria-labelledby="dashboard-title">
          <div className="dashboard-heading">
            <div>
              <p className="section-kicker">Your workspace</p>
              <h1 id="dashboard-title">A little progress, every day.</h1>
              <p className="dashboard-description">Keep your priorities clear and your momentum going.</p>
            </div>
          </div>

          <div className="stats-grid" aria-label="Task statistics">
            <article className="stat-card">
              <span className="stat-label">Total Tasks</span>
              <strong className="stat-value">{todos.length}</strong>
              <span className="stat-note">In this view</span>
            </article>
            <article className="stat-card">
              <span className="stat-label">Active Tasks</span>
              <strong className="stat-value">{activeCount}</strong>
              <span className="stat-note">Ready for you</span>
            </article>
            <article className="stat-card">
              <span className="stat-label">Completed</span>
              <strong className="stat-value">{completedCount}</strong>
              <span className="stat-note">Nice work</span>
            </article>
          </div>
        </section>

        <div className="workspace-grid">
          <section className="panel form-panel" aria-labelledby="form-heading">
            <div className="panel-heading">
              <p className="section-kicker">{isEditing ? 'Make an update' : 'Make it happen'}</p>
              <h2 id="form-heading">{isEditing ? 'Edit task' : 'Add a task'}</h2>
              <p className="panel-description">
                {isEditing ? 'Adjust the details and save your changes.' : 'Capture what you want to get done.'}
              </p>
            </div>
            <TodoForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isEditing={isEditing}
              onCancel={resetForm}
              loading={loading}
            />
          </section>

          <section className="panel list-panel" aria-labelledby="tasks-heading">
            <div className="tasks-heading">
              <div>
                <p className="section-kicker">Your list</p>
                <h2 id="tasks-heading">Tasks</h2>
              </div>
              <span className="task-count">{todos.length} {todos.length === 1 ? 'task' : 'tasks'}</span>
            </div>

            <div className="toolbar">
              <label className="search-box">
                <span className="visually-hidden">Search tasks</span>
                <SearchIcon />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search your tasks"
                  autoComplete="off"
                />
              </label>
              <TodoFilters activeFilter={filter} onChange={setFilter} />
            </div>

            {error && (
              <div className="error-banner" role="alert">
                <span className="error-mark" aria-hidden="true">!</span>
                <span>{error}</span>
              </div>
            )}

            <TodoList
              todos={todos}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              loading={loading}
              search={search}
              filter={filter}
              emptyIcon={<EmptyTaskIcon />}
            />
          </section>
        </div>
      </main>
      <footer className="app-footer">A calmer way to get things done.</footer>
    </div>
  );
}

export default App;
