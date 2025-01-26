import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-4 backdrop-blur-md bg-opacity-70 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="/">
        <div className="text-lg font-bold">
          Hylmi Portofolio
        </div>
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="/" className="cursor-pointer">
            Home
          </a>
          <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer">
            Tentang Saya
          </ScrollLink>
          <a href='/#MyProjects' className="cursor-pointer">
            Proyek
          </a>
          <ScrollLink to="blog" smooth={true} duration={500} className="cursor-pointer">
            Blog
          </ScrollLink>
          <a href="/contact" className="cursor-pointer">
            Kontak
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-900 bg-opacity-90 backdrop-blur-md absolute w-full left-0 top-16">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="/" className="cursor-pointer">
              Home
            </a>
            <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer">
              Tentang Saya
            </ScrollLink>
            <a href='/#MyProjects' className="cursor-pointer">
              Proyek
            </a>
            <ScrollLink to="blog" smooth={true} duration={500} className="cursor-pointer">
              Blog
            </ScrollLink>
            <a href="/contact" className="cursor-pointer">
              Kontak
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
