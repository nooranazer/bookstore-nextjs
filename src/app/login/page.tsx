'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmitButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res= await  api.post('/auth/',  {
    email,
    password,
    })
    .then((res) => {
     console.log(res.data)
     const {token, data} = res.data
     
     if(token) {
      localStorage.setItem('token', token) //storing to local
     }
     if(data) {
      localStorage.setItem('user', JSON.stringify(data))

     }
     router.push('/booklist')
     alert('Welcome to BookHive!')
    })
    .catch((err) => {
      alert('invalid credentials')
    })
  }


  return (
    <div className="flex min-h-screen">
      
      <div className="hidden lg:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.png')" }} />

      
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-24">
        <h2 className="text-4xl font-bold text-white-800 mb-6">Welcome Back 📚</h2>
        <p className="text-sm text-gray-500 mb-10">Login to continue to BookHive</p>

        <form className="space-y-6" onSubmit={handleSubmitButton}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Don’t have an account? <a href="/register" className="text-yellow-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
