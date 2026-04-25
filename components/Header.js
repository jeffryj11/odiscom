// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/odiscom-logo.png" alt="Odiscom Logo" className="h-10 w-auto" />
          <span className="font-bold text-lg text-gray-800 tracking-wide">Odiscom Supply</span>
        </div>
        <nav className="flex gap-8 text-gray-700 font-medium text-sm">
          <Link href="/shop">Shop</Link>
          <Link href="/quote">Request Quote</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
