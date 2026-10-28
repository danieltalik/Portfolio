import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

// Renders a <section> that fades in the first time it scrolls into view.
// `from` picks the direction: 'up', 'down', 'left' or 'right'.
const Reveal = ({ id, from = 'up', className = '', children }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={ref}
            className={`reveal reveal-from-${from} ${visible ? 'is-visible' : ''} ${className}`}
        >
            {children}
        </section>
    );
};

export default Reveal;
