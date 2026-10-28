const FACTS = [
    { icon: 'fa-solid fa-location-dot', label: 'Ohio' },
    { icon: 'fa-solid fa-briefcase', label: 'Software Engineer, JPMorgan Chase' },
    { icon: 'fa-solid fa-graduation-cap', label: 'Tech Elevator, Ohio State' },
];

const About = () => (
    <div className="container">
        <h2 className="section-title"><span className="section-kicker">01</span> About me</h2>
        <div className="about-card">
            <div className="about-text">
                <p>
                    I live in Ohio and work as a software engineer at JPMorgan Chase.
                    Coding has always been a passion of mine, and in 2018 I turned it into a
                    career by enrolling at Tech Elevator.
                </p>
                <p>
                    When I'm not coding, I spend as much time as I can with my family and loved
                    ones. You can also find me engrossed in the latest video game, or watching
                    my favorite sports: football and baseball.
                </p>
            </div>
            <ul className="facts">
                {FACTS.map(fact => (
                    <li key={fact.label}>
                        <i className={fact.icon} aria-hidden="true" />
                        <span>{fact.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default About;
