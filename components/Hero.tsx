import Link from "next/link"

// components/Hero.jsx
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600')"
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="text-amber-400 tracking-widest uppercase text-sm mb-4">
          Welcome to
        </p>
        <h1 className="text-6xl font-bold mb-4">BrewNest Café</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          Where every cup tells a story. Freshly brewed, lovingly made.
        </p>
        <div className="flex gap-4 justify-center">
          
           <Link href="/menu"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition"
           > View Menu</Link>
          
           <Link href="/reservations"
            className="border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full font-semibold transition"
          > Reserve a Table</Link>
        </div>
      </div>
    </section>
  )
}