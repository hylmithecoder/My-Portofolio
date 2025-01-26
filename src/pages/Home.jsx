import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, GamepadIcon, BrushIcon, Download } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import Projects from '../components/ProjectCard';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "I Am A Junior Game Developer. Let's explore what I can do.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const skills = [
    { 
      icon: GamepadIcon, 
      title: 'Game Development', 
      description: 'Creating immersive RPG experiences with Unity' 
    },
    { 
      icon: Code, 
      title: 'Programming', 
      description: 'Developing robust game mechanics and systems' 
    },
    { 
      icon: BrushIcon, 
      title: 'Design', 
      description: 'Crafting engaging game interfaces and experiences' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl mb-4">
            Hi, I am <span className="text-yellow-400">Hylmi Muhammad Fiary Mahdi</span>
          </h1>
          
          <p className="text-xl mb-8 min-h-[60px]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          <div className="flex justify-center space-x-4 mb-12">
            <ScrollLink to="about" smooth={true} duration={500}>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-yellow-400 text-black py-3 px-6 rounded-full flex items-center space-x-2 font-bold"
              >
                <span>About Me</span>
              </motion.button>
            </ScrollLink>
            <ScrollLink to="MyProjects" smooth={true} duration={500}>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-400 text-black py-3 px-6 rounded-full flex items-center space-x-2 font-bold"
              >
                <span>My Projects</span>
              </motion.button>
            </ScrollLink>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white py-3 px-6 rounded-full flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Download CV</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          id="skills"
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">My Skills</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex justify-center mb-4">
                  <skill.icon className="text-yellow-400" size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{skill.title}</h3>
                <p className="text-gray-300">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          id="knowledge"
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold mb-8">What I've Learned</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Over the past years, I have immersed myself in the world of game development, mastering tools and languages that bring my creative visions to life. Using Unity Engine 3D, I've specialized in crafting RPG games that engage players with rich narratives and intricate gameplay mechanics. My proficiency in programming languages such as C#, JavaScript, and Java has allowed me to develop robust game mechanics and seamless user experiences. Additionally, my skills in game design enable me to create interfaces that are not only functional but also visually captivating, ensuring an immersive experience for users. By continuously expanding my knowledge and staying updated with the latest trends, I aim to deliver games that are both innovative and enjoyable.
          </p>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center mt-16"
      >
      <Projects />
      </motion.div>
      <Chatbot />
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
