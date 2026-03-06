// src/App.jsx
import './styles/portfolio.css';
import AnimatedBackground        from './components/ui/AnimatedBackground';
import Navbar                    from './components/layout/Navbar';
import Footer                    from './components/layout/Footer';
import HeroSection               from './components/sections/HeroSection';
import AboutSection              from './components/sections/AboutSection';
import StackSection              from './components/sections/StackSection';
import ProjectsSection           from './components/sections/ProjectsSection';
import CertificacionesSection    from './components/sections/CertificacionesSection';
import ExperienciaSection        from './components/sections/ExperienciaSection';
import ContactoSection           from './components/sections/ContactoSection';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#050912', color: '#fff', overflowX: 'hidden' }}>
      <AnimatedBackground />
      <Navbar />
      <main>
        {/* Orden exacto del HTML v7 */}
        <HeroSection />
        <AboutSection />
        <StackSection />
        <CertificacionesSection />
        <ProjectsSection />
        <ExperienciaSection />
        <ContactoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;