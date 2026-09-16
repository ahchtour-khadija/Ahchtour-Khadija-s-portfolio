import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AmbientBackground from './components/AmbientBackground.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import { sound, initAudioUnlock } from './utils/sound.js';

function App() {
  useEffect(() => {
    // Prime audio on first interaction (browsers block audio before that).
    initAudioUnlock();
    // Mobile browsers fire pointerup/touchend before delayed click and require
    // audio to be triggered from a genuine gesture. Listen to pointer/touch
    // and click; dedup inside sound.play (350ms) prevents double sounds.
    const handleGlobalSound = (event) => {
      if (!(event.target instanceof Element)) return;
      // Generic buttons (Contact page Send Email/WhatsApp, hero CTA, etc.)
      // Exclude project cards/buttons – they have dedicated tap/scroll handling
      const btn = event.target.closest('.btn');
      if (btn && !btn.disabled && !btn.classList.contains('project-view-btn')) {
        sound.play('click');
        return;
      }
      // Navigation links and brand – immediate sound on touch
      if (event.target.closest('.navbar-link') || event.target.closest('.brand')) {
        sound.play('nav');
        return;
      }
      // Hamburger toggle
      if (event.target.closest('.navbar-toggle')) {
        sound.play('nav');
        return;
      }
      // Modal close (overlay or X) – handled via ProjectModal's own sync play,
      // but keep global as fallback for backdrop taps outside modal content
      if (event.target.closest('.modal-close') || event.target.closest('.project-modal-overlay')) {
        if (event.target.closest('.project-modal') && !event.target.closest('.modal-close')) return;
        sound.play('close');
        return;
      }
      // Pixel cat – also handled in component, dedup prevents double
      if (event.target.closest('.pixel-cat')) {
        sound.play('boop');
        return;
      }
    };
    document.addEventListener('pointerup', handleGlobalSound);
    document.addEventListener('touchend', handleGlobalSound, { passive: true });
    document.addEventListener('click', handleGlobalSound);
    return () => {
      document.removeEventListener('pointerup', handleGlobalSound);
      document.removeEventListener('touchend', handleGlobalSound);
      document.removeEventListener('click', handleGlobalSound);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <AmbientBackground />
        <Navbar />
        <main id="main" className="main-content" role="main">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/skills' element={<SkillsPage />} />
            <Route path='/contacts' element={<ContactsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
