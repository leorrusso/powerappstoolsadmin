import React from 'react';

const Header = ({ handleLogout }) => {

  return (
    <header className="bg-purple-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">Power Apps Tools</h1>


        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="text-white px-3 py-1 rounded text-sm font-semibold ml-4"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;