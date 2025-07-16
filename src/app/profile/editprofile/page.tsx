'use client'
import api from '@/lib/api'
import { UserType } from '@/types/UserType'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditProfile = () => {
  const router = useRouter()
  const [profile, setProfile] = useState<UserType>({
    username: '',
    email: '',
    password: '',
    image: '' 
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    api
      .get('/user/viewprofile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data,'datassss')
        setProfile(res.data.data)
        setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${res.data.data.image}`)
      })
      .catch((err) => {
        alert('No user found')
        console.error('No user found:', err)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpdateButton = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('username', profile.username)
    formData.append('email', profile.email)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    await api
      .patch('/user/editprofile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.data))
        alert('Profile updated!')
        router.push('/profile')
      })
      .catch((err) => {
        alert('Cannot update profile')
        console.error('Update failed:', err)
      })
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Your Profile</h2>
      <form onSubmit={handleUpdateButton} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border  text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block mt-2"
          />
        </div>

        {preview && (
          <div className="text-center">
            <img
              src={preview}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border mx-auto"
            />
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
