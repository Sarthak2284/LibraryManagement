import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Retrieve the cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Function to remove item from cart
  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter((book) => book.id !== bookId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to increase quantity of a book
  const increaseQuantity = (bookId) => {
    const updatedCart = cart.map((book) => {
      if (book.id === bookId) {
        book.quantity += 1;
      }
      return book;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to decrease quantity of a book
  const decreaseQuantity = (bookId) => {
    const updatedCart = cart.map((book) => {
      if (book.id === bookId && book.quantity > 1) {
        book.quantity -= 1;
      }
      return book;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, book) => total + book.price * book.quantity, 0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Title text="Your Cart" icon="🛒" />

        {cart.length === 0 ? (
          <p className="text-xl text-gray-600">Your cart is empty!</p>
        ) : (
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Book Title</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((book) => (
                <tr key={book.id} className="border-t">
                  <td className="px-4 py-2">
                    <img src={book.image} alt={book.title} className="w-[50px] h-[70px] object-cover" />
                  </td>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">Rs. {book.price}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => decreaseQuantity(book.id)}
                      className="bg-gray-200 py-1 px-3 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="mx-2">{book.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(book.id)}
                      className="bg-gray-200 py-1 px-3 rounded text-sm"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-2">Rs. {book.price * book.quantity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="bg-red-600 text-white py-1 px-4 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-6">
          <div className="text-right">
            <p className="text-xl font-semibold">Total: Rs. {totalPrice}</p>
          </div>

          <div className="flex justify-end mt-4">
            <Link
              to="/checkout"
              className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
