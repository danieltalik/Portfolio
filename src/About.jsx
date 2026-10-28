import { useEffect, useState } from 'react';
import TITLES from './data/titles';
import Me from './assets/MeUpdated.jpg';
import banner from './assets/banner.jpg';
import './About.css';

const About = () => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Every 4s show the next title, fade it in, then fade it out after 2s.
    useEffect(() => {
        let fadeTimer;
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % TITLES.length);
            setFade(true);
            fadeTimer = setTimeout(() => setFade(false), 2000);
        }, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(fadeTimer);
        };
    }, []);

    return (
        <div>
            <div className='container'>
                <img src={banner} alt='' id='background' />
                <div>
                    <h1 id='title'>Daniel Talik</h1>
                    <img src={Me} alt='Dan Talik' id='danpic' />
                    <h2 className={fade ? 'title-fade-in' : 'title-fade-out'} id='titles'>{TITLES[index]}</h2>
                </div>
            </div>
            <div className='container' id='intro'>
                <p>I currently live in Ohio and work as a software engineer at JPMorgan Chase.</p>
                <p>Coding is a passion of mine, and I decided to turn it into a career in 2018, when I enrolled at Tech Elevator.</p>
                <p>When I am not coding, I try to spend as much time with my family and loved ones.</p>
                <p>You can also find me engrossed in the latest video game or watching my favorite sports, football and baseball.</p>
            </div>
        </div>
    );
};

export default About;
