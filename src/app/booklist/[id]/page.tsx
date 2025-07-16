'use client'

import api from '@/lib/api'
import BookType from '@/types/BookType'
import { Edit, Delete, ArrowBack } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ViewBook = () => {
  const { id } = useParams()
  const router = useRouter()

  const [book, setBook] = useState<BookType | null>(null)
  const [user, setUser] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (id && token) {
      api
        .get(`books/view/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBook(res.data.data))
        .catch((err) =>
          console.error('Error fetching book:', err.response?.data || err.message)
        )
    }
  }, [id])

  const handleDelete = () => {
    const token = localStorage.getItem('token')
    api
      .delete(`/books/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setOpenDialog(false)
        router.push('/booklist')
      })
      .catch((err) =>
        console.error('Error deleting book:', err.response?.data || err.message)
      )
  }

  const role = user?.role

  if (!book) {
    return <div className="p-6 text-center">Loading book details...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Box className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        
        {/* Back Button on top */}
        <Box sx={{ mb: 3 }}>
          <Link href="/booklist">
            <Button variant="outlined" startIcon={<ArrowBack />}>
              Back
            </Button>
          </Link>
        </Box>

        {/* Book Details Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'flex-start',
          }}
        >
          {/* Book Image */}
          <Box
            sx={{
              flex: '0 0 300px',
              height: 500,
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 1,
              mx: 'auto',
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book.image}`}
              alt={book.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Book Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="textSecondary" fontWeight="bold" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Author:</strong> {book.authorname}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Price:</strong> ₹{book.price}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              <strong>Description:</strong> {book.description}
            </Typography>

            
            {role === 'seller' && (
              <Stack direction="row" spacing={2} sx={{ mt: 6 }}>
                <Link href={`/booklist/${id}/editbook`}>
                  <Button variant="contained" color="primary" startIcon={<Edit />}>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setOpenDialog(true)}
                >
                  Delete
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{book.title}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ViewBook
