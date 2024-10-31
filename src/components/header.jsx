import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ handleLogout }) => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">Power Apps Tools</h1>

        {/* Navbar Menu */}
        <nav className="space-x-4">
          <Link 
            to="/users" 
            className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-semibold"
          >
            Users
          </Link>
          <Link 
            to="/snippets" 
            className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-semibold"
          >
            Code Snippets
          </Link>
        </nav>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold ml-4"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;