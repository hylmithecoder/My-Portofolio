import React, { useState, useEffect } from 'react'; 
import { motion } from 'framer-motion';
import { Eye, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ title, description, technologies, imageUrl, githubLink, demoLink }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHovered] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(userAgent));
  }, []);

  const handleCardClick = () => {
    if (isAndroid) {
      setIsClicked(!isClicked);
    } else {
      navigate(`/project/${encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())}`);
    }
  };

  const handleMouseEnter = () => {
    if (!isAndroid) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isAndroid) {
      setIsHovered(false);
    }
  };

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg group"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-64 object-cover transition-transform duration-300"
        whileTap={{ scale: 0.95 }} 
        whileHover={{ scale: !isAndroid ? 1.05 : 1 }}
      />

      {(isClicked || isHover) && (
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
    </div>
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
      demoLink: '/project/'+encodeURIComponent('RPG Game Project'.replace(/\s+/g, '-').toLowerCase())
    },
    {
      title: 'Desktop App Project',
      description: 'Create A Game Engine using C++ And Library With Qt',
      technologies: ['GameEngine', 'C++', 'Qt', 'GUI'],
      imageUrl: 'images/guiwithqtframework.png',
      githubLink: 'https://github.com/hylmithecoder',
      demoLink: '/project/'+encodeURIComponent('Desktop App Project'.replace(/\s+/g, '-').toLowerCase())
    },
    {
      title: 'Game Testing',
      description: 'Desktop and Android-compatible version of RPG Game Project',
      technologies: ['Unity', 'Android', 'C#'],
      imageUrl: 'images/game nya.png',
      githubLink: 'https://github.com/hylmithecoder/android-rpg',
      demoLink: '/project/'+encodeURIComponent('Game Testing'.replace(/\s+/g, '-').toLowerCase())
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
