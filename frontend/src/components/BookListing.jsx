import {Link} from "react-router-dom";

const BookListing = ({book}) => {
  return (


    <div className="book-preview">
      <Link to={`/books/${book.id}`}>
      <h2>{book.title}</h2>
      </Link>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Genre: {book.genre}</p>
    </div>
  );
};

export default BookListing;

