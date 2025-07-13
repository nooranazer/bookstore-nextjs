'use client'
import api from '@/lib/api'
import BookType from '@/types/BookType'
import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const viewBook = () => {
    const { id } = useParams()
   
    const [book, setBook] = useState<BookType | null>(null)
    const [user, setUser] = useState<BookType | null>(null)
    

    useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (id && token) {
        api.get(`books/view/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then((res) => {
          console.log(res.data.data)
            setBook(res.data.data)
        })
          .catch((err) => {
          console.error('Error fetching book:', err.response?.data || err.message)
        })
    }
    }, [id])

    const role = user?.role

    
  if (!book) {
    return <div className="p-6 text-center">Loading book details...</div>
  }
  return (
     <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book.image}`}
          alt={book.title}
          className="w-full h-50 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-600 mb-2"><strong>Author:</strong> {book.authorname}</p>
        <p className="text-gray-600 mb-2"><strong>Price:</strong> ₹{book.price}</p>
        <p className="text-gray-700 mt-4"><strong>Description:</strong> ₹{book.description}</p>
      </div>
      
      {role === 'seller' && (
      <Link href ={`/booklist/${id}/editbook`}>
       <Button variant="contained" color="primary" startIcon={<Edit />}>
              Edit 
            </Button>
      </Link>
      )}
    </div>
  )
}

export default viewBook