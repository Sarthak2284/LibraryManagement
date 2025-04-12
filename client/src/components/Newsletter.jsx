import Title from '../components/Title';

function Newsletter() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <Title text="Subscribe to our Newsletter" icon="📬" />

        <div className="max-w-2xl mx-auto p-8 rounded-lg ">
          <p className="text-gray-700 text-lg text-center mb-6">
            Stay updated with the latest arrivals, events, and offers!
          </p>
          
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
