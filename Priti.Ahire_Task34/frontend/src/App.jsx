import { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const initialUserForm = { name: '', email: '' };
const initialPostForm = { title: '', content: '', user: '' };

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userForm, setUserForm] = useState(initialUserForm);
  const [postForm, setPostForm] = useState(initialPostForm);
  const [userLoading, setUserLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(true);
  const [userSuccess, setUserSuccess] = useState('');
  const [userError, setUserError] = useState('');
  const [postSuccess, setPostSuccess] = useState('');
  const [postError, setPostError] = useState('');
  const [createdUserId, setCreatedUserId] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users`);
      setUsers(response.data.data || []);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to load users right now.';
      setUserError(message);
    }
  };

  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      const response = await axios.get(`${API_BASE}/posts`);
      setPosts(response.data.data || []);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to load posts right now.';
      setPostError(message);
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
    setUserSuccess('');
    setUserError('');
  };

  const handlePostChange = (event) => {
    const { name, value } = event.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
    setPostSuccess('');
    setPostError('');
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();

    const name = userForm.name.trim();
    const email = userForm.email.trim();

    if (!name) {
      setUserError('User name is required.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setUserError('Please enter a valid email address.');
      return;
    }

    setUserLoading(true);
    setUserError('');

    try {
      const response = await axios.post(`${API_BASE}/users`, { name, email });
      const createdUser = response.data.data;
      setUserSuccess('User created successfully.');
      setCreatedUserId(createdUser._id);
      setUserForm(initialUserForm);
      await fetchUsers();
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to create user.';
      setUserError(message);
    } finally {
      setUserLoading(false);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const title = postForm.title.trim();
    const content = postForm.content.trim();
    const user = postForm.user;

    if (!title) {
      setPostError('Post title is required.');
      return;
    }

    if (!content) {
      setPostError('Post content is required.');
      return;
    }

    if (!user) {
      setPostError('Please select a user before creating a post.');
      return;
    }

    setPostLoading(true);
    setPostError('');

    try {
      await axios.post(`${API_BASE}/posts`, { title, content, user });
      setPostSuccess('Post created successfully.');
      setPostForm(initialPostForm);
      await fetchPosts();
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to create post.';
      setPostError(message);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">MERN + MongoDB Relationship Demo</p>
          <h1>Schema Reference</h1>
        </div>
      </header>

      <main className="layout">
        <section className="forms-grid">
          <UserForm
            formData={userForm}
            onChange={handleUserChange}
            onSubmit={handleUserSubmit}
            loading={userLoading}
            successMessage={userSuccess}
            errorMessage={userError}
            createdUserId={createdUserId}
          />

          <PostForm
            formData={postForm}
            users={users}
            onChange={handlePostChange}
            onSubmit={handlePostSubmit}
            loading={postLoading}
            successMessage={postSuccess}
            errorMessage={postError}
          />
        </section>

        <section className="posts-section card">
          <div className="section-header">
            <h2>Posts</h2>
          </div>
          <PostList posts={posts} loading={postsLoading} />
        </section>
      </main>
    </div>
  );
}

export default App;
