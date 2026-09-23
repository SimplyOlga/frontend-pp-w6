import BookListings from "../components/BookListings";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {

  const [books, setBooks] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books")

        if (!res.ok) throw new Error("Failed")
        const data = await res.json()
      setBooks(data);
      setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false)
      }
    };
    fetchBooks();
  }, [] );




  return (
    <div className="home">

      {books && <BookListings books={books} />}
    </div>
  );
};

export default Home;

