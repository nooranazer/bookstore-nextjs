import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      
      <section className="bg-yellow-100 py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to <span className="text-yellow-600">BookHive</span></h1>
        <p className="text-lg text-gray-700">Your one-stop shop for amazing books 🐝📚</p>
        <Link href="/login">
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">
            Browse Books
          </button>
        </Link>

      </section>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Books</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          
          {[1, 2, 3, 4].map((book) => (
            <div key={book} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <h3 className="text-lg font-medium">Book Title {book}</h3>
              <p className="text-sm text-gray-600">Author Name</p>
              <button className="mt-4 text-yellow-600 font-semibold">View Details</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage;
