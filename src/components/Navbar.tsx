// 

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '@/app/context/userContext'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react' // or use Heroicons

const Navbar = () => {
  const { user, setUser } = useUser()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    router.push('/login')
  }

  const pages = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/favicon.ico.png" alt="Logo" className="h-8 w-8" />
            <Link href="/" className="text-xl font-bold">BookHive</Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {pages.map(page => (
              <Link key={page.name} href={page.href} className="hover:text-yellow-400">
                {page.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/profile">
                  <img
                    src={user.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.image}` : '/avatar.png'}
                    alt="avatar"
                    className="h-8 w-8 rounded-full border-2 border-yellow-500 object-cover"
                  />
                </Link>
                <button onClick={handleLogout} className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {pages.map(page => (
            <Link
              key={page.name}
              href={page.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-yellow-400"
            >
              {page.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="block mt-2">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-left w-full mt-1 text-red-400 hover:text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block mt-2">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
