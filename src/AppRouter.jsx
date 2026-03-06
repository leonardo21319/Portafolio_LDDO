// src/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import App                  from './App';
import AdminLogin           from './admin/AdminLogin';
import AdminLayout          from './admin/AdminLayout';
import AdminDashboard       from './admin/AdminDashboard';
import ProjectsManager      from './admin/projects/ProjectsManager';
import ProjectForm          from './admin/projects/ProjectForm';
import TechnologiesManager  from './admin/technologies/TechnologiesManager';
import TechnologyForm       from './admin/technologies/TechnologyForm';
// Descomentar cuando tengas contenido en esos archivos:
// import ExperiencesManager   from './admin/experiences/ExperiencesManager';
// import ExperienceForm       from './admin/experiences/ExperienceForm';
// import CertificacionesManager from './admin/certificaciones/CertificacionesManager';
// import CertificacionForm      from './admin/certificaciones/CertificacionForm';

const AppRouter = () => {
  return (
    <Routes>
      {/* ── Portafolio público ── */}
      <Route path="/" element={<App />} />

      {/* ── Panel admin ── */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        {/* Proyectos */}
        <Route path="projects"          element={<ProjectsManager />} />
        <Route path="projects/new"      element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />

        {/* Tecnologías */}
        <Route path="technologies"          element={<TechnologiesManager />} />
        <Route path="technologies/new"      element={<TechnologyForm />} />
        <Route path="technologies/edit/:id" element={<TechnologyForm />} />

        {/* Experiencias — descomentar cuando tengas los archivos */}
        {/* <Route path="experiences"          element={<ExperiencesManager />} /> */}
        {/* <Route path="experiences/new"      element={<ExperienceForm />} /> */}
        {/* <Route path="experiences/edit/:id" element={<ExperienceForm />} /> */}

        {/* Certificaciones — descomentar cuando tengas los archivos */}
        {/* <Route path="certificaciones"          element={<CertificacionesManager />} /> */}
        {/* <Route path="certificaciones/new"      element={<CertificacionForm />} /> */}
        {/* <Route path="certificaciones/edit/:id" element={<CertificacionForm />} /> */}

        <Route path="settings" element={<div>Próximamente</div>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;