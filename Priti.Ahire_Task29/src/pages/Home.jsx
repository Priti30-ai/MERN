import ProductCard from '../components/ProductCard'

const products = [
  {
    id: 1,
    name: 'White Casual Sneakers',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
  },
  {
    id: 2,
    name: 'Black Running Shoes',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500',
  },
  {
    id: 3,
    name: 'Sports Shoes',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500',
  },
  {
    id: 4,
    name: 'Classic Sneakers',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=500',
  },
]

function Home() {
  return (
    <div className="container">
      <h1>Shoe Collection</h1>

      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
