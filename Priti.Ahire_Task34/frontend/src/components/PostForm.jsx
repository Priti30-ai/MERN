export default function PostForm({ formData, users, onChange, onSubmit, loading, successMessage, errorMessage }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="section-header">
        <h2>Create Post</h2>
      </div>

      <div className="form-group">
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter post title"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="post-content">Content</label>
        <textarea
          id="post-content"
          name="content"
          rows="4"
          value={formData.content}
          onChange={onChange}
          placeholder="Write your post"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="post-user">Select User</label>
        <select id="post-user" name="user" value={formData.user} onChange={onChange} disabled={loading || users.length === 0}>
          <option value="">{users.length === 0 ? 'No user available' : 'Choose a user'}</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} — {user.email}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="primary-btn" disabled={loading || users.length === 0}>
        {loading ? 'Posting...' : 'Add Post'}
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}
