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
      <ScrollAnimation animateIn='fadeIn'>
        <About />
      </ScrollAnimation>
      <br/>
      <ScrollAnimation animateIn="fadeInLeft">
        <Projects />
      </ScrollAnimation>
      <br/>
      <ScrollAnimation animateIn="fadeInUp">
        <SocialMedia />
      </ScrollAnimation>
    </div>
  );
}

export default App;
