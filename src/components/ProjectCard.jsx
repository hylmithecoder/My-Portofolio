import React, { useState, useEffect } from 'react'; 
import { motion } from 'framer-motion';
import { Eye, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// const getApiBaseUrl = () => {
//   const host = window.location.hostname;
//   if (host === 'localhost' || host === '127.0.0.1') {
//     return 'https://endpoint-myblog-production.up.railway.app/';
//   }
//   return 'https://endpoint-myblog-production.up.railway.app/';
// };

const BASE_URL = "https://ilmeee.com/get_project/index.php";
const API_URL = `${BASE_URL}/api/posts`;

export const ProjectCard = ({ id, title, description, date, technologies = [], keyFeatures = [], image, githubUrl }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHovered] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(ua));
  }, []);

  const slug = encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase());
  const demoLink = `/project/${id}/${slug}`;
  const imageUrl = image.startsWith('http')
    ? image
    : `https://ilmeee.com/get_project/${image}`;

  const handleCardClick = () => {
    if (isAndroid) {
      setIsClicked(c => !c);
    } else {
      navigate(demoLink);
    }
  };

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => !isAndroid && setIsHovered(true)}
      onMouseLeave={() => !isAndroid && setIsHovered(false)}
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
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4"
        >
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-center mb-4">{description}</p>
          
          <div className="flex space-x-4 mb-4">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
              >
                <Github />
              </a>
            )}
            <a 
              href={demoLink}
              className="bg-green-600 p-2 rounded-full hover:bg-green-500 transition"
            >
              <Eye />
            </a>
          </div>
          
          {/* <div className="w-full">
            <div className="flex flex-wrap justify-center mb-2">
              {technologies.map((tech, i) => (
                <span 
                  key={i} 
                  className="bg-blue-500 text-xs px-2 py-1 rounded-full m-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            {keyFeatures.length > 0 && (
              <ul className="list-disc list-inside text-sm">
                {keyFeatures.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            )} */}
            <div className="w-full">
            <div className="flex flex-wrap justify-center mb-2">
              {technologies.split(',').map((tech, i) => (
                <span 
                  key={i} 
                  className="bg-blue-500 text-xs px-2 py-1 rounded-full m-1"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
            {keyFeatures && keyFeatures.split(',').length > 0 && (
              <ul className="list-disc list-inside text-sm">
                {keyFeatures.split(',').map((feat, i) => (
                  <li key={i}>{feat.trim()}</li>
                ))}
              </ul>
            )}
            <div className="text-sm text-gray-400 mt-2">
              <span className="font-semibold">Date:</span> {new Date(date).toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Projects = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-white py-20">Loading projects...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 id="MyProjects" className="text-4xl font-bold text-center mb-12 text-white">
        My Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <ProjectCard
            id={post.ID}
            key={post.ID}
            title={post.title}
            description={post.description}
            date={post.date}
            technologies={post.technologies}
            keyFeatures={post.keyFeatures}
            image={post.imageUrl}
            githubUrl={post.githubUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
