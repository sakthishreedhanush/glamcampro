import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShowreelModal from './components/ShowreelModal';
import ProjectModal from './components/ProjectModal';
import BookCallModal from './components/BookCallModal';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import { PROJECTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [showreelIndex, setShowreelIndex] = useState(0);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // Scroll to top whenever the active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenShowreel = (index = 0) => {
    setShowreelIndex(index);
    setShowreelOpen(true);
  };

  const handleSelectProject = (projOrIndex) => {
    if (typeof projOrIndex === 'number') {
      handleOpenShowreel(projOrIndex);
    } else if (projOrIndex && projOrIndex.id) {
      const idx = PROJECTS.findIndex(p => p.id === projOrIndex.id);
      handleOpenShowreel(idx >= 0 ? idx : 0);
    } else {
      handleOpenShowreel(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#070711] text-zinc-100 font-body flex flex-col selection:bg-amber-500/40 selection:text-amber-100">

      {/* Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBookModal={() => setBookModalOpen(true)}
      />

      {/* Main View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onOpenShowreel={handleOpenShowreel}
            onSelectProject={handleSelectProject}
            onOpenBookModal={() => setBookModalOpen(true)}
          />
        )}

        {activeTab === 'work' && (
          <Work
            onSelectProject={handleSelectProject}
            onOpenBookModal={() => setBookModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <About
            onOpenBookModal={() => setBookModalOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <Services
            onOpenBookModal={() => setBookModalOpen(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenBookModal={() => setBookModalOpen(true)}
      />

      {/* Modals */}
      <ShowreelModal
        isOpen={showreelOpen}
        initialIndex={showreelIndex}
        onClose={() => setShowreelOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBookModal={() => setBookModalOpen(true)}
      />

      <BookCallModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
      />

    </div>
  );
}

