
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <i className="fa-solid fa-leaf text-3xl text-teal-500"></i>
          <h1 className="text-xl md:text-2xl font-bold text-slate-700">
            芳療與穴位 投影片大綱產生器
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
