import { useEffect } from 'react';
import { FiX, FiExternalLink, FiGithub, FiCheck } from 'react-icons/fi';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

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
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative glass-effect-strong rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeInUp">
        <div className="sticky top-0 glass-effect-strong border-b border-white/10 p-6 flex items-start justify-between z-10">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">{project.title}</h2>
            <p className="text-sm text-accent-blue font-mono">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-smooth p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close modal"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div
            className={`px-4 py-2 rounded-full text-sm font-mono border ${
              statusBgColors[project.statusColor]
            } flex items-center space-x-2 w-fit`}
          >
            <span
              className={`w-2 h-2 rounded-full ${statusColors[project.statusColor]} animate-pulse`}
            ></span>
            <span className="text-white">{project.status}</span>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">Descripcion Completa</h3>
            <p className="text-text-secondary leading-relaxed">{project.longDescription}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">Caracteristicas Principales</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <FiCheck className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">Tecnologias Utilizadas</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 glass-effect border border-accent-blue/30 rounded-lg text-sm font-mono text-white hover:bg-accent-blue/10 transition-smooth"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-accent-blue hover:bg-accent-blue/80 text-white px-6 py-3 rounded-lg font-medium transition-smooth flex items-center justify-center space-x-2"
              >
                <FiExternalLink className="w-5 h-5" />
                <span>Ver Demo en Vivo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border-2 border-text-secondary text-text-secondary hover:border-white hover:text-white px-6 py-3 rounded-lg font-medium transition-smooth flex items-center justify-center space-x-2"
              >
                <FiGithub className="w-5 h-5" />
                <span>Ver en GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;