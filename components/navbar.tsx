// components/Navbar.jsx
"use client"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-400">
          BrewNest
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/menu" className="hover:text-amber-400 transition">Menu</Link>
          <Link href="/reservations" className="hover:text-amber-400 transition">Reservations</Link>
          <Link href="/login" className="bg-amber-600 px-4 py-2 rounded-full hover:bg-amber-700 transition">
            Login
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 px-4 py-4 flex flex-col gap-4 text-sm">
          <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link href="/reservations" onClick={() => setMenuOpen(false)}>Reservations</Link>
          <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  )
}