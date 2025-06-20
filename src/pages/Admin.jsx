import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import useAuthRedirect from '../components/check_login';
import Notifications from '../components/Notifications';

// Dynamically determine API base URL (localhost or LAN IP)
// const getApiBaseUrl = () => {
//   const host = window.location.hostname;
//   // if (host === 'localhost' || host === '127.0.0.1') {
//   //   return 'https://endpoint-myblog-production.up.railway.app/';
//   // }
//   // Fallback to LAN IP for testing on mobile
//   return 'https://endpoint-myblog-production.up.railway.app/';
// };

const BASE_URL = "https://ilmeee.com/get_project/index.php";
const URL = `${BASE_URL}/api/posts`;

const Admin = () => {  
    const [notification, setNotification] = useState({ message: '', type: '' });
    useAuthRedirect(); // Redirect if not logged in
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (notification.message) {
        const timer = setTimeout(() => {
          setNotification({ message: '', type: '' });
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [notification]);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Gagal menghapus postingan.');
      setPosts(posts.filter(post => post.id !== id));
      setNotification({ message: 'Postingan berhasil dihapus!', type: 'success' });
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.toString());
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error('Gagal memuat data.');
        const data = await response.json();
        setPosts(data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <Helmet>
        <title>Admin Dashboard - Hylmi Muhammad Fiary Mahdi</title>
        <meta
          name="description"
          content="Dashboard admin untuk mengelola postingan blog di portofolio Hylmi Muhammad Fiary Mahdi"
        />
        <meta name="keywords" content="Admin, Dashboard, Hylmi, Blog, Portofolio" />
      </Helmet>

      <Chatbot />      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 mt-8"
        >
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
          <p className="text-xl mt-4 text-gray-300">
            Kelola postingan blog dan perbarui konten sesuai kebutuhan.
          </p>
        </motion.div>
        
          <Notifications notification={notification} setNotification={setNotification} />
        
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
        <motion.button
          onClick={() => window.location.href = '/admin/add'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-400 text-black py-3 px-6 rounded-full font-bold transition-all"
        >
          Buat Postingan Baru
        </motion.button>
        </motion.div>
        <div className="flex flex-col gap-8 mt-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={post.imageUrl.startsWith('http') ? post.imageUrl : `https://ilmeee.com/get_project/${post.imageUrl}`}
                  alt={post.title}
                  className="w-full md:w-2/5 object-cover rounded-xl mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-yellow-400">{post.title}</h2>
                    <p className="text-gray-300 mt-2">{post.content}</p>
                  </div>
                  <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="text-gray-400 text-sm">
                      <span>Penulis: {post.author}</span><br />
                      <span>Tanggal: {post.date}</span>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <motion.button
                        onClick={() => window.location.href = `/admin/edit/${post.ID}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 text-white py-2 px-4 rounded-full font-bold"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(post.ID)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500 text-white py-2 px-4 rounded-full font-bold"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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

export default Admin;
