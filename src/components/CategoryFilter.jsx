export default function CategoryFilter({ categories, selected, onSelect }) {
  return <div className="category-row" aria-label="Filter products by category">
    {categories.map(category => <button
      key={category}
      className={`category-chip ${selected === category ? 'selected' : ''}`}
      onClick={() => onSelect(category)}
    >{category}</button>)}
  </div>;
}
