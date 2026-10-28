import { useEffect, useState } from 'react';
import TITLES from './data/titles';
import PHOTOS from './data/photos';
import Me from './assets/MeUpdated.jpg';

const SHOW_MS = 3200;
const FADE_MS = 400;

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    // Fade the current title out, swap it, then fade the next one in.
    useEffect(() => {
        let swapTimer;
        const interval = setInterval(() => {
            setVisible(false);
            swapTimer = setTimeout(() => {
                setIndex(prev => (prev + 1) % TITLES.length);
                setVisible(true);
            }, FADE_MS);
        }, SHOW_MS);

        return () => {
            clearInterval(interval);
            clearTimeout(swapTimer);
        };
    }, []);

    return (
        <section className="hero" id="top">
            <img
                className="hero-bg"
                src={PHOTOS.hero.url(1600)}
                srcSet={PHOTOS.hero.srcSet([800, 1200, 1600, 2400])}
                sizes="100vw"
                alt=""
                fetchPriority="high"
            />
            <div className="hero-overlay" />

            <div className="hero-content">
                <div className="hero-photo-ring">
                    <img src={Me} alt="Daniel Talik" className="hero-photo" />
                </div>
                <p className="eyebrow">Hi, I'm</p>
                <h1 className="hero-name">Daniel Talik</h1>
                <p className="hero-title" aria-live="polite">
                    <span className={visible ? 'title-in' : 'title-out'}>{TITLES[index]}</span>
                </p>
                <div className="hero-actions">
                    <a href="#projects" className="btn btn-primary">View my work</a>
                    <a href="#contact" className="btn btn-ghost">Get in touch</a>
                </div>
            </div>

            <a href="#about" className="scroll-cue" aria-label="Scroll to About">
                <i className="fa-solid fa-chevron-down" aria-hidden="true" />
            </a>
        </section>
    );
};

export default Hero;
