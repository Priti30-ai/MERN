import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, total } =
    useCart()

  const navigate = useNavigate()

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
          <button className="payment-button" onClick={() => navigate('/payment')}>
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  )
}

export default Cart
