'use client'
import api from '@/lib/api'
import BookType from '@/types/BookType'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditBook = () => {
  const { id } = useParams()
  const [book, setBook] = useState<BookType>({
    title: '',
    authorname: '',
    price: 0,
    image: '',
    role: '',
   rating: 0,
    category: '',
    description: ''
  })

  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    api.get(`/books/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        setBook(res.data.data)
        setPreviewUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${res.data.data.image}`)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBook({ ...book, [name]: name === 'price' ? Number(value) : value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBook({ ...book, image: file })
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUpdateButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', book.title)
    formData.append('authorname', book.authorname)
    formData.append('price', book.price.toString())
    formData.append('description', book.description)

    if (book.image instanceof File) {
      formData.append('image', book.image)
    }

    const token = localStorage.getItem('token')

    api.patch(`/books/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        // setBook(res.data.data)
        alert('Book updated successfully!')
      })
      .catch((err) => {
        console.error('Can’t update:', err)
      })
  }

  if (!book) return <p>Loading...</p> 


  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 8, px: 2 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          ✏️ Edit Book
        </Typography>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-52 object-cover rounded-md mb-4"
          />
        )}

        <Box component="form" onSubmit={handleUpdateButton} noValidate autoComplete="off" sx={{ mt: 3 }} >
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Author"
            variant="outlined"
            margin="normal"
            name="authorname"
            value={book.authorname}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            type="number"
            margin="normal"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={book.description}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, mb: 3 }}
            fullWidth
          >
            Edit Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#4a91d8ff' }}
          >
            Update Book
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default EditBook
