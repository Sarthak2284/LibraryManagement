import bookData from '../assets/books.json'
import Title from './Title';
import BookCard from './BookCard';
import { useState, useEffect } from 'react';


function BestSellers() {
  const[bestSellers ,setBestSellers] = useState([])

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setBestSellers(bookData.slice(30,34));
    },500)
    return ()=> clearTimeout(timer)
  },[]);
  return (
    <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <Title text="Best Sellers" icon="🔥" />
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bestSellers.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            image={book.image}
            tag={book.tag}
          />
        ))}
      </div>
    </div>
  </section>
  );
}

export default BestSellers;
