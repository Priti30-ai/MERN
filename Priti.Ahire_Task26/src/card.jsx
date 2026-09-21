function Card({ data }) {
  return (
    <div className="card-container">
      {data.map((item, index) => (
        <div className="card" key={index}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;