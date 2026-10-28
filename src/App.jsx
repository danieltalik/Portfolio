import About from './About';
import Projects from './Projects';
import SocialMedia from './SocialMedia';
import Reveal from './Reveal';
import './App.css';

function App() {
  return (
    <main>
      <Reveal from='down' className='page-section'>
        <About />
      </Reveal>
      <Reveal from='left' className='page-section'>
        <Projects />
      </Reveal>
      <Reveal from='right' className='page-section'>
        <SocialMedia />
      </Reveal>
    </main>
  );
}

export default App;
