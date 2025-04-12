import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderForm() {
  const navigate = useNavigate();

  // State for order details
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // State to handle step navigation (Personal Info → Payment Info)
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final submission after payment details
    console.log(formData);
    navigate('/payment', { state: { formData } });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800">Order Details</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-gray-600">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-2 px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-2 px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="mt-2 px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className="text-gray-600">Delivery Address</label>
                  <textarea
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    className="mt-2 px-4 py-2 border rounded-lg"
                    rows="4"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition-all"
              >
                Next: Payment Details
              </button>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {currentStep === 2 && (
            <div>
              <div className="flex flex-col">
                <label className="text-gray-600">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg w-full"
                >
                  <option value="">Select Payment Method</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cashOnDelivery">Cash on Delivery</option>
                </select>
              </div>

              {formData.paymentMethod === 'creditCard' && (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col">
                    <label className="text-gray-600">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      className="mt-2 px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-600">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      className="mt-2 px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-600">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      className="mt-2 px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700"
                >
                  Back: Personal Details
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition-all"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default OrderForm;
