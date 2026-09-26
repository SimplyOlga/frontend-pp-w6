import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BookListing from "../components/BookListing";
import { useParams } from "react-router-dom";


const BookPage = ({isAuthenticated }) => {
  const [ book, setBook ] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : null;


  const deleteBook = async(bookId) => {
    try {
      const res = await fetch(`/api/books/${bookId}`,
        {method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (!res.ok) throw new Error("Failed")
        navigate("/")
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

      {
        isAuthenticated && (
          <div>
      <button onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</button>
      <button onClick={() => onDeleteClick(book._id)}>Delete</button>
          </div>
        )
      }

    </div> 
  );
};

export default BookPage;

