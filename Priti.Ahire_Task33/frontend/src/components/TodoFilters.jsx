const TodoFilters = ({ activeFilter, onChange }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks by status">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={activeFilter === value ? 'filter-btn active' : 'filter-btn'}
          aria-pressed={activeFilter === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
