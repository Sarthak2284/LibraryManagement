import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Calculate total
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.info('Item removed from cart');
  };

  const handlePlaceOrder = () => {  
    navigate('/order-form')
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <Title text="Your Cart is Empty" icon="🛒" />
        <p className="text-lg text-gray-600 mt-4">Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <Title text="Checkout" icon="💳" />

        <div className="bg-white p-6 rounded-lg shadow-md">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.author}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold">Rs.{item.price * item.quantity}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 text-sm mt-1 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-bold">Total: Rs.{getTotal()}</h2>
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
