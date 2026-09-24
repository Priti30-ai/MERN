import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cart } = useCart()

  return (
    <nav className="navbar">
      <h2>Shoe Store</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </div>
    </nav>
  )
}

export default Navbar
