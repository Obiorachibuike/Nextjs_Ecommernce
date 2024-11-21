'use client'; // Ensure this is a client component

import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext'; // Adjust the path if needed
import Link from 'next/link';

const Header = ({ user }) => {
  const { cart } = useContext(CartContext); // Access cart context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // Handle scroll event to fix the header at 90px scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-gray-900 text-white p-4 transition-all duration-300 ${
        isFixed ? 'fixed top-0 left-0 w-full z-50 shadow-lg' : ''
      }`}
      style={{ top: isFixed ? 0 : 'auto' }}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Logo</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {/* Home Link */}
          <Link href="/" className="hover:text-gray-400">Home</Link>

          {/* Products Link with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-gray-400 focus:outline-none"
            >
              Products
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
                <Link href="/category/1" className="block px-4 py-2 hover:bg-gray-100">Category 1</Link>
                <Link href="/category/2" className="block px-4 py-2 hover:bg-gray-100">Category 2</Link>
                <Link href="/category/3" className="block px-4 py-2 hover:bg-gray-100">Category 3</Link>
              </div>
            )}
          </div>

        </nav>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search"
            className="p-2 bg-gray-800 text-white rounded-lg"
          />

        {/* Cart Icon */}
        <div className="relative">
          <Link href="/cart" className="text-xl hover:text-gray-400">
            🛒
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Profile Icon */}
        <div
          className="relative"
          onMouseEnter={() => setProfileMenuOpen(true)}
          onMouseLeave={() => setProfileMenuOpen(false)}
        >
          <button className="text-xl hover:text-gray-400">
            👤
          </button>
          {profileMenuOpen && user && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
              <div className="px-4 py-2 text-sm">
                <span>{user.name}</span>
              </div>
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link href="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
