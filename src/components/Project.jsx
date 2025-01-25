// src/components/Projects.js
import React from 'react';

const Projects = () => (
  <div className="text-center py-20 bg-gray-100">
    <h1 className="text-5xl mb-10 text-gray-800">Proyek Saya</h1>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src="/images/game nya.png"
          alt="Proyek Membuat Game"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Membuat Game</h2>
          <p className="text-gray-700 mb-4">
            Ini adalah proyek terbaru saya di mana saya sedang membuat game interaktif menggunakan Unity dan C#.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-blue-500 text-white text-sm px-2 py-1 rounded">Unity</span>
            <span className="inline-block bg-green-500 text-white text-sm px-2 py-1 rounded">C#</span>
            <span className="inline-block bg-yellow-500 text-white text-sm px-2 py-1 rounded">Game Development</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src="/images/buildqtforgui.png"
          alt="Proyek Kedua"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Proyek Kedua</h2>
          <p className="text-gray-700 mb-4">
            Deskripsi singkat tentang proyek kedua yang sedang kamu kerjakan.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-purple-500 text-white text-sm px-2 py-1 rounded">React</span>
            <span className="inline-block bg-pink-500 text-white text-sm px-2 py-1 rounded">JavaScript</span>
            <span className="inline-block bg-teal-500 text-white text-sm px-2 py-1 rounded">Web Development</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src="/images/3d.png"
          alt="Proyek Ketiga"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Proyek Ketiga</h2>
          <p className="text-gray-700 mb-4">
            Deskripsi singkat tentang proyek ketiga yang sedang kamu kerjakan.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-red-500 text-white text-sm px-2 py-1 rounded">Python</span>
            <span className="inline-block bg-orange-500 text-white text-sm px-2 py-1 rounded">Machine Learning</span>
            <span className="inline-block bg-indigo-500 text-white text-sm px-2 py-1 rounded">Data Science</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Projects;
