const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {


  const click = () => {
    localStorage.removeItem("user");;
    setIsAuthenticated(false);
  }
  return (
    <nav className="navbar">
      <h1>Book Library</h1>
      <div className="links">
        <a href="/">Home</a>

        {
          isAuthenticated && (
            <div>
              <a href="/add-book">Add book</a>
              <button onClick={click}>Logout</button>
            </div>
          ) 
        }

        {!isAuthenticated && (
          <div>
        <a href="/login">Login</a>
        <a href="/Signup">Signup</a>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;

