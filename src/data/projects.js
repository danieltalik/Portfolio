import PHOTOS from './photos';

const PROJECTS = [
    {
        id: 1,
        title: 'Fullstack Java/React Website',
        description: 'A React app that lets you post birthdays to an H2 database through a Java backend.',
        tags: ['Java', 'React', 'H2'],
        photo: PHOTOS.code,
        link: "https://github.com/danieltalik/Fullstack"
    },
    {
        id: 2,
        title: 'Cat Adoption Service',
        description: 'Tech Elevator capstone: a website for browsing and adopting cats.',
        tags: ['Capstone', 'Team project'],
        photo: PHOTOS.cats,
        link: "https://github.com/danieltalik/CatStone"
    },
    {
        id: 3,
        title: 'RESTful APIs',
        description: 'A learning project for connecting to and consuming REST APIs.',
        tags: ['REST', 'APIs'],
        photo: PHOTOS.network,
        link: "https://github.com/danieltalik/RESTpractice"
    }
]
export default PROJECTS;
