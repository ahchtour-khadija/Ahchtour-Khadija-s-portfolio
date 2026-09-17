import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
    // Centralized sound handling: one delegated listener covers every
    // interactive button/control. Mobile browsers require audio to be
    // triggered from pointerup/touchend (real gesture); click is fallback.
    // Dedup inside sound.play (350ms) prevents double from touch+click.
    const isDisabled = (el) => {
      const ctrl = el.closest('button, [role="button"]');
      if (ctrl) {
        if (ctrl.disabled) return true;
        if (ctrl.getAttribute('aria-disabled') === 'true') return true;
        if (ctrl.hasAttribute('disabled')) return true;
      }
      const btn = el.closest('.btn');
      if (btn) {
        if (btn.hasAttribute('disabled')) return true;
        if (btn.getAttribute('aria-disabled') === 'true') return true;
      }
      return false;
    };

    const handleGlobalSound = (event) => {
      if (!(event.target instanceof Element)) return;
      const t = event.target;

      if (isDisabled(t)) return;

      // 1. Pixel cat mascot – playful boop
      if (t.closest('.pixel-cat')) {
        sound.play('boop');
        return;
      }

      // 2. Close sounds – modal X, toast dismiss, overlay backdrop
      if (t.closest('.modal-close') || t.closest('.toast-close')) {
        sound.play('close');
        return;
      }
      if (t.closest('.project-modal-overlay')) {
        // Only backdrop itself, not clicks inside the modal
        if (!t.closest('.project-modal')) {
          sound.play('close');
          return;
        }
        if (t.closest('.project-modal') && !t.closest('.modal-close')) return;
        sound.play('close');
        return;
      }

      // 3. Project open – card or "View Project" button (happy open sound)
      // Exclude the dedicated open logic dedup; playing here is the single source.
      if (t.closest('.project-view-btn') || t.closest('.project-card')) {
        sound.play('open');
        return;
      }

      // 4. Filter chips – generic click
      if (t.closest('.filter-chip')) {
        sound.play('click');
        return;
      }

      // 5. Navigation – soft nav tick
      if (t.closest('.navbar-link') || t.closest('.brand')) {
        sound.play('nav');
        return;
      }
      if (t.closest('.navbar-toggle')) {
        sound.play('nav');
        return;
      }

      // 6. Sound toggle – let the component decide (only plays when enabling)
      // Exclude from generic click to preserve the enable-only behavior
      if (t.closest('.sound-toggle')) return;

      // 7. Generic interactive buttons/controls – every <button>, .btn, [role=button]
      // This covers: hero buttons, filter buttons, modal action buttons,
      // contact form Send Email/WhatsApp, mobile menu, close buttons, etc.
      // Must not delay navigation/form – sound is fire-and-forget, never prevents default.
      const genericBtn = t.closest('button, .btn, [role="button"]');
      if (genericBtn) {
        sound.play('click');
        return;
      }

      // 8. Links styled as buttons that are not .btn but still interactive
      // (e.g., Button with as="a" already has .btn, so covered above)
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
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;
