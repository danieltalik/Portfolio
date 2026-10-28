import PROJECTS from './data/projects';

const Project = ({ project }) => {
    const { title, photo, description, tags, link } = project;

    return (
        <article className="project-card">
            <div className="project-media">
                <img
                    src={photo.url(800)}
                    srcSet={photo.srcSet([400, 800, 1200])}
                    sizes="(max-width: 700px) 100vw, 380px"
                    alt=""
                    loading="lazy"
                />
            </div>
            <div className="project-body">
                <h3>{title}</h3>
                <p>{description}</p>
                <ul className="tags">
                    {tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
            </div>
        </article>
    );
};

const Projects = () => (
    <div className="container">
        <h2 className="section-title"><span className="section-kicker">02</span> Side projects</h2>
        <div className="project-grid">
            {PROJECTS.map(project => <Project key={project.id} project={project} />)}
        </div>
    </div>
);

export default Projects;
