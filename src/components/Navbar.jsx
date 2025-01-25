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
        <div className="text-lg font-bold">
          Hylmi Muhammad Fiary Mahdi
        </div>
        <div className="hidden md:flex space-x-6">
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
            Home
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer">
            Tentang Saya
          </ScrollLink>
          <ScrollLink to="projects" smooth={true} duration={500} className="cursor-pointer">
            Proyek
          </ScrollLink>
          <ScrollLink to="blog" smooth={true} duration={500} className="cursor-pointer">
            Blog
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer">
            Kontak
          </ScrollLink>
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
            <ScrollLink to="home" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer">
              Home
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer">
              Tentang Saya
            </ScrollLink>
            <ScrollLink to="projects" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer">
              Proyek
            </ScrollLink>
            <ScrollLink to="blog" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer">
              Blog
            </ScrollLink>
            <ScrollLink to="contact" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer">
              Kontak
            </ScrollLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
