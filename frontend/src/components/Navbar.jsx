const Navbar = () => {

  const click = () => {
    localStorage.removeItem("user")
  }
  return (
    <nav className="navbar">
      <h1>Book Library</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-book">Add Book</a>
        <a href="/login">Login</a>
        <a href="/Signup">Signup</a>
        <button onClick={click}>logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

