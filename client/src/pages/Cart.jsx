import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

function Cart() {
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [popperCoupon, setPopperCoupon] = useState(null);

  const coupons = [
    { code: 'SAVE10', discount: 10 },
    { code: 'READMORE20', discount: 20 },
    { code: 'BOOKLOVER30', discount: 30 },
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartWithQuantities = storedCart.map((book) => ({
      ...book,
      quantity: book.quantity || 1,
    }));
    setCart(cartWithQuantities);
  }, []);

  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter((book) => book.id !== bookId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (bookId) => {
    const updatedCart = cart.map((book) =>
      book.id === bookId ? { ...book, quantity: book.quantity + 1 } : book
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (bookId) => {
    const updatedCart = cart.map((book) =>
      book.id === bookId && book.quantity > 1
        ? { ...book, quantity: book.quantity - 1 }
        : book
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalBeforeDiscount = cart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalPrice = totalBeforeDiscount - (totalBeforeDiscount * discount) / 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const handleCouponClick = (code, discount) => {
    setAppliedCoupon({ code, discount });
    toast.success(`🎉 Coupon ${code} applied!`);
    triggerConfetti();
    setPopperCoupon(code);
    setTimeout(() => setPopperCoupon(null), 2500);
  };

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <Title text="Your Cart" icon="🛒" />

        {cart.length === 0 ? (
          <p className="text-xl text-gray-600">Your cart is empty!</p>
        ) : (
          <>
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
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-[50px] h-[70px] object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="font-semibold">{book.title}</div>
                      <div className="text-sm text-gray-600">Rs. {book.price}</div>
                    </td>
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
                    <td className="px-4 py-2">
                      Rs. {book.price * book.quantity}
                    </td>
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

            {/* Coupons Section */}
            <div className="mt-8">
              <Title text="Available Coupons 🎁" />
              <div className="flex flex-wrap gap-4 mt-4">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="cursor-pointer bg-gradient-to-r from-yellow-300 to-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
                    onClick={() =>
                      handleCouponClick(coupon.code, coupon.discount)
                    }
                  >
                    {coupon.code} - {coupon.discount}% OFF
                  </div>
                ))}
              </div>
            </div>

            {/* Total Section */}
            <div className="mt-10">
              <div className="text-right space-y-2">
                <p className="text-lg">Subtotal: Rs. {totalBeforeDiscount}</p>
                {appliedCoupon && (
                  <p className="text-green-600">
                    🎉 Coupon <strong>{appliedCoupon.code}</strong> Applied: -{appliedCoupon.discount}% OFF
                  </p>
                )}
                <p className="text-2xl font-bold">
                  Total: Rs. {totalPrice >= 0 ? totalPrice.toFixed(2) : 0}
                </p>
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
          </>
        )}
      </div>

      {/* Popper Animation */}
      {popperCoupon && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-300 text-black font-bold py-3 px-6 rounded-full shadow-lg animate-bounce text-lg border border-yellow-500">
            🎊 {popperCoupon} Activated!
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
