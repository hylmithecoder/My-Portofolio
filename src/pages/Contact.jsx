import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send('service_0oaclmm', 'template_yagblvk', formData, 'no-reply-hylmi')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccessMessage('Pesan berhasil dikirim!');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      }, (error) => {
        console.error('FAILED...', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <h2 className="text-4xl text-center text-blue-500 mb-8">Kontak</h2>
      <form id="contact-form" onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nama</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Pesan</label>
          <textarea
            name="message"
            id="message"
            placeholder="Pesan"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim'}
        </button>
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </form>
    </section>
  );
};

export default Contact;
