function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year}, Sleepvia all rights reserved</p>
    </footer>
  );
}

export default Footer;
