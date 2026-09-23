import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="home">
            <aside className="sidebar">
                <img
                    src="https://picsum.photos/seed/profile/400/250"
                    alt="Profile"
                    className="profile-image"
                />

                <h3>My Name</h3>

                <p>
                    Just me, myself and I. Exploring the universe of
                    knowledge and sharing interesting ideas.
                </p>

                <h3>Popular Posts</h3>

                <div className="post">
                    <img
                        src="https://picsum.photos/seed/post1/100/70"
                        alt="Post 1"
                    />
                    <div>
                        <b>Lorem</b>
                        <p>Interesting thoughts</p>
                    </div>
                </div>

                <div className="post">
                    <img
                        src="https://picsum.photos/seed/post2/100/70"
                        alt="Post 2"
                    />
                    <div>
                        <b>Ipsum</b>
                        <p>Useful information</p>
                    </div>
                </div>

                <div className="post">
                    <img
                        src="https://picsum.photos/seed/post3/100/70"
                        alt="Post 3"
                    />
                    <div>
                        <b>Dolorum</b>
                        <p>Creative ideas</p>
                    </div>
                </div>
            </aside>

            <main className="content">
                <h1>My Blog</h1>

                <div className="blog-card">
                    <img
                        src="https://picsum.photos/seed/blog/900/400"
                        alt="Blog"
                        className="blog-image"
                    />

                    <h2>Title Heading</h2>

                    <p className="date">
                        Title description, September 23, 2026
                    </p>

                    <p>
                        Welcome to my blog. This is a simple React
                        application created to demonstrate routing
                        between different pages.
                    </p>

                    <Link to="/dashboard" className="read-more">
                        READ MORE →
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Home
