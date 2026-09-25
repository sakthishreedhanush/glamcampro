import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShowreelModal from './components/ShowreelModal';
import ProjectModal from './components/ProjectModal';
import BookCallModal from './components/BookCallModal';
import Home from './pages/Home';
import { PROJECTS } from './data/mockData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [showreelIndex, setShowreelIndex] = useState(0);
  const [bookModalOpen, setBookModalOpen] = useState(false);

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
        onOpenBookModal={() => setBookModalOpen(true)}
      />

      {/* Main View */}
      <main className="flex-1">
        <Home
          onOpenShowreel={handleOpenShowreel}
          onSelectProject={handleSelectProject}
          onOpenBookModal={() => setBookModalOpen(true)}
        />
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

