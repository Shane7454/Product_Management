import { money } from '../data.js';

export default function ProductDetails({ product, onBack, onAdd }) {
  return <section className="details-page">
    <button className="back-button" onClick={onBack}>← Back to Product List</button>
    <div className="details-panel">
      <img src={product.image} alt={product.name} />
      <div className="details-info">
        <p className="product-category">{product.category}</p>
        <h2>{product.name}</h2>
        <div className="details-rating">★ {product.rating.toFixed(1)} rating</div>
        <h3>{money(product.price)}</h3>
        <p>{product.description}</p>
        <div className="specification"><strong>Product Specification</strong><p>{product.specification}</p></div>
        <p className={product.quantity < 5 ? 'low-stock-text' : ''}>Quantity available: {product.quantity}</p>
        {product.quantity < 5 && <span className="low-stock-tag inline-tag">Low Stock</span>}
        <button className="primary-button" onClick={() => onAdd(product)} disabled={product.quantity === 0}>Add to Cart</button>
      </div>
    </div>
  </section>;
}
