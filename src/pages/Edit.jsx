import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import useAuthRedirect from '../components/check_login';
import Notifications from '../components/Notifications';

const BASE_URL = "https://ilmeee.com/get_project/index.php";

const Edit = () => {
  useAuthRedirect(); // Redirect if not logged in
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', 
    description: '', 
    content: '', 
    author: '', 
    date: '', 
    imageFile: null, 
    currentImageUrl: '', 
    githubUrl: '', 
    technologies: [], 
    keyFeatures: []
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    // Fetch existing post
    const fetchPost = async () => {
      try {
        const res = await fetch(`${BASE_URL}?id=${id}`);
        if (!res.ok) throw new Error('Gagal memuat data');
        const data = await res.json();
        
        setForm(prev => ({
          ...prev,
          title: data.data.title || '',
          description: data.data.description || '',
          content: data.data.content || '',
          author: data.data.author || '',
          date: data.data.date || '',
          imageFile: null,
          currentImageUrl: data.data.imageUrl || '',
          githubUrl: data.data.githubUrl || '',
          technologies: data.data.technologies ? data.data.technologies.split(',').map(t => t.trim()) : [],
          keyFeatures: data.data.keyFeatures ? data.data.keyFeatures.split(',').map(k => k.trim()) : []
        }));
      } catch (err) {
        console.error('Fetch error:', err);
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

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare data object (not FormData for JSON API)
      const updateData = {
        title: form.title,
        description: form.description,
        content: form.content,
        author: form.author,
        date: form.date,
        githubUrl: form.githubUrl,
        technologies: form.technologies.join(','),
        keyFeatures: form.keyFeatures.join(','),
        imageUrl: form.currentImageUrl // Keep current image URL
      };

      // Handle new image if uploaded
      if (form.imageFile) {
        try {
          const base64Image = await fileToBase64(form.imageFile);
          updateData.image = base64Image;
        } catch (imageError) {
          console.error('Error converting image:', imageError);
          setNotification({ message: 'Error processing image', type: 'error' });
          setSubmitting(false);
          return;
        }
      }


      const res = await fetch(`${BASE_URL}?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(updateData)
      });


      // Check if response is ok
      if (!res.ok) {
        // Try to get error message from response
        let errorMessage = 'Gagal memperbarui postingan';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const responseData = await res.json();

      if (responseData.status !== 'success') {
        throw new Error(responseData.message || 'Gagal memperbarui postingan');
      }

      setNotification({ message: 'Post berhasil diperbarui!', type: 'success' });
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      console.error('Submit error:', err);
      
      // Handle different types of errors
      let errorMessage = 'Terjadi kesalahan';
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Koneksi gagal. Periksa koneksi internet Anda.';
      } else if (err.message.includes('CORS')) {
        errorMessage = 'Error CORS. Hubungi administrator.';
      } else {
        errorMessage = err.message || 'Terjadi kesalahan';
      }
      
      setNotification({ message: errorMessage, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-8 from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <Helmet>
        <title>Edit Post - Hylmi Muhammad Fiary Mahdi</title>
      </Helmet>
      <Chatbot />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold">Edit Post</h1>
        </motion.div>

        <Notifications notification={notification} setNotification={setNotification} />
        
        <motion.form 
          onSubmit={handleSubmit} 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
        >
          {/* Basic Fields */}
          {['title', 'description', 'content', 'author', 'date', 'githubUrl'].map((field) => (
            <div key={field} className="mb-6">
              <label htmlFor={field} className="block text-lg font-bold mb-2 capitalize">
                {field === 'githubUrl' ? 'GitHub URL' : field}
              </label>

              {field === 'content' ? (
                <textarea
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:border-white/40 min-h-[120px] text-white placeholder-white/60"
                  required
                  placeholder={`Enter ${field}...`}
                />
              ) : (
                <input
                  type={field === 'date' ? 'date' : 'text'}
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:border-white/40 text-white placeholder-white/60"
                  required
                  placeholder={`Enter ${field}...`}
                />
              )}
            </div>
          ))}

          {/* Technologies Field */}
          <div className="mb-6">
            <label htmlFor="technologies" className="block text-lg font-bold mb-2">Technologies</label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={form.technologies.join(', ')}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  technologies: e.target.value
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item !== '') // Remove empty items
                }))
              }
              placeholder="Enter technologies used (separate with commas)"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:border-white/40 text-white placeholder-white/60"
            />
          </div>

          {/* Key Features Field */}
          <div className="mb-6">
            <label htmlFor="keyFeatures" className="block text-lg font-bold mb-2">Key Features</label>
            <input
              type="text"
              id="keyFeatures"
              name="keyFeatures"
              value={form.keyFeatures.join(', ')}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  keyFeatures: e.target.value
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item !== '') // Remove empty items
                }))
              }
              placeholder="Enter key features (separate with commas)"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:border-white/40 text-white placeholder-white/60"
            />
          </div>

          {/* Current Image Preview */}
          {form.currentImageUrl && (
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2">Current Image</label>
              <div className="relative">
                <img
                  src={form.currentImageUrl.startsWith('http') 
                    ? form.currentImageUrl 
                    : `https://ilmeee.com/get_project/${form.currentImageUrl}`
                  }
                  alt="Current"
                  className="w-full h-auto max-h-64 object-cover rounded-md border border-white/20"
                  onError={(e) => {
                    console.error('Image load error:', e);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* New Image Upload */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-lg font-bold mb-2">
              {form.currentImageUrl ? 'Replace Image (Optional)' : 'Upload Image'}
            </label>
            <input 
              type="file" 
              id="image" 
              name="image" 
              onChange={handleChange} 
              accept="image/*"
              className="w-full bg-transparent border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:border-white/40 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30" 
            />
            {form.imageFile && (
              <p className="mt-2 text-sm text-white/70">Selected: {form.imageFile.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            disabled={submitting} 
            type="submit" 
            className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                Updating...
              </span>
            ) : (
              'Update Post'
            )}
          </motion.button>
        </motion.form>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Edit;