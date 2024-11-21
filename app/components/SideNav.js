"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios';
// import "../styles/SideNav.css";
// import { useScroll } from '../context/ScrollContext';
// import { useAuth } from '../context/AuthContext';

function SideNav() {
  // State to track the scroll position and categories
  const [scrollY, setScrollY] = useState(0);
  const [categories, setCategories] = useState([]);
  // const {scroll}  = useScroll()
  // const {user,logout} = useAuth()

  // Fetch categories when the component mounts
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });


  }, []);

  return (
    <div className='side_nav_container fixed_side_bar'>
      <div className="main-header container">
        {/* Business Logo */}
        <div className="logo">
          <Link href="/admin">
            <img src="/path/to/logo.png" alt="MyShop Logo" />
          </Link>
        </div>
      </div>
      <nav>
        <div className="nav">
        <Link href="/admin">Home</Link>
        </div>

        {/* Dropdown for Product Categories */}
        <div className="dropdown">
          <Link href="/admin/products">Products</Link>
          {/* <ul className="dropdown-menu">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <li key={index}>
                  <Link href={`/products/${category}`}>{category}</Link>
                </li>
              ))
            ) : (
              <li>Loading categories...</li>
            )}
          </ul> */}
        </div>
        <div>
        <Link href="/about">Blogs</Link>
        </div>
        <div>
        <Link href="/about">About</Link>
        </div>
        <div>
        <Link href="/contact">Contact</Link>
        </div>
       

        <div>
        <Link href="/settings">Settings</Link>
        </div>


        {/* Language Options */}
        <div className="language-selector">
          <select>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>

      
      </nav>

      <style jsx>{`
        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #fff;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          min-width: 160px;
          padding: 0;
          list-style-type: none;
        }

        .dropdown:hover .dropdown-menu {
          display: block;
        }

        .dropdown-menu li {
          padding: 10px;
        }

        .dropdown-menu li a {
          text-decoration: none;
          color: #333;
          display: block;
        }

        .dropdown-menu li a:hover {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
}

export default SideNav;
