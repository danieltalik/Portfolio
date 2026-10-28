import { useEffect, useState } from 'react';

const LINKS = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);

    // Give the bar a solid background once the page scrolls past the top.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
            <a href="#top" className="nav-logo" aria-label="Back to top">DT</a>
            <nav aria-label="Main">
                <ul className="nav-links">
                    {LINKS.map(link => (
                        <li key={link.href}><a href={link.href}>{link.label}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
