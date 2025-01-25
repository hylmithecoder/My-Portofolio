import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_id', 'template_id', formData, 'user_id')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Pesan berhasil dikirim!');
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        console.error('FAILED...', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <h2 className="text-4xl text-center text-blue-500 mb-8">Kontak</h2>
      <form id="contact-form" onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          name="message"
          placeholder="Pesan"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Kirim</button>
      </form>
    </section>
  );
};

export default Contact;
