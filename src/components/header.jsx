import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">Power Apps Tools</h1>
        <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-semibold">Admin</span>
      </div>
    </header>
  );
};

export default Header;