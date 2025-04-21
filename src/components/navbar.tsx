'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-8 z-50 w-full flex justify-center">
      <div className="bg-[#111827] text-white rounded-full px-7 py-3 flex gap-8 shadow-md backdrop-blur-md border border-gray-700">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="#about" className="hover:text-blue-400 transition">About</Link>
        <Link href="#projects" className="hover:text-blue-400 transition">Projects</Link>
        <Link href="#contact" className="hover:text-blue-400 transition">Contact</Link>
      </div>
    </nav>
  );
}
