export default function UserForm({ formData, onChange, onSubmit, loading, successMessage, errorMessage, createdUserId }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="section-header">
        <h2>Create User</h2>
      </div>

      <div className="form-group">
        <label htmlFor="user-name">Name</label>
        <input
          id="user-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter name"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="name@example.com"
          disabled={loading}
        />
      </div>

      <button type="submit" className="primary-btn" disabled={loading}>
        {loading ? 'Saving...' : 'Add User'}
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {createdUserId && (
        <div className="created-id-box">
          <strong>Created User ID:</strong>
          <span>{createdUserId}</span>
        </div>
      )}
    </form>
  );
}
