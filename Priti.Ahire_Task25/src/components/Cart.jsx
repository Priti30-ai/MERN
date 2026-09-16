function Cart({ cart, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>

            <div className="quantity">
              <button onClick={() => decreaseQuantity(item.id)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;