import { useMemo, useState } from 'react';
import { initialProducts, money } from './data.js';
import ProductForm from './components/ProductForm.jsx';
import ProductDetails from './components/ProductDetails.jsx';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState('All Dresses');
  const [cart, setCart] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categories = useMemo(() => ['All Dresses', ...new Set(products.map(p => p.category))], [products]);
  const filteredProducts = products.filter(p => category === 'All Dresses' || p.category === category);
  const total = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  function changeQuantity(id, change) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    setCart(prev => ({ ...prev, [id]: Math.max(0, Math.min(product.quantity, (prev[id] || 0) + change)) }));
  }
  function addToCart(product) {
    if (product.quantity > 0) changeQuantity(product.id, 1);
  }
  function addProduct(product) {
    setProducts(prev => [product, ...prev]);
    setCategory('All Dresses');
  }

  if (selectedProduct) {
    const current = products.find(p => p.id === selectedProduct.id) || selectedProduct;
    return <div className="app"><header className="topbar"><div className="brand"><span className="brand-mark">DM</span><div><h1>Dress Management</h1><p>Product inventory system</p></div></div><div className="topbar-stats">Cart items <strong>{cartCount}</strong><span className="stat-divider" /> Order total <strong>{money(total)}</strong></div></header><ProductDetails product={current} onBack={() => setSelectedProduct(null)} onAdd={addToCart} /></div>;
  }

  return <div className="app">
    <header className="topbar"><div className="brand"><span className="brand-mark">DM</span><div><h1>Dress Management</h1><p>Product inventory system</p></div></div><div className="topbar-stats"><span>Cart items <strong>{cartCount}</strong></span><span className="stat-divider" /><span>Order total <strong>{money(total)}</strong></span></div></header>
    <div className="page-heading"><div><h2>Products</h2><p>Manage your dress inventory, product details, and cart quantities.</p></div><button className="primary-button" onClick={() => setShowForm(true)}>+ Add Product</button></div>
    <div className="dashboard-layout">
      <aside className="sidebar"><h3>Categories</h3><p className="sidebar-help">FILTER PRODUCTS</p><nav className="category-list" aria-label="Filter products by category">{categories.map(item => <button key={item} className={`category-item ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}><span>{item}</span><span className="category-count">{item === 'All Dresses' ? products.length : products.filter(p => p.category === item).length}</span></button>)}</nav><div className="inventory-note"><strong>Inventory note</strong><p>Products with fewer than 5 units are marked as low stock.</p></div></aside>
      <main className="main-content"><div className="table-toolbar"><div><h3>{category}</h3><p>{filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} found</p></div><div className="overall-total"><span>Current cart total</span><strong>{money(total)}</strong></div></div>
        <div className="table-wrap"><table className="product-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Quantity</th><th>Subtotal</th><th>Actions</th></tr></thead><tbody>
          {filteredProducts.map(product => { const qty = cart[product.id] || 0; return <tr key={product.id}><td><button className="product-cell" onClick={() => setSelectedProduct(product)}><img src={product.image} alt={product.name} /><span><strong>{product.name}</strong><small>★ {Number(product.rating).toFixed(1)} / 5</small></span></button></td><td><span className="category-label">{product.category}</span></td><td className="price-cell">{money(product.price)}</td><td><span className={product.quantity < 5 ? 'stock-badge low' : 'stock-badge'}>{product.quantity < 5 ? `Low: ${product.quantity}` : product.quantity}</span></td><td><div className="quantity-control"><button aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(product.id, -1)} disabled={qty === 0}>−</button><span>{qty}</span><button aria-label={`Add one ${product.name}`} onClick={() => changeQuantity(product.id, 1)} disabled={qty >= product.quantity}>+</button></div></td><td className="price-cell">{money(product.price * qty)}</td><td><div className="action-buttons"><button className="view-button" onClick={() => setSelectedProduct(product)}>Details</button><button className="add-button" onClick={() => addToCart(product)} disabled={qty >= product.quantity}>Add</button></div></td></tr>; })}
        </tbody></table>{filteredProducts.length === 0 && <p className="empty-message">No products in this category yet.</p>}</div>
        <div className="table-footer"><span>Showing {filteredProducts.length} of {products.length} products</span><strong>Overall total: {money(total)}</strong></div>
      </main>
    </div>
    {showForm && <ProductForm onClose={() => setShowForm(false)} onAdd={addProduct} />}
  </div>;
}
