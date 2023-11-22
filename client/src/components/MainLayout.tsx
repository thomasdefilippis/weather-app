// MainLayout.js
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen relative">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">Weather App</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 h-full overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 absolute bottom-0 w-full">
        <div className="container mx-auto">
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
