'use client'
import api from '@/lib/api'
import BookType from '@/types/BookType'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  authorname: yup.string().required('Author name is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  description: yup.string().required('Description is required'),
})

const EditBook = () => {
  const { id } = useParams()
  const router = useRouter()
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<File | string>('')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookType>({
    resolver: yupResolver(schema) as any,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    api
      .get(`/books/view/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.data
        setValue('title', data.title)
        setValue('authorname', data.authorname)
        setValue('price', data.price)
        setValue('description', data.description)
        setSelectedImage(data.image)
        setPreviewUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.image}`)
      })
      .catch((err) => console.error(err))
  }, [id, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const onSubmit = (data: BookType) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('authorname', data.authorname)
    formData.append('price', data.price.toString())
    formData.append('description', data.description)

    if (selectedImage instanceof File) {
      formData.append('image', selectedImage)
    }

    const token = localStorage.getItem('token')
    api
      .patch(`/books/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Book updated successfully!')
        router.push(`/booklist/${id}`)
      })
      .catch((err) => console.error('Can’t update:', err))
  }

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

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="authorname"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Author"
                variant="outlined"
                margin="normal"
                error={!!errors.authorname}
                helperText={errors.authorname?.message}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Price"
                type="number"
                variant="outlined"
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                margin="normal"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
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
