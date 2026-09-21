import Card from "./card";
import "./App.css";

function App() {
  const cards = [
    {
      title: "Mountain",
      description: "Beautiful mountain view"
    },
    {
      title: "Beach",
      description: "Relaxing beach experience"
    },
    {
      title: "Forest",
      description: "Peaceful green forest"
    },
    {
      title: "City",
      description: "Beautiful city view"
    },
    {
      title: "Desert",
      description: "Warm desert adventure"
    },
    {
      title: "Aurora",
      description: "A glowing northern sky"
    }
  ];

  return (
    <div className="app">
      <h1>My Cards</h1>

      <Card data={cards} />
    </div>
  );
}

export default App;