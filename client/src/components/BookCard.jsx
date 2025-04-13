import { useState } from "react";
import { Link } from "react-router-dom";
import loadingImg from "../assets/loading.gif"; // Add a loading gif in your assets folder

function BookCard({ id, title, author, image, tag }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition duration-300">
      <Link to={`/product/${id}`} className="book-card block">
        <div className="w-full h-64 relative">
          {!isImageLoaded && (
            <img
              src={loadingImg}
              alt="Loading..."
              className="w-full h-64 object-cover rounded absolute top-0 left-0"
            />
          )}
          <img
            src={image}
            alt={title}
            className={`w-full h-64 object-cover rounded transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">by {author}</p>

        {tag && (
          <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            {tag}
          </span>
        )}
      </Link>
    </div>
  );
}

export default BookCard;
