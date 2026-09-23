import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [isbn, setIsbn] = useState("");
const [publisher, setPublisher] = useState("");
const [genre, setGenre] = useState("");
const [isAvailable, setIsAvailable] = useState("true");
const [dueDate, setDueDate] = useState("");
const [borrower, setBorrower] = useState("");
const navigate = useNavigate();
  

  const addBook = async (book) => {
    try {
      const res = await fetch ('/api/books', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(book),
      })
      if (!res.ok) throw new Error("Failed.");
      
    } catch (error) {
      console.error(error)
    }
  };
  
  const submitForm = (e) => {
    
    e.preventDefault();
    const book = {
      title, author, isbn, publisher, genre, availability: { isAvailable: isAvailable === "true", dueDate: dueDate || null, borrower},} 
    addBook(book);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <label>ISBN:</label>
        <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        <label>Publisher:</label>
        <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <label>Available:</label>
        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
        <label>Borrower:</label>
        <input type="text" value={borrower} onChange={(e) => setBorrower(e.target.value)}/>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;

