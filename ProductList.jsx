import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

// 3 categories, 6 plants each
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', price: 15, description: 'Hardy and great at filtering air.' },
      { name: 'Spider Plant', price: 12, description: 'Fast growing with arching leaves.' },
      { name: 'Peace Lily', price: 18, description: 'Elegant white flowers.' },
      { name: 'Boston Fern', price: 14, description: 'Lush, feathery fronds.' },
      { name: 'Rubber Plant', price: 20, description: 'Bold glossy leaves.' },
      { name: 'Aloe Vera', price: 10, description: 'Soothing and easy to care for.' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', price: 16, description: 'Calming purple blooms.' },
      { name: 'Jasmine', price: 17, description: 'Sweet-smelling flowers.' },
      { name: 'Rosemary', price: 11, description: 'Fragrant herb for the kitchen.' },
      { name: 'Mint', price: 9, description: 'Fresh and fast growing.' },
      { name: 'Lemon Balm', price: 10, description: 'Light lemon scent.' },
      { name: 'Basil', price: 8, description: 'Aromatic culinary herb.' },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', price: 22, description: 'Thrives in dim corners.' },
      { name: 'Pothos', price: 13, description: 'Trailing vines, very forgiving.' },
      { name: 'Cast Iron Plant', price: 19, description: 'Almost impossible to kill.' },
      { name: 'Chinese Evergreen', price: 21, description: 'Patterned leaves, low light friendly.' },
      { name: 'Dracaena', price: 24, description: 'Tall and architectural.' },
      { name: 'Philodendron', price: 15, description: 'Heart-shaped leaves.' },
    ],
  },
];

function getImage(name) {
  return `https://picsum.photos/seed/${encodeURIComponent(name)}/300/200`;
}

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of items in the cart (shown on the cart icon)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: getImage(plant.name), price: plant.price }));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="brand">Paradise Nursery</div>
        <div className="nav-links">
          <a onClick={() => onNavigate('home')}>Home</a>
          <a onClick={() => onNavigate('plants')}>Plants</a>
          <a onClick={() => onNavigate('cart')}>Cart</a>
          <a className="cart-icon" onClick={() => onNavigate('cart')}>
            🛒<span className="cart-count">{totalCount}</span>
          </a>
        </div>
      </div>

      <div className="page">
        {plantsArray.map((group) => (
          <div key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img src={getImage(plant.name)} alt={plant.name} />
                  <h4>{plant.name}</h4>
                  <div className="price">${plant.price}</div>
                  <small>{plant.description}</small>
                  <br />
                  <button
                    className="add-btn"
                    disabled={isInCart(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isInCart(plant.name) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
