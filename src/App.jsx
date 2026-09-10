import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShowreelModal from './components/ShowreelModal';
import ProjectModal from './components/ProjectModal';
import BookCallModal from './components/BookCallModal';
import WhatsAppButton from './components/WhatsAppButton';

import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import Journal from './pages/Journal';


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Scroll to top whenever the active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#070711] text-zinc-100 font-body flex flex-col selection:bg-amber-500/40 selection:text-amber-100">

      {/* Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBookModal={() => setBookModalOpen(true)}
        onOpenShowreel={() => setShowreelOpen(true)}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onOpenShowreel={() => setShowreelOpen(true)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenBookModal={() => setBookModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'work' && (
          <Work
            onSelectProject={(proj) => setSelectedProject(proj)}
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

        {activeTab === 'journal' && (
          <Journal />
        )}


      </main>

      {/* Global Footer */}
      <Footer
        onOpenBookModal={() => setBookModalOpen(true)}
      />

      {/* Modals */}
      <ShowreelModal
        isOpen={showreelOpen}
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

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

    </div>
  );
}
