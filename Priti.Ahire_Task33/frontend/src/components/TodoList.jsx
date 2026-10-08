import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete, onToggleStatus, loading, search, filter, emptyIcon }) => {
  if (loading) {
    return (
      <div className="state-box loading-state" role="status" aria-live="polite">
        <span className="loading-spinner" aria-hidden="true" />
        <span>Loading your tasks…</span>
      </div>
    );
  }

  if (!todos.length) {
    const hasCriteria = Boolean(search.trim()) || filter !== 'all';

    return (
      <div className="state-box empty-state">
        <div className="empty-icon">{emptyIcon}</div>
        <h3>{hasCriteria ? 'No matching tasks' : 'No tasks yet'}</h3>
        <p>
          {hasCriteria
            ? 'Try a different search or filter to find what you need.'
            : 'Add your first task and start getting things done.'}
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list" aria-live="polite">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default TodoList;
