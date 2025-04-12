import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero2.avif'; // Make sure you have an image in assets folder

function Hero() {
  const navigate = useNavigate();

  const handleBrowseCollection = () => {
    // Navigates to the collection page
    navigate('/collection');
  };
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left Side - Headings */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover Your Next <span className="text-blue-600">Favorite Book</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Dive into a world of knowledge, adventure, and imagination. Explore our library and find your perfect read.
          </p>
          <button onClick={handleBrowseCollection} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition">
            Browse Collection
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2">
          <img src={heroImg} alt="Books Illustration" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
