
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Fleet from './components/Fleet';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // Smooth scroll behavior for internal links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);
    return () => window.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Fleet />
        <Contact />
      </main>
    </div>
  );
}

export default App;
