import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BookListing from "../components/BookListing";
import { useParams } from "react-router-dom";


const BookPage = () => {
  const [ book, setBook ] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
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
    </div> 
  );
};

export default BookPage;

