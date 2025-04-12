import { useParams, useNavigate } from 'react-router-dom';
import bookData from '../assets/books.json'; // Import your book data
import Title from '../components/Title';
import { toast } from 'react-toastify'; // Import toast

function ProductPage() {
  const { id } = useParams(); // Get the book id from the URL
  const navigate = useNavigate();

  // Find the book by its id
  const book = bookData.find((book) => book.id === Number(id));

  if (!book) {
    return (
      <div className="text-center py-16">
        <Title text="Book Not Found" icon="❌" />
        <p className="text-xl text-gray-600">Sorry, we couldn't find the book you're looking for.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  const { title, author, image, price, description, relatedProducts } = book;

  // Handle "Add to Cart" action
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if the book already exists in the cart
    const existingBookIndex = existingCart.findIndex((item) => item.id === book.id);
  
    if (existingBookIndex >= 0) {
      // Increase the quantity of the existing book
      existingCart[existingBookIndex].quantity += 1;
    } else {
      // Add new book with quantity 1
      const newBook = { ...book, quantity: 1 }; // Ensure quantity is initialized to 1
      existingCart.push(newBook);
    }
  
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
  
    // Show a toast notification
    toast.success(`${title} has been added to your cart!`);
  };
  

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Title text="Product Details" icon="📚" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Book Image and Info */}
          <div className="flex justify-center items-center">
            <img
              src={image}
              alt={`Cover of ${title}`}
              className="w-[300px] h-[400px] object-cover rounded shadow-md"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
            <p className="text-xl text-gray-600 mt-2">{author}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-4">{`Rs.${price}`}</p>

            {/* Conditional Description */}
            <p className="mt-4 text-gray-700">{description || 'No description available for this book.'}</p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-black text-white font-semibold py-2 px-6 rounded hover:bg-gray-800 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-12">
            <Title text="Related Products" icon="🛒" />
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedBook) => (
                <div key={relatedBook.id} className="border p-4 rounded shadow-lg transition-transform transform hover:scale-105">
                  <img
                    src={relatedBook.image}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{relatedBook.title}</h3>
                  <p className="text-sm text-gray-600">{relatedBook.author}</p>
                  <p className="text-lg font-semibold mt-2">{`Rs.${relatedBook.price}`}</p>
                  <button
                    onClick={() => navigate(`/product/${relatedBook.id}`)}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
                  >
                    View Product
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductPage;
