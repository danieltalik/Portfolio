import Josh from '../assets/josh.jpeg';
import Cats from '../assets/CatBox.jpg';
import Laptop from '../assets/laptop.jpg';

const PROJECTS = [
    {
        id: 1,
        title: 'Fulltack Java/React Website',
        description: 'A React App that Lets you Post Birthdays to an H2 Database',
        img: Josh,
        link: "https://github.com/danieltalik/Fullstack"

    },
    {
        id: 2,
        title: 'Cat Adoption Service',
        description: 'Tech Elevator capstone for cat adoption website.',
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