import { useCallback } from 'react';
import { Navbar, Footer } from './components/Layout';
import { Hero, Timeline, Projects, Presentations, Skills, Contact } from './components/Sections';

function App() {
  const handleNavigate = useCallback((sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Background with gradient fading to texture */}
      <div className="fixed inset-0 -z-10">
        {/* Base ocean gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #000428 0%, #004e92 30%, #006bb3 60%, transparent 100%)',
          }}
        />
        
        {/* Texture image layer (fades in from bottom) */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/texture.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 80%)',
          }}
        />
        
        {/* Fallback solid color if no texture */}
        <div 
          className="absolute inset-0 bg-ocean-deep"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, transparent 50%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 50%)',
            zIndex: -1,
          }}
        />
      </div>

      {/* Animated particles overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none -z-5 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 136, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 136, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main content */}
      <main>
        <Hero onNavigate={handleNavigate} />
        <Timeline />
        <Projects />
        <Presentations />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
