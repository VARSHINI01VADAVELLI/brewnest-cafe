// app/page.jsx
import Hero from "@/components/Hero"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

// fetch 3 featured items for homepage
async function getFeaturedItems() {
  const { data } = await supabase
    .from("menu_items")
    .select("*")
    .eq("available", true)
    .limit(3)
  return data || []
}

export default async function Home() {
  const featured = await getFeaturedItems()

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Features Strip */}
      <section className="bg-amber-600 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl mb-1">☕</p>
            <p className="font-semibold">Premium Coffee</p>
            <p className="text-amber-100 text-sm">Ethically sourced beans</p>
          </div>
          <div>
            <p className="text-2xl mb-1">🍽️</p>
            <p className="font-semibold">Fresh Food</p>
            <p className="text-amber-100 text-sm">Made fresh every morning</p>
          </div>
          <div>
            <p className="text-2xl mb-1">🪑</p>
            <p className="font-semibold">Cozy Space</p>
            <p className="text-amber-100 text-sm">Perfect for work or hangouts</p>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Our Favourites
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Customer loved items, freshly prepared daily
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {featured.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                  <p className="text-amber-600 font-bold text-xl mt-3">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Reserve Your Table</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Book your spot at BrewNest and enjoy a premium café experience
        </p>
        <Link
          href="/reservations"
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Book Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-8 text-sm">
        <p className="text-white font-semibold text-lg mb-2">BrewNest Café</p>
        <p>123 Coffee Street, Hyderabad, Telangana</p>
        <p className="mt-1">Open Mon–Sun: 8AM – 10PM</p>
        <p className="mt-4">© 2026 BrewNest Café. All rights reserved.</p>
      </footer>
    </main>
  )
}