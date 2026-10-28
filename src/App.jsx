import Nav from './Nav';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import SocialMedia from './SocialMedia';
import Footer from './Footer';
import Reveal from './Reveal';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal id="about" className="section">
          <About />
        </Reveal>
        <Reveal id="projects" className="section">
          <Projects />
        </Reveal>
        <Reveal id="contact" className="section">
          <SocialMedia />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

export default App;
