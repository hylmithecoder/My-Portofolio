import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";
// import crypto from "crypto";

const notificationVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
          try {
            const res = await fetch(`https://ilmeee.com/get_project/users/index.php`);
            // You can use the response if needed
            console.log(res);
          }
          catch (err) {
            console.error(err);
          }
        };
        fetchData();

        const isLoggedIn = localStorage.getItem('isLoggedIn');

        // console.log("isLoggedIn:", isLoggedIn);
        if (isLoggedIn === 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    const showNotification = (msg, type = 'success') => {
        setNotification({ message: msg, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          console.log(username);
          // Ambil hash password tersimpan dari API berdasarkan username/email
          const res = await fetch(`https://ilmeee.com/get_project/users/index.php?username=${username}`);
          if (!res.ok) throw new Error('Gagal mengambil data user');
          const user = await res.json();
          console.log(user);

          // Cocokkan password dengan bcrypt
          const isMatch = await bcrypt.compare(password, user.data.password);
          if (isMatch) {
              showNotification('Login berhasil!', 'success');
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('username', username);
              setTimeout(() => { navigate('/admin') }, 1000);
          } else {
              showNotification('Email atau password salah', 'error');
          }
      } catch (err) {
          console.error(err);
          showNotification(err.message || 'Login gagal', 'error');
      } finally {
          setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <Helmet>
        <title>Login - Hylmi Muhammad Fiary Mahdi</title>
        <meta name="description" content="Halaman login untuk portofolio Hylmi Muhammad Fiary Mahdi" />
        <meta name="keywords" content="Login, Hylmi, Game Developer, Portofolio" />
      </Helmet>

      <Chatbot />

      <AnimatePresence>
        {notification.message && (
          <motion.div
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-full text-black font-semibold z-50 ${notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold">Welcome Back,</h1>
          <p className="text-xl mt-4 text-gray-300">
            Silakan login untuk melihat karya dan proyek menarik.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
        >
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-bold mb-2">Username</label>
            <div className="flex items-center bg-white/20 rounded-md">
              <span className="p-3">
                <User size={20} className="text-yellow-400" />
              </span>
              <input
                type="text"
                id="username"
                placeholder="Masukkan username kamu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent focus:outline-none py-3 px-2 text-white"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-bold mb-2">Password</label>
            <div className="flex items-center bg-white/20 rounded-md">
              <span className="p-3">
                <Lock size={20} className="text-yellow-400" />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Masukkan password kamu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none py-3 px-2 text-white"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-500 transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </motion.form>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
