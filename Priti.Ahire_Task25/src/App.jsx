import { useState } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Cart from "./components/Cart";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic White Sneakers",
    price: 70,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 2,
    name: "Sports Running Shoes",
    price: 80,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 3,
    name: "Casual Black Shoes",
    price: 60,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3"
  },
  {
    id: 4,
    name: "Comfort Sneakers",
    price: 75,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
  }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      <Navbar />

      <div className="main-container">
        <section className="products-section">
          <h1>Our Shoes</h1>

          <div className="products-grid">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section className="cart-section">
          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />

          <h2>
            Total: $
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </h2>
        </section>
      </div>
    </>
  );
}

export default App;