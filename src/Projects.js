import React from 'react';
import PROJECTS from './data/projects';
import './Projects.css';

const Project = props => {
    const { id, title, img, description, link } = props.project;

    return (
        <div className="project">
            <h3>{title}</h3>
            <img src={img} alt='project' style={{width:300, height:300, borderRadius: 15}}></img>
            <p>{description}</p>
            <a href={link}>{link}</a>
        </div>
    );
}

const Projects = () => (
    <div>
        <h2>My Side Projects</h2>
        <div>
            {
                PROJECTS.map(PROJECT => (
                    <Project key={PROJECT.id} project={PROJECT} />
                ))
            }
        </div>
    </div>
)
export default Projects;