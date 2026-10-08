const TodoForm = ({ formData, setFormData, onSubmit, isEditing, onCancel, loading }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="title">Task title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Prepare weekly priorities"
            minLength={3}
            maxLength={120}
            required
            disabled={loading}
          />
        </div>

        <div className="field-group">
          <label htmlFor="description">Description <span className="optional-label">Optional</span></label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add a few details to help you get started"
            maxLength={1000}
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="primary-btn" type="submit" disabled={loading}>
          {isEditing ? 'Save Changes' : 'Add Task'}
        </button>

        {isEditing && (
          <button type="button" className="secondary-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
