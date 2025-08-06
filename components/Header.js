// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/odiscom-logo.png" alt="Odiscom Logo" className="h-10 w-auto" />
        </div>
        <nav className="flex space-x-8 text-sm text-gray-800 font-medium">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}