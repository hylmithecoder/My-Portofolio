import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Code } from 'lucide-react';

const projects = [
  {
    title: 'RPG Game Project',
    description: 'Immersive RPG game developed using Unity',
    longDescription: 'An engaging RPG game that features dynamic combat systems, rich storylines, and stunning visuals. Built with Unity and C#, this project demonstrates advanced game development techniques and optimal performance.',
    technologies: ['Unity', 'C#', 'Game Design'],
    imageUrl: '../images/3d.png',
    githubLink: 'https://github.com/hylmithecoder/genshin-impact',
    features: [
      'Real-time combat system',
      'Dynamic character progression',
      'Immersive storytelling',
      'High-quality 3D graphics'
    ]
  },
  {
    title: 'Desktop App Project',
    description: 'Create A Game Engine using C++ And Library With Qt',
    longDescription: 'A powerful game engine built from scratch using C++ and Qt framework. This project showcases advanced graphics programming, physics simulation, and GUI development.',
    technologies: ['GameEngine', 'C++', 'Qt', 'GUI'],
    imageUrl: '../images/guiwithqtframework.png',
    githubLink: 'https://github.com/hylmithecoder',
    features: [
      'Custom rendering engine',
      'Physics simulation',
      'Asset management system',
      'Intuitive GUI interface'
    ]
  },
  {
    title: 'Game Testing',
    description: 'Android-compatible version of RPG Game Project',
    longDescription: 'Desktop and Android-compatible version of RPG Game Project, specifically designed for Android devices. Features touch controls, optimized performance, and mobile-friendly UI.',
    technologies: ['Unity', 'Android', 'C#'],
    imageUrl: '../images/game nya.png',
    githubLink: 'https://github.com/hylmithecoder/android-rpg',
    features: [
      'Touch-optimized controls',
      'Mobile performance optimization',
      'Cross-platform compatibility',
      'Adaptive UI design'
    ]
  }
];

const ProjectDetail = () => {
  const { projectName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === projectName
  );

  useEffect(() => {
    // Simulate image loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center from-gray-900 to-gray-800 bg-gradient-to-br">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-500 mb-4">Project Not Found</h2>
          <p className="text-gray-400">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden mb-8">
          <div className="relative">
            {isLoading ? (
              <div className="w-full h-96 bg-gray-700 animate-pulse" />
            ) : (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-xl text-gray-300">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-300">
                    <Code size={20} className="text-blue-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium transition-transform hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Project Links</h2>
              <div className="space-y-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <Github size={20} />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;