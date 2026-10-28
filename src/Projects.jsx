import PROJECTS from './data/projects';
import './Projects.css';

const Project = props => {
    const { title, img, description, link } = props.project;

    return (
        <div className="project">
            <h3>{title}</h3>
            <img src={img} alt={title} loading="lazy" className="project-img" />
            <p>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
        </div>
    );
}

const Projects = () => (
    <div>
        <h2>My Side Projects</h2>
        <div className="project-list">
            {
                PROJECTS.map(PROJECT => (
                    <Project key={PROJECT.id} project={PROJECT} />
                ))
            }
        </div>
    </div>
)
export default Projects;
