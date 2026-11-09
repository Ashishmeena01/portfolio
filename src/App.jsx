import Hero from './pages/Hero';
import Contributions from './pages/Contributions';
import About from './pages/About';
import Work from './pages/Work';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import SiteHeader from './components/SiteHeader';
import ScrollProgress from './components/ScrollProgress';
import useContributions from './hooks/useContributions';
import { projects, skills } from './data/portfolio';

function App() {
  const contributions = useContributions();

  const containerVariants = {
    init: { opacity: 0, filter: 'blur(10px)' },
    anime: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const letterVariants = {
    init: { y: 50, opacity: 0, filter: 'blur(10px)' },
    anime: { y: 0, opacity: 1, transition: { duration: 0.4 }, filter: 'blur(0px)' },
  };

  return (
    <div className="min-h-screen relative mx-auto max-w-5xl">
      <SiteHeader />
      <main className="w-full relative bg-gradient-to-b from-gray-50 to-5% to-white max-w-full">
        <ScrollProgress />
        <Hero containerVariants={containerVariants} letterVariants={letterVariants} />
        <Contributions contributions={contributions} />
        <About />
        <Work projects={projects} />
        <Skills skills={skills} />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
