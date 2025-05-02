import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import useAuthRedirect from '../components/check_login';
import Notifications from '../components/Notifications';

const Add = () => {
    useAuthRedirect(); // Redirect if not logged in
    const navigate = useNavigate();
    // const [newProject, setNewProject] = useState({
    //   title: '', description: '', content: '', author: '', date: '', imageFile: null, githubUrl: '', technologies: [], keyFeatures: []
    // });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);
    const [githubUrl, setGithubUrl] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [keyFeatures, setKeyFeatures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ message: '', type: '' });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('date', date);
    if (image) formData.append('image', image);
    formData.append('githubUrl', githubUrl);
    formData.append('technologies', JSON.stringify(technologies));
    formData.append('keyFeatures', JSON.stringify(keyFeatures));

    try {
      const response = await fetch('https://endpoint-myblog-production.up.railway.app/api/posts', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Gagal membuat postingan.');
      const data = await response.json();
      console.log('Post created:', data);
      setTimeout(() => navigate('/admin'), 1000);
      setNotification({ message: 'Post berhasil dibuat!', type: 'success' });
      // Reset form
      setTitle('');
      setDescription('');
      setContent('');
      setAuthor('');
      setDate('');
      setImage(null);
      setGithubUrl('');
      setTechnologies([]);
      setKeyFeatures([]);
    } catch (err) {
      console.error(err);
      setNotification({ message: err.message || 'Terjadi kesalahan!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-8 from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <Helmet>
        <title>Add New Post - Hylmi Muhammad Fiary Mahdi</title>
        <meta name="description" content="Tambah postingan baru untuk portofolio Hylmi Muhammad Fiary Mahdi" />
        <meta name="keywords" content="Add, Create, Post, Hylmi, Blog, Portofolio" />
      </Helmet>

      <Chatbot />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold">Add New Post</h1>
          <p className="text-xl mt-4 text-gray-300">
            Isi detail di bawah ini untuk membuat postingan baru.
          </p>
        </motion.div>

        {/* Notification Pop-up */}
        <Notifications notification={notification} setNotification={setNotification} />

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
        >
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul postingan"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-bold mb-2">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi singkat postingan"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-lg font-bold mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Masukkan isi postingan"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none min-h-[120px]"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="author" className="block text-lg font-bold mb-2">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Masukkan nama penulis"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="date" className="block text-lg font-bold mb-2">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-lg font-bold mb-2">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
              required
            />
          </div>

          <div className='mb-6'>
            <label htmlFor="githubUrl" className='block text-lg font-bold mb-2'>Github URL</label>
            <input
              type="text"
              id="githubUrl"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="Masukkan URL Github"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
              required
            />
          </div>

          <div className='mb-6'>
            <label htmlFor="technologies" className='block text-lg font-bold mb-2'>Technologies</label>
            <input
              type="text"
              id="technologies"
              value={technologies.join(', ')}
              onChange={(e) => setTechnologies(e.target.value.split(',').map((tech) => tech.trim()))}
              placeholder="Masukkan teknologi yang digunakan (pisahkan dengan koma)"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
            />
          </div>

          <div className='mb-6'>
            <label htmlFor="keyFeatures" className='block text-lg font-bold mb-2'>Key Features</label>
            <input
              type="text"
              id="keyFeatures"
              value={keyFeatures.join(', ')}
              onChange={(e) => setKeyFeatures(e.target.value.split(',').map((feature) => feature.trim()))}
              placeholder="Masukkan fitur utama (pisahkan dengan koma)"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-500 transition-all"
          >
            {loading ? "Creating..." : "Create Post"}
          </motion.button>
        </motion.form>
      </div>

      {/* Elemen dekoratif latar belakang */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <Footer />
    </div>
  );
};

export default Add;
