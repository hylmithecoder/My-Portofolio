import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};
const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) setUser(username);
  }, []);

  const toggleMenu = () => setIsOpen(open => !open);

  const handleLogout = async () => {
    setLoggingOut(true);
    // beri delay sejenak untuk animasi/flicker
    await new Promise(res => setTimeout(res, 500));
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setLoggingOut(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-4 backdrop-blur-md bg-opacity-70 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="/" className="flex items-center">
          <div className="text-lg font-bold">Hylmi Portofolio</div>
        </a>
        {/* desktop menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {['Home','About Me','Projects','Blog','Contact Me'].map((label, i) => (
            <motion.a
              key={i}
              href={ label==='Home' ? '/' : label==='Projects' ? '/#MyProjects' : label==='Contact Me' ? '/contact' : undefined }
              as={label.includes('About')||label==='Blog'? ScrollLink : 'a'}
              to={label==='About Me' ? 'about' : label==='Blog' ? 'blog' : undefined}
              smooth={true}
              duration={500}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.05 }}
              className="cursor-pointer hover:text-yellow-400 transition-colors"
            >
              {label}
            </motion.a>
          ))}

          {user ? (
            <motion.div
              className="flex items-center space-x-4"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <a href='/admin'><span className="text-yellow-400 font-semibold">Hi, {user}</span></a>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center space-x-2 cursor-pointer font-semibold"
              >
                <span
                  className={`text-red-400 hover:text-red-300 transition-colors ${loggingOut ? 'opacity-50' : ''}`}
                >
                  Logout
                </span>
                {loggingOut && (
                  <motion.span
                    className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ loop: Infinity, ease: 'linear', duration: 0.6 }}
                  />
                )}
              </button>
            </motion.div>
          ) : (
            <motion.a
              href="/login"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="cursor-pointer hover:text-yellow-400 transition-colors"
            >
              Login
            </motion.a>
          )}
        </div>

        {/* mobile hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-blue-900 bg-opacity-90 backdrop-blur-md absolute w-full left-0 top-16 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {['Home','Tentang Saya','Projects','Blog','Kontak'].map((label, i) => (
                <motion.div
                  key={i}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i*0.05 + 0.1 }}
                >
                  {label === 'Home' || label==='Projects' || label==='Kontak' ? (
                    <a
                      href={ label==='Home' ? '/' : label==='Projects' ? '/#MyProjects' : '/contact' }
                      onClick={toggleMenu}
                      className="cursor-pointer hover:text-yellow-400 transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <ScrollLink
                      to={label==='Tentang Saya'?'about':'blog'}
                      smooth
                      duration={500}
                      onClick={toggleMenu}
                      className="cursor-pointer hover:text-yellow-400 transition-colors"
                    >
                      {label}
                    </ScrollLink>
                  )}
                </motion.div>
              ))}

              {user ? (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <span className="text-yellow-400 font-semibold">Hi, {user}</span>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex items-center space-x-2 font-semibold"
                  >
                    <span className={`text-red-400 hover:text-red-300 ${loggingOut?'opacity-50':''}`}>
                      Logout
                    </span>
                    {loggingOut && (
                      <motion.span
                        className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ loop: Infinity, ease: 'linear', duration: 0.6 }}
                      />
                    )}
                  </button>
                </motion.div>
              ) : (
                <motion.a
                  href="/login"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="cursor-pointer hover:text-yellow-400 transition-colors"
                >
                  Login
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
