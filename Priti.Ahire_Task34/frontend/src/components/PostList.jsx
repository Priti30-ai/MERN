export default function PostList({ posts, loading }) {
  if (loading) {
    return <div className="card empty-state">Loading posts...</div>;
  }

  if (!posts.length) {
    return (
      <div className="card empty-state">
        <h3>No posts yet</h3>
        <p>Create a user and add the first post to see the schema reference in action.</p>
      </div>
    );
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <article key={post._id} className="card post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <div className="post-author">
            <strong>Author:</strong>
            <span>{post.user?.name || 'Unknown user'}</span>
            <span>{post.user?.email || 'No email available'}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
