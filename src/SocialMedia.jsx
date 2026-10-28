import SOCIAL from './data/social';

const SocialMedia = () => (
    <div className="container contact">
        <h2 className="section-title"><span className="section-kicker">03</span> Get in touch</h2>
        <p className="contact-lede">
            Whether it's about work, a project, or just to say hi, my inbox is open.
        </p>
        <a href="mailto:danieltalik@gmail.com" className="btn btn-primary">Say hello</a>
        <ul className="social-list">
            {SOCIAL.map(s => {
                const isEmail = s.link.startsWith('mailto:');
                return (
                    <li key={s.name}>
                        <a
                            href={s.link}
                            className="social-icon"
                            aria-label={s.name}
                            title={s.name}
                            {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                            <i className={s.icon} aria-hidden="true" />
                        </a>
                    </li>
                );
            })}
        </ul>
    </div>
);

export default SocialMedia;
