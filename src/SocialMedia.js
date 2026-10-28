import React from 'react';
import SOCIAL from './data/social';
import './App.css';

const Social = props => {
    const { name, link, type } = props.social;
    const isEmail = link.startsWith('mailto:');

    return (
        <div className='socialSite'>
            <p>{name}</p>
            <a
                href={link}
                className={type}
                aria-label={name}
                {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            ></a>
        </div>
    );
}

const SocialMedia = () => (
    <div>
        <h2>Follow Me on Social Media</h2>
        {
            SOCIAL.map(S => (
                <Social key={S.name} social={S} />
            ))
        }
    </div>
)
export default SocialMedia;
