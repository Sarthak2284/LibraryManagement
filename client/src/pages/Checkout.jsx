import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);  // To store applied coupon
  const [discountedTotal, setDiscountedTotal] = useState(0); // Total after discount
  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Coupons array, you may want to update this from a dynamic source
  const coupons = [
    { code: 'SAVE10', discount: 10 },
    { code: 'READMORE20', discount: 20 },
    { code: 'BOOKLOVER30', discount: 30 },
  ];

  // Calculate discounted price for each item
  const calculateDiscountedPrice = (item) => {
    if (item.discount && item.discount > 0) {
      const discountAmount = (item.price * item.discount) / 100;
      return item.price - discountAmount;
    }
    return item.price;
  };

  // Total discounted price without coupon
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const finalPrice = calculateDiscountedPrice(item);
      return acc + finalPrice * item.quantity;
    }, 0);
  };

  // Handle coupon application
  const handleCouponClick = (code, discount) => {
    setAppliedCoupon({ code, discount });
    toast.success(`🎉 Coupon ${code} applied!`);

    // Calculate new discounted total
    const total = calculateTotal();
    const newTotal = total - (total * discount) / 100;
    setDiscountedTotal(newTotal);
  };

  // Original total without any discount
  const getOriginalTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.info('Item removed from cart');
  };

  const handlePlaceOrder = () => {
    // Alert the final price when placing the order
    alert(`Your final price is Rs.${discountedTotal.toFixed(2)}`);
    navigate('/order-form');
  };

  // Set discounted total on initial render or when cart changes
  useEffect(() => {
    const total = calculateTotal();
    setDiscountedTotal(total);
  }, [cart]);

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
          {cart.map((item) => {
            const original = item.price * item.quantity;
            const discounted = calculateDiscountedPrice(item) * item.quantity;
            const hasDiscount = discounted < original;

            return (
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
                  {hasDiscount ? (
                    <>
                      <p className="text-lg font-semibold text-red-600 line-through">
                        Rs.{original.toFixed(2)}
                      </p>
                      <p className="text-lg font-semibold text-green-700">
                        Rs.{discounted.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold">Rs.{original.toFixed(2)}</p>
                  )}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* Coupon Section */}
          <div className="mt-8">
            <Title text="Apply Coupon" />
            <div className="flex gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  onClick={() => handleCouponClick(coupon.code, coupon.discount)}
                  className="cursor-pointer bg-gradient-to-r from-yellow-300 to-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
                >
                  {coupon.code} - {coupon.discount}% OFF
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <h2 className="text-2xl font-bold">
                Total: Rs.{discountedTotal.toFixed(2)}
              </h2>
              {getOriginalTotal() > discountedTotal && (
                <p className="text-green-600 font-medium mt-1">
                  You saved Rs.{(getOriginalTotal() - discountedTotal).toFixed(2)} on this order!
                </p>
              )}
            </div>
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
