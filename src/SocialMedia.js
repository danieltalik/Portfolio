import React from 'react';
import SOCIAL from './data/social';
import './App.css';
const Social = props => {
    const { name, link, type } = props.social;

    return (
        <div className='socialSite'>
            <p>{name}</p>
            <a href={link} className={type}></a>
        </div>
    );
}

const SocialMedia = () => (
    <div>
        <h2>Follow Me on Social Media</h2>
        {
            SOCIAL.map(S => (
                <Social social={S}></Social>
            )
            )
        }
    </div>
)
export default SocialMedia;