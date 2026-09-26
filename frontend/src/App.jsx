import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import BookPage from "./pages/BookPage";
import EditBook from "./pages/EditBookPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditBookPage from "./pages/EditBookPage";
import { Navigate } from "react-router-dom";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token;

  })

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated} />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={ isAuthenticated ? <AddBookPage /> : <Navigate to="/signup"/>} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/books/:id" element={<BookPage isAuthenticated={isAuthenticated} />} />
            <Route path="/edit-book/:id" element={ isAuthenticated ? <EditBookPage/> : <Navigate to="/signup"/>} />
            <Route path="/login" element={ isAuthenticated ? <Navigate to="/"/> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/signup" element={ isAuthenticated ? <Navigate to="/"/> : <Signup setIsAuthenticated={setIsAuthenticated}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

