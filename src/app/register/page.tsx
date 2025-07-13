'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
  const router = useRouter()
  const [ username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
 const [image, setImage] = useState<File | null>(null);

  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('role', role)
    if (image) {
    formData.append('image', image);
  }
     const res = await api.post('/auth/register', formData, {   
    }).then((res) => {
      const {token, data } = res.data

      if (token) {
        localStorage.setItem('token',token)
      }
      if (data) {
            localStorage.setItem('user', JSON.stringify(data)); 
      }
      router.push('/booklist')
    }).catch((err) => {
      console.log(err,"erorrrr........")
      alert(err.response.data.message)
    })
  }
  return (
    <div className="flex min-h-screen">
      {/* Left image side */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/login.png')" }}
      />

      {/* Right form side */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-24">
        <h2 className="text-4xl font-bold text-white-800 mb-6">Create Account ✨</h2>
        <p className="text-sm text-gray-500 mb-10">Join the BookHive community</p>

        <form className="space-y-6" onSubmit={handleRegister}>
  <div>
    <label className="block mb-1 text-sm text-gray-600">Name</label>
    <input
      type="text"
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Your name"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
    />
  </div>

  <div>
    <label className="block mb-1 text-sm text-gray-600">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
    />
  </div>

  <div>
    <label className="block mb-1 text-sm text-gray-600">Password</label>
    <input
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
    />
  </div>

  <div>
    <label className="block mb-1 text-sm text-gray-600">Profile Image</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files?.[0] || null)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-600 file:text-white hover:file:bg-yellow-700"
      required
    />
  </div>

  <div>
    <label className="block mb-1 text-sm text-gray-600">Role</label>
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
    >
      <option value="">Select Role</option>
      <option value="buyer">Buyer</option>
      <option value="seller">Seller</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full py-3 text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition duration-200"
  >
    Register
  </button>
</form>


        <p className="text-sm text-gray-500 mt-6">
          Already have an account? <a href="/login" className="text-yellow-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
