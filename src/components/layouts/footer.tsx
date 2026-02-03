/**
 * Footer Component
 */

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Flexible Form. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
