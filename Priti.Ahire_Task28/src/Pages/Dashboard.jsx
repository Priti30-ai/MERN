function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <p>Welcome to your dashboard.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Profile</h3>
          <p>Manage your profile information.</p>
        </div>

        <div className="dashboard-card">
          <h3>Posts</h3>
          <p>View and manage your posts.</p>
        </div>

        <div className="dashboard-card">
          <h3>Settings</h3>
          <p>Manage your account settings.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard