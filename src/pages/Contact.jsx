import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Footer from '../components/Footer';

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

    const btn = document.getElementById('button');
    btn.value = 'Sending...';

    const serviceID = 'service_0oaclmm';
    const templateID = 'template_yagblvk';
    const userID = '5nWCVGXgHMoX4OgCH';

    emailjs.sendForm(serviceID, templateID, '#contact-form', userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccessMessage('Pesan berhasil dikirim!');
        setFormData({ name: '', email: '', message: '' });
        btn.value = 'Send Email';
        setIsSubmitting(false);
      }, (error) => {
        console.error('FAILED...', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
        btn.value = 'Send Email';
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Kontak</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Hubungi Saya
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Saya senang mendengar dari Anda! Kirimkan pesan menggunakan formulir di bawah ini.
          </p>
        </div>
        <div className="mt-10">
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                <div className="mt-1">
                  <input type="hidden" name="to_name" id='to_name' value={"Hylmi"} />
                  <input
                    type="text"
                    name="from_name"
                    id="from_name"
                    autoComplete="name"
                    placeholder="Nama"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
              <div className="mt-1">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  placeholder="Pesan"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
            <div>
              <button
                id="button"
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim'}
              </button>
              {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
