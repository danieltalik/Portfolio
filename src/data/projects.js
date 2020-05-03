import Josh from '../assets/josh.jpeg';
import Cats from '../assets/CatBox.jpg';
import Laptop from '../assets/laptop.jpg';

const PROJECTS = [
    {
        id: 1,
        title: 'Musician Website',
        description: 'A Spring-Boot MVC website for a musician friend.',
        img: Josh,
        link: "https://github.com/danieltalik/JoshSite"

    },
    {
        id: 2,
        title: 'Cat Adoption Service',
        description: 'Cat adoption website for Tech Elevator for capstone.',
        img: Cats,
        link: "https://github.com/danieltalik/CatStone"

    },
    {
        id: 3,
        title: 'RESTful APIs',
        description: 'Learner project for connecting and consuming APIs.',
        img: Laptop,
        link:"https://github.com/danieltalik/RESTpractice"

    }
]
export default PROJECTS;