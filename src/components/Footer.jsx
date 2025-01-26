// src/components/Footer.js
import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-10">
    <div className="container mx-auto text-center">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Hylmi Muhammad Fiary Mahdi</h2>
        <p className="text-sm">Junior Game Developer</p>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <a href="https://github.com/hylmithecoder" target="_blank" rel="noopener noreferrer">
          <img src="/images/github-icon.svg" alt="GitHub" className="w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/in/hylmi-muhammad-fiary-mahdi-b31aab32b/" target="_blank" rel="noopener noreferrer">
          <img src="/images/linkedin-icon.svg" alt="LinkedIn" className="w-6 h-6" />
        </a>
        <a href="https://twitter.com/Sirajameksiko" target="_blank" rel="noopener noreferrer">
          <img src="/images/x-icon.svg" alt="Twitter" className="w-6 h-6" />
        </a>
        <a href="https://instagram.com/sirajameksikooo" target="_blank" rel="noopener noreferrer">
            <img src="/images/ig-icon.svg" alt="Instagram" className="w-6 h-6" />
        </a>
      </div>
      <p className="text-xs text-gray-400">© 2025 Hylmi Muhammad Fiary Mahdi. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
