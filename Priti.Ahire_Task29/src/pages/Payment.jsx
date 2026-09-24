import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Payment() {
  const { cart, total, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart()

  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const handlePayment = (e) => {
    e.preventDefault()

    if (paymentMethod === 'card') {
      if (!cardNumber || !expiry || !cvv) {
        alert('Please enter all card details.')
        return
      }
    }

    alert('Payment successful!')
    navigate('/')
  }

  return (
    <div className="payment-container">
      <div className="payment-form">
        <h1>Payment</h1>

        <div className="payment-method">
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit Card
          </label>
        </div>

        {paymentMethod === 'card' && (
          <form onSubmit={handlePayment}>
            <label>Enter your card number</label>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <label>Enter your card's expiry date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <label>Enter your CVV number</label>
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />

            <button type="submit">Confirm Payment</button>
          </form>
        )}

        {paymentMethod === 'cod' && (
          <button onClick={handlePayment}>Confirm Payment</button>
        )}

        <button className="continue-button" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>

      <div className="payment-cart">
        <h2>Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="payment-cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>

                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}

            <h2>Total: ₹{total}</h2>
          </>
        )}
      </div>
    </div>
  )
}

export default Payment
