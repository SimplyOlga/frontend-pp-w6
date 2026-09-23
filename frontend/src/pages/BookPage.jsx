import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BookListing from "../components/BookListing";
import { useParams } from "react-router-dom";


const BookPage = () => {
  const [ book, setBook ] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteBook = async(bookId) => {
    try {
      const res = await fetch(`/api/books/${bookId}`,
        {method: "DELETE"}
      );
      if (!res.ok) throw new Error("Failed")
    }
  catch(error) {
    console.error("Error deleting book:", error)
  } 
  };

  const onDeleteClick = (bookId) => {
    const confirm = window.confirm("Are you sure?")
    if (!confirm) return;
    
    deleteBook(bookId);
    navigate("/")
  }

  useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await fetch(`/api/books/${id}`);
      if (!res.ok) throw new Error("not ok");
      const data = await res.json();
      setBook(data);
    } catch (error) {
      console.log(error)
    };
  };
  fetchBook();
}, []);



  return (
    
    <div className="book-preview">
      <>
        {book && <BookListing book={book} />}
      </>
      <button onClick={() => navigate("/")}>Back</button>
      <button onClick={() => onDeleteClick(book._id)}>Delete</button>
    </div> 
  );
};

export default BookPage;

