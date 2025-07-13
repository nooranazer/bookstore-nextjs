'use client'
import api from '@/lib/api'
import BookType, { AddBookType } from '@/types/BookType'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const AddBook = () => {
  const [book, setBook] = useState<AddBookType>({
    title: '',
    authorname: '',
    price: 0,
    stock: 0,  
    image: '',
    description: '',
    rating: 0,
    category: ''
  })

  const [previewUrl, setPreviewUrl] = useState<string>('')

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

  const handleAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', book.title)
    formData.append('authorname', book.authorname)
    formData.append('price', book.price.toString())
    formData.append('description', book.description)
    formData.append('stock', book.stock.toString())
    formData.append('category', book.category)
    formData.append('rating', book.rating.toString())


    if (book.image instanceof File) {
      formData.append('image', book.image)
    }

    const token = localStorage.getItem('token')

    try {
      const res = await api.post('/books/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('✅ Book Added Successfully!')
      setBook({
        title: '',
        authorname: '',
        price: 0,
        stock:0,
        image: '',
        description: '',
        rating: 0,
        category: ''
      })
      setPreviewUrl('')
    } catch (err) {
      console.error('❌ Error adding book:', err)
      alert('Failed to add book. Please try again.')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9', py: 8, px: 2 }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          borderRadius: 3,
          backgroundColor: 'white'
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          📚 Add New Book
        </Typography>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-52 object-cover rounded-md mb-4"
          />
        )}

        <Box
          component="form"
          onSubmit={handleAddButton}
          noValidate
          autoComplete="off"
          sx={{ mt: 2 }}
        >
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
            label="Author Name"
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
            margin="normal"
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Stock"
            variant="outlined"
            margin="normal"
            type="number"
            name="stock"
            value={book.stock}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Category"
            variant="outlined"
            margin="normal"
            name="category"
            value={book.category}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Rating"
            variant="outlined"
            margin="normal"
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            name="description"
            multiline
            rows={4}
            value={book.description}
            onChange={handleChange}
          />
            <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            >
            Upload Book Image
            <input type="file" name="image" hidden onChange={handleImageChange} />
            </Button>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#4a91d8ff',
              color: '#fff',
              py: 1.2,
              fontWeight: 'bold'
            }}
          >
            ➕ Add Book
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default AddBook
