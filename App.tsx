import React from 'react';
import Navigation from './components/Navigation.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Services from './components/Services.tsx';
import Gallery from './components/Gallery.tsx';
import AIStylist from './components/AIStylist.tsx';
import Contact from './components/Contact.tsx';

const App: React.FC = () => {
  return (
    <div className="bg-dark-bg min-h-screen text-white selection:bg-gold selection:text-black">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <AIStylist />
        <Gallery />
      </main>
      <Contact />
    </div>
  );
};

export default App;