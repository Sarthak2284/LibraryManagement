import books from "../assets/books.json";
import BookCard from "./BookCard";

function BookList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          image={book.image}
          tag={book.tag}
        />
      ))}
    </div>
  );
}

export default BookList;
