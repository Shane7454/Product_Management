import { useState } from 'react';

const emptyForm = { image: '', name: '', category: 'Midi Dresses', description: '', specification: '', rating: '', price: '', quantity: '' };

export default function ProductForm({ onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const update = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  function submit(e) {
    e.preventDefault();
    if (Object.values(form).some(value => String(value).trim() === '')) {
      alert('Please fill in all fields.');
      return;
    }
    const product = { ...form, id: Date.now(), rating: Number(form.rating), price: Number(form.price), quantity: Number(form.quantity) };
    if (product.rating < 0 || product.rating > 5 || product.price < 0 || product.quantity < 0) {
      alert('Rating must be 0–5. Price and quantity cannot be negative.');
      return;
    }
    onAdd(product);
    setForm(emptyForm);
    onClose();
  }
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="product-form-modal" onClick={e => e.stopPropagation()}>
      <div className="modal-title-row"><div><p className="small-label">PRODUCT MANAGEMENT</p><h2>Add New Product</h2></div><button className="close-button" onClick={onClose}>×</button></div>
      <form onSubmit={submit} className="product-form">
        <label>Feature Image URL<input name="image" value={form.image} onChange={update} placeholder="https://example.com/dress.jpg" required /></label>
        <label>Product Name<input name="name" value={form.name} onChange={update} required /></label>
        <label>Category<select name="category" value={form.category} onChange={update}><option>Midi Dresses</option><option>Evening Dresses</option><option>Sundresses</option><option>Party Dresses</option><option>Casual Dresses</option></select></label>
        <label>Description<textarea name="description" value={form.description} onChange={update} rows="2" required /></label>
        <label>Product Specification<input name="specification" value={form.specification} onChange={update} required /></label>
        <div className="form-grid">
          <label>Rating (0–5)<input type="number" name="rating" min="0" max="5" step="0.1" value={form.rating} onChange={update} required /></label>
          <label>Price (₱)<input type="number" name="price" min="0" step="0.01" value={form.price} onChange={update} required /></label>
          <label>Quantity<input type="number" name="quantity" min="0" step="1" value={form.quantity} onChange={update} required /></label>
        </div>
        <button className="primary-button submit-button" type="submit">Add Product</button>
      </form>
    </section>
  </div>;
}
