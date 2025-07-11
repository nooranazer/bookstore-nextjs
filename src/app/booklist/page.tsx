'use client'
import api from '@/lib/api'
import React, { useEffect, useState } from 'react'

const BookList = () => {
  const [book, setBook] = useState([])

  useEffect(() => {

    api.get('/books/list')
      .then((res) => {
        console.log(res.data);
        setBook(res.data)
        
      })
      .catch((err) => {
        console.error('not found book')
      })
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Find Your Favourite Books</h2>

      {book.length === 0 ? (
        <p>No books found</p>
      ) : (
        book.map((b: any, index: number) => (
          <div key={index} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{b.title}</h3>
            <p className="text-gray-700">Author: {b.author}</p>
            {/* add more fields like b.price, b.image if available */}
          </div>
        ))
      )}
    </div>
  )
}

export default BookList
