import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

// Fades its children in the first time they scroll into view.
// `from` picks the direction: 'up', 'down', 'left' or 'right'.
const Reveal = ({ from = 'up', className = '', children }) => {
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
        }, { threshold: 0.15 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className={`reveal reveal-from-${from} ${visible ? 'is-visible' : ''} ${className}`}
        >
            {children}
        </section>
    );
};

export default Reveal;
