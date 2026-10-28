import { money } from '../data.js';

export default function ProductCard({ product, cartQuantity, onAdd, onChangeQuantity, onViewDetails }) {
  return <article className="product-card">
    <button className="product-image" onClick={() => onViewDetails(product)} aria-label={`View ${product.name} details`}>
      <img src={product.image} alt={product.name} onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85'; }} />
      {product.quantity < 5 && <span className="low-stock-tag">Low Stock</span>}
    </button>
    <div className="product-content">
      <div className="product-category">{product.category}</div>
      <button className="product-name" onClick={() => onViewDetails(product)}>{product.name}</button>
      <p className="product-description">{product.description}</p>
      <div className="price-rating"><strong>{money(product.price)}</strong><span>★ {product.rating.toFixed(1)}</span></div>
      <div className="stock-line">Quantity: <span className={product.quantity < 5 ? 'low-stock-text' : ''}>{product.quantity}</span></div>
      <div className="cart-controls">
        <button className="quantity-button" onClick={() => onChangeQuantity(product.id, -1)} disabled={cartQuantity === 0}>−</button>
        <button className="add-cart-button" onClick={() => onAdd(product)} disabled={product.quantity === 0}>Add to Cart</button>
        <button className="quantity-button" onClick={() => onChangeQuantity(product.id, 1)} disabled={cartQuantity >= product.quantity}>+</button>
      </div>
      <div className="cart-quantity">Cart quantity: {cartQuantity}</div>
      <div className="subtotal">Subtotal: <strong>{money(product.price * cartQuantity)}</strong></div>
      <button className="details-link" onClick={() => onViewDetails(product)}>View Details →</button>
    </div>
  </article>;
}
