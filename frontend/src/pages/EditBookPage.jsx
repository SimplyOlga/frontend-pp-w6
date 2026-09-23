import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBookPage = () => {
    const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [isbn, setIsbn] = useState("");
const [publisher, setPublisher] = useState("");
const [genre, setGenre] = useState("");
const [isAvailable, setIsAvailable] = useState("true");
const [dueDate, setDueDate] = useState("");
const [borrower, setBorrower] = useState("");
const { id } = useParams("");
const navigate = useNavigate();
useEffect(() => {
  const fetchBook = async () => {
    const res = await fetch(`/api/books/${id}`);
    const data = await res.json();
    setTitle(data.title);
    setAuthor(data.author);
    setIsbn(data.isbn);
    setPublisher(data.publisher);
    setGenre(data.genre);
    setIsAvailable(data.availability.isAvailable ? "true" : "false");
    setDueDate(
      data.availability.dueDate
        ? data.availability.dueDate.split("T")[0]
        : ""
    ); //we honestly had no idea what is happening
    setBorrower(data.availability.borrower || "");
  };
  fetchBook();

}, [id]);

const updateBook = async (newBook) => {
  try {
    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newBook),
    });
    if (!res.ok) throw new Error("No.")  
  } catch (error) {
console.error(error)}
};

const onSubmit = (e) => {
  e.preventDefault();
  const newBook = {
       title,
    author,
    isbn,
    publisher,
    genre,
    availability: {
      isAvailable: isAvailable === "true",
      dueDate: dueDate || null,
      borrower,
  },
  
};
updateBook(newBook); 
navigate(`/books/${id}`);
};



  return (
    <div className="create">
      <h2>Update Book</h2>
      
        <form onSubmit={onSubmit}>
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
        
      
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;

