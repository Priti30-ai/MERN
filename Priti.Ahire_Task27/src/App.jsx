import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=20"
    );

    if (loading) {
        return <h2 className="message">Loading...</h2>;
    }

    if (error) {
        return <h2 className="message">Error: {error}</h2>;
    }

    return (
        <div className="app">
            <h1>Photos</h1>

            <div className="photo-grid">
                {data.map((photo) => (
                    <div className="photo-card" key={photo.id}>
                        <div
                            className="photo-image"
                            style={{
                                backgroundColor: `hsl(${photo.id * 18}, 70%, 55%)`,
                            }}
                        >
                            <span>Photo {photo.id}</span>
                        </div>

                        <p>{photo.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;