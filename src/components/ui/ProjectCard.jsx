import { useState } from 'react';
import { FiExternalLink, FiGithub, FiInfo } from 'react-icons/fi';

const ProjectCard = ({ project, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  };

  const statusBgColors = {
    yellow: 'bg-yellow-500/10 border-yellow-500/30',
    green: 'bg-green-500/10 border-green-500/30',
    blue: 'bg-blue-500/10 border-blue-500/30',
  };

  return (
    <div
      className={`glass-effect rounded-2xl p-6 transition-smooth hover:scale-[1.02] hover:shadow-glow-blue-sm cursor-pointer group relative overflow-hidden ${
        project.gridSize === 'large' ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl -z-10 group-hover:bg-accent-blue/10 transition-smooth"></div>

      <div className="flex items-start justify-between mb-4">
        <div
          className={`px-3 py-1 rounded-full text-xs font-mono border ${
            statusBgColors[project.statusColor]
          } flex items-center space-x-2`}
        >
          <span
            className={`w-2 h-2 rounded-full ${statusColors[project.statusColor]} animate-pulse`}
          ></span>
          <span className="text-white">{project.status}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(project);
          }}
          className="text-text-secondary hover:text-accent-blue transition-smooth"
        >
          <FiInfo className="w-5 h-5" />
        </button>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
        {project.title}
      </h3>

      <p className="text-sm text-accent-blue mb-3 font-mono">{project.subtitle}</p>

      <p className="text-text-secondary mb-6 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-text-secondary hover:text-white hover:border-accent-blue/50 transition-smooth"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-text-secondary">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-2 text-sm text-accent-blue hover:text-white transition-smooth"
          >
            <FiExternalLink className="w-4 h-4" />
            <span>Ver Demo</span>
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-2 text-sm text-text-secondary hover:text-accent-blue transition-smooth"
          >
            <FiGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;