// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/odiscom-logo.png" alt="Odiscom Logo" className="h-10" />
          <span className="font-semibold text-xl text-gray-800">Odiscom</span>
        </div>
        <nav className="space-x-6 text-gray-700 font-medium text-sm">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}