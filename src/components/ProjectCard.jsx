import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Github } from 'lucide-react';

const ProjectCard = ({ title, description, technologies, imageUrl, githubLink, demoLink }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl shadow-lg group"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-64 object-cover transition-transform duration-300"
      />
      
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4"
        >
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-center mb-4">{description}</p>
          
          <div className="flex space-x-4">
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
            <Github />
              </a>
            )}
            {demoLink && (
              <a 
                href={demoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 p-2 rounded-full hover:bg-green-500"
              >
                <Eye />
              </a>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="bg-blue-500 text-xs px-2 py-1 rounded-full m-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'RPG Game Project',
      description: 'Immersive RPG game developed using Unity',
      technologies: ['Unity', 'C#', 'Game Design'],
      imageUrl: 'images/3d.png',
      githubLink: 'https://github.com/hylmithecoder/genshin-impact',
      demoLink: 'https://yourgamedemo.com'
    },
    // Add more projects here
    {
      title: 'Desktop App Project',
      description: 'Create A Game Engine using C++ And Library With Qt',
      technologies: ['GameEngine', 'C++', 'Qt', 'GUI'],
      imageUrl: 'images/buildqtforgui.png',
      githubLink: 'https://github.com/hylmithecoder',
      demoLink: 'https://yourgamedemo.com'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 id='MyProjects' className="text-4xl font-bold text-center mb-12 text-white">
        My Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            {...project}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;