/**
 * Header Component
 */

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Flexible Form</h1>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
