import React from 'react';
import About from './About';
import "animate.css/animate.min.css";
import Projects from './Projects';
import './App.css';
import ScrollAnimation from 'react-animate-on-scroll';
import SocialMedia from './SocialMedia';

function App() {
  return (
    <div>
      <ScrollAnimation animateIn='fadeInDown' className='page-section'>
        <About />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInLeft" className='page-section'>
        <Projects />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInRight" className='page-section'>
        <SocialMedia />
      </ScrollAnimation>
    </div>
  );
}

export default App;
