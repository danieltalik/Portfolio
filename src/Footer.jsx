import PHOTOS from './data/photos';

const Footer = () => (
    <footer className="footer">
        <p>© {new Date().getFullYear()} Daniel Talik</p>
        <p className="credits">
            Photos from Unsplash by{' '}
            {Object.values(PHOTOS).map((p, i, all) => (
                <span key={p.page}>
                    <a href={p.page} target="_blank" rel="noopener noreferrer">{p.author}</a>
                    {i < all.length - 1 ? ', ' : '.'}
                </span>
            ))}
        </p>
    </footer>
);

export default Footer;
