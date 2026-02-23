// app/menu/page.jsx
"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const categories = ["All", "Coffee", "Food", "Desserts"]

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: true })

      if (error) console.error(error)
      else setItems(data)
      setLoading(false)
    }
    fetchMenu()
  }, [])

  const filtered = activeCategory === "All"
    ? items
    : items.filter(i => i.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Our Menu
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Made fresh daily with love
        </p>

        {/* Category Filter */}
        <div className="flex gap-3 justify-center flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full border transition text-sm font-medium
                ${activeCategory === cat
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white border-gray-300 hover:border-amber-400 text-gray-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
            ? (
              <div className="col-span-3 text-center py-20 text-gray-400">
                No items in this category yet.
              </div>
            )
            : filtered.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <span className="text-amber-600 font-bold">₹{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <span className="inline-block mt-3 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}