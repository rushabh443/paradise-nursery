import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost for one plant (unit price x quantity)
  const itemTotal = (item) => item.price * item.quantity;

  // Total cost of everything in the cart
  const totalAmount = cartItems.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // quantity would hit 0, so remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
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
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 && <p>Your cart is empty.</p>}

        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <div>Unit price: ${item.price}</div>
              <div className="qty-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div>Total: ${itemTotal(item)}</div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item)}>
              Delete
            </button>
          </div>
        ))}

        <div className="cart-total">Total Cart Amount: ${totalAmount}</div>

        <div className="cart-buttons">
          <button onClick={() => onNavigate('plants')}>Continue Shopping</button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
