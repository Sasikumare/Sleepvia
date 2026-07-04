function ProductCard({ name, description, price, tag, image }) {
  return (
    <article className="product-card">
      <div className="product-card-top">
        <span className="product-tag">{tag}</span>
        <div className="product-favorite">★</div>
      </div>
      {image ? (
        <img src={image} alt={name} className="product-image" loading="lazy" />
      ) : (
        <div className="product-image" />
      )}
      <div className="product-copy">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="product-footer">
        <span className="price">{price}</span>
        <button className="btn btn-primary">Add to cart</button>
      </div>
    </article>
  );
}

export default ProductCard;
