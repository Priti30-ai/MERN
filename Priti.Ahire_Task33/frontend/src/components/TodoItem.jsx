const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const TodoItem = ({ todo, onEdit, onDelete, onToggleStatus, loading }) => {
  return (
    <article className={todo.completed ? 'todo-card is-completed' : 'todo-card'}>
      <div className="todo-header">
        <div>
          <h3>{todo.title}</h3>
          <span className={todo.completed ? 'status-badge completed' : 'status-badge active'}>
            <span className="status-dot" aria-hidden="true" />
            {todo.completed ? 'Completed' : 'Active'}
          </span>
        </div>

        <div className="todo-actions">
          <button
            type="button"
            className="text-action edit-btn"
            onClick={() => onEdit(todo)}
            disabled={loading}
            aria-label={`Edit task: ${todo.title}`}
          >
            Edit
          </button>
          <button
            type="button"
            className="text-action delete-btn"
            onClick={() => onDelete(todo._id)}
            disabled={loading}
            aria-label={`Delete task: ${todo.title}`}
          >
            Delete
          </button>
        </div>
      </div>

      {todo.description && <p className="todo-description">{todo.description}</p>}

      <div className="todo-meta">
        <span>Created {formatDate(todo.createdAt)}</span>
      </div>

      <div className="todo-footer">
        <button
          type="button"
          className={todo.completed ? 'toggle-btn mark-active-btn' : 'toggle-btn'}
          onClick={() => onToggleStatus(todo)}
          disabled={loading}
        >
          {todo.completed ? 'Mark Active' : 'Complete'}
        </button>
      </div>
    </article>
  );
};

export default TodoItem;
