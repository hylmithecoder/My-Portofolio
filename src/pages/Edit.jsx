import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import useAuthRedirect from '../components/check_login';
import Notifications from '../components/Notifications';

// Determine API base URL as in Admin
// const getApiBaseUrl = () => {
//   const host = window.location.hostname;
//   return (host === 'localhost' || host === '127.0.0.1')
//     ? 'http://localhost:5000'
//     : 'https://endpoint-myblog-production.up.railway.app/';
// };
const BASE_URL = "https://endpoint-myblog-production.up.railway.app/";
const API_URL = `${BASE_URL}/api/posts`;

const notificationVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const Edit = () => {
    useAuthRedirect(); // Redirect if not logged in
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', description: '', content: '', author: '', date: '', imageFile: null, currentImageUrl: '', githubUrl: '', technologies: [], keyFeatures: []
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  console.log(notification+'\n'+notification.message+'\n'+notification.type+"\n"+setNotification);
  console.log(notificationVariants);

  useEffect(() => {
    // Fetch existing post
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Gagal memuat data');
        const data = await res.json();
        // Use raw data.image (direct path or full URL)
        setForm(prev => ({
          ...prev,
          title: data.title,
          description: data.description,
          content: data.content,
          author: data.author,
          date: data.date,
          imageFile: null,
          currentImageUrl: data.image,
          githubUrl: data.githubUrl,
          technologies: data.technologies,
          keyFeatures: data.keyFeatures
        }));
      } catch (err) {
        console.error(err);
        setNotification({ message: err.message, type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Auto dismiss notification
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('content', form.content);
    fd.append('author', form.author);
    fd.append('date', form.date);
    fd.append('githubUrl', form.githubUrl);
    fd.append('technologies', JSON.stringify(form.technologies));
    fd.append('keyFeatures', JSON.stringify(form.keyFeatures));
    
    if (form.imageFile) fd.append('image', form.imageFile);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', body: fd
      });
      if (!res.ok) throw new Error('Gagal memperbarui postingan');
      setNotification({ message: 'Post berhasil diperbarui!', type: 'success' });
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      console.error(err);
      setNotification({ message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-8 from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <Helmet>
        <title>Edit Post - Hylmi Muhammad Fiary Mahdi</title>
      </Helmet>
      <Chatbot />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold">Edit Post</h1>
        </motion.div>

        {/* <AnimatePresence>
          {notification.message && (
            <motion.div variants={notificationVariants} initial="hidden" animate="visible" exit="hidden" transition={{ duration: 0.5 }} className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-full text-black font-semibold z-50 ${notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}>
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence> */}       
      <Notifications notification={notification} setNotification={setNotification} />
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
        {['title', 'description', 'content', 'author', 'date', 'githubUrl', 'technologies', 'keyFeatures'].map((field) => (
        <div key={field} className="mb-6">
          <label htmlFor={field} className="block text-lg font-bold mb-2 capitalize">{field}</label>

          {field === 'content' ? (
            <textarea
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none min-h-[120px]"
              required
            />
          ) : (field === 'technologies' || field === 'keyFeatures') ? (
            <input
              type="text"
              id={field}
              name={field}
              value={form[field].join(', ')}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [field]: e.target.value
                    .split(',')
                    .map(item => item.trim())
                    // .filter(item => item)
                }))
              }
              placeholder='Masukkan teknologi yang digunakan (pisahkan dengan koma)'
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
            />
          ) : (
            <input
              type={field === 'date' ? 'date' : 'text'}
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none"
              required
            />
          )}
        </div>
      ))}

          {/* Current Image Preview */}
          {form.currentImageUrl && (
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2">Current Image</label>
              <img
                src={form.currentImageUrl.startsWith('http') ? form.currentImageUrl : `${BASE_URL}${form.currentImageUrl}`}
                alt="Current"
                className="w-full h-auto rounded-md border border-white/20"
              />
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="image" className="block text-lg font-bold mb-2">New Image</label>
            <input type="file" id="image" name="image" onChange={handleChange} className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none" />
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={submitting} type="submit" className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-500 transition-all">
            {submitting ? 'Updating...' : 'Update Post'}
          </motion.button>
        </motion.form>
      </div>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Edit;
