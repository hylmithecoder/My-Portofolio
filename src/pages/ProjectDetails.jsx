import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Code } from 'lucide-react';

const ProjectDetail = () => {
  // Mendapatkan id dan projectName dari URL. Misalnya URL: /project/2/unity-engine
  const { id, projectName } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`https://endpoint-myblog-production.up.railway.app/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project data.');
        }
        // Karena endpoint mengembalikan data proyek tunggal,
        // kita tidak perlu lagi melakukan pencarian (find) pada data.
        const data = await response.json();
        
        // Opsional: Jika parameter "projectName" ada, verifikasi apakah judul pada data cocok dengan parameter tersebut.
        if (projectName && data.title.toLowerCase().replace(/\s+/g, '-') !== projectName) {
          console.warn("Project title from URL doesn't match project data.");
          // Anda bisa memilih untuk mengatur error di sini bila perlu.
        }
        
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, projectName]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-500 text-xl">{error || 'Project not found.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden mb-8">
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-xl text-gray-300">{project.description} <span className='text-xl text-gray-300 float-right'>Date: {project.date}</span></p>
              
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.content}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, index) => (
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
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
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
  );
};

export default ProjectDetail;