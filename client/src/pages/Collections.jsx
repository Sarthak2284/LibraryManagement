import { useState, useEffect } from 'react';
import Title from "../components/Title";
import BookCard from "../components/BookCard";
import bookData from '../assets/books.json';

function Collections() {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const booksPerPage = 4;

  // Genre options (you can expand this list based on your data)
  const genres = ['All', 'Fiction', 'Non-Fiction', 'Fantasy', 'Mystery', 'Biography', 'Romance'];

  useEffect(() => {
    // Filter books by category and genre
    let filtered = bookData;

    // Filter by Age Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.section === selectedCategory);
    }

    // Filter by Genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, selectedGenre]);

  // Slice books based on the current page
  const currentBooks = filteredBooks.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

  // Handle Pagination
  const handleNextPage = () => {
    if ((currentPage + 1) * booksPerPage < filteredBooks.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Title text="Collections" icon="📚" />

        {/* Age Category Filters */}
        <div className="mb-8">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`mr-4 px-4 py-2 rounded ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('Kids')}
            className={`mr-4 px-4 py-2 rounded ${selectedCategory === 'Kids' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Kids
          </button>
          <button
            onClick={() => setSelectedCategory('Teens')}
            className={`mr-4 px-4 py-2 rounded ${selectedCategory === 'Teens' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Teens
          </button>
          <button
            onClick={() => setSelectedCategory('Adults')}
            className={`mr-4 px-4 py-2 rounded ${selectedCategory === 'Adults' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Adults
          </button>
        </div>

        {/* Genre Filters */}
        <div className="mb-8">
          <select
            onChange={(e) => setSelectedGenre(e.target.value)}
            value={selectedGenre}
            className="px-4 py-2 border rounded bg-gray-200"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Books Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentBooks.map((book) => (
            <BookCard
              key={book.id}
              id = {book.id}
              title={book.title}
              author={book.author}
              image={book.image}
              tag={book.tag}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            className="bg-gray-800 text-white px-4 py-2 rounded"
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-800 text-white px-4 py-2 rounded"
            disabled={(currentPage + 1) * booksPerPage >= filteredBooks.length}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Collections;
