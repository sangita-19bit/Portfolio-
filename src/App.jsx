import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import ScrollProgress from './components/ui/ScrollProgress';
import './App.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <div
        className={`app-shell ${loaded ? 'app-shell--visible' : ''}`}
        aria-hidden={!loaded}
      >
        <ScrollProgress />
        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
