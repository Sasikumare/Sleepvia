function Navbar() {
  return (
    <nav className="topnav">
      <div className="brand">Sleepvia</div>
      <div className="nav-links">
        <a href="#collections">Collections</a>
        <a href="#benefits">Benefits</a>
        <a href="#best-sellers">Best Sellers</a>
        <a href="#promise">Promise</a>
      </div>
      <a href="#best-sellers" className="btn nav-btn">
        Shop now
      </a>
    </nav>
  );
}

export default Navbar;
