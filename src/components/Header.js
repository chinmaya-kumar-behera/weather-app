import React from 'react'

const Header = () => {
  return (
    <header className="sticky top-0 h-16 bg-gray-500 bg-opacity-40 backdrop-blur-sm">
      <div className="h-full max-w-7xl mx-auto flex justify-between items-center px-10">
        <div>
          <strong className="text-xl">Weather App</strong>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Enter City"
            className="px-3 py-2 text-gray-700 rounded-sm outline-none border-none"
          />
        </div>
      </div>
    </header>
  );
}

export default Header