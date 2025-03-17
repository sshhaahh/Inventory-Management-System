import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Buy', path: '/buy' },
    { name: 'Orders', path: '/orders' },
    { name: 'Products', path: '/products' },
    { name: 'Sellers', path: '/sellers' },
    { name: 'Category', path: '/categories' },
  ];

  return (
    <nav>
      {/* 🔹 Mobile Menu Button */}
      <div className='md:hidden border text-right text-3xl p-3'>
        <button onClick={() => setIsMenuOpen((prev) => !prev)}>
          <GiHamburgerMenu />
        </button>
      </div>

      {/* 🔹 Desktop Navbar */}
      <ul className='hidden md:flex justify-center items-start pl-12 p-3 font-bold text-black text-2xl bg-[#3C3D37] shadow-2xl lg:flex-col lg:min-h-screen lg:gap-y-2 transition-all duration-100 ease-in-out'>
        {navItems.map((item, index) => (
          <li key={index} className='p-3 rounded-2xl bg-white shadow-2xl w-4/5 text-center'>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-300'
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* 🔹 Mobile Menu */}
      {isMenuOpen && (
        <div className='border'>
          <ul className='grid grid-cols-2 place-items-center font-bold text-xl p-4 gap-3'>
            {navItems.map((item, index) => (
              <li key={index} className='p-2' onClick={() => setIsMenuOpen(false)}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'text-blue-500' : 'hover:text-blue-300'
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
