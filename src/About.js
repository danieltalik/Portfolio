import React, { Component } from 'react';
import TITLES from './data/titles';
import './About.css';

class About extends Component {
    state = { index: 0, fade: true }

    componentDidMount() {
        this.setState({ fade: false });
        this.iterateTitles();

    }

    fadeOut = () => {
        setTimeout(() => {
            this.setState({ fade: false })
        }, 2000)
    }

    iterateTitles = () => {
        setInterval(() => {
         
            this.setState({ index: (this.state.index + 1) % TITLES.length, fade: true})
            this.fadeOut();
        }, 4000)
    }

    render() {
        const fadeVal = this.state.fade;
        const title = TITLES[this.state.index];
        return (
            <div>
                <h1>Hello There!</h1>
                
                <h3>My name is Dan Talik.</h3>
                <p className={fadeVal ? 'title-fade-in' : 'title-fade-out'}> I am {title}</p>
            </div>
        )
    }
}
export default About;