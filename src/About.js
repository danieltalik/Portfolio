import React, { Component } from 'react';
import TITLES from './data/titles';
import Me from './assets/Me.jpg';
import galaxy from './assets/galaxy.jpg';
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

            this.setState({ index: (this.state.index + 1) % TITLES.length, fade: true })
            this.fadeOut();
        }, 4000)
    }

    render() {
        const fadeVal = this.state.fade;
        const title = TITLES[this.state.index];
        return (
            <div>
                <div className='container'>
                    <img src={galaxy} alt='Milky Way' id='background' />
                    <div className='centered'>
                        <h1>Hello There!</h1>
                        <img src={Me} alt='Dan Talik' style={{ height: 300, width: 300, borderRadius: 150, borderColor: 'white', borderStyle: 'solid', borderWidth: 2 }} />
                        <h3>My name is Dan Talik.</h3>
                        <p className={fadeVal ? 'title-fade-in' : 'title-fade-out'}> I am {title}</p>
                    </div>
                </div>
                <p>I currently live in Columbus, Ohio and work as a software consultant at g2o.</p>
                <p>Coding is a passion of mine, and I decided to turn it into a career in 2018, when I enrolled at Tech Elevator.</p>
                <p>When I am not coding, I try to spend as much time with friends and loved ones as I can.</p>
                <p>You can also find me engrossed in the latest video game or watching my favorite sports, football and baseball.</p>
            </div>
        )
    }
}
export default About;