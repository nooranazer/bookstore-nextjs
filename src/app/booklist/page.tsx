'use client'
import api from '@/lib/api'
import BookType from '@/types/BookType'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const BookList = () => {
  const [book, setBook] =useState<BookType[]>([])
  const [ user, setUser ] = useState<{ role: string } | null>(null)

  useEffect(() => {
  const storedUser = localStorage.getItem('user')
  const token = localStorage.getItem('token');

   if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  api.get('/books/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log('Books fetched:', res.data);
      setBook(res.data.data); 
    })
    .catch((err) => {
      console.error('Book fetch failed:', err.response?.data);
    });
}, []);

const role = user?.role


  return (
    <div className="min-h-screen bg-gray-50 p-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">📚 Find Your Favourite Books</h2>
    {user?.role === 'seller' && (
            <Link href="/booklist/addbook">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                + Add Book
              </button>
            </Link>
          )}
    {book.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">No books found</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {book.map((b: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5"
          >
             <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${b.image}`}alt={b.title} className="w-full h-auto object-cover rounded-lg mb-4" /> 

            <h3 className="text-xl font-semibold text-gray-800 mb-2">{b.title}</h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Author:</span> {b.author}
            </p>
            {b.price && (
              <p className="text-gray-600">
                <span className="font-medium">Price:</span> ₹{b.price}
              </p>
            )}

            <Link href={`/booklist/${b._id}`}> 
             <h3 className="text-m text-center text-black font-semibold"> view details</h3></Link>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  )
}

export default BookList
