// Free photos from Unsplash (https://unsplash.com/license).
// Served from Unsplash's image CDN, which resizes and converts them on the fly.

const unsplash = (photoId, width) =>
    `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=70`;

const photo = ({ id, author, profile, page }) => ({
    url: (width) => unsplash(id, width),
    srcSet: (widths) => widths.map(w => `${unsplash(id, w)} ${w}w`).join(', '),
    author,
    profile: `https://unsplash.com/${profile}?utm_source=danieltalik_portfolio&utm_medium=referral`,
    page: `https://unsplash.com/photos/${page}?utm_source=danieltalik_portfolio&utm_medium=referral`,
});

const PHOTOS = {
    hero: photo({
        id: 'photo-1519681393784-d120267933ba',
        author: 'Benjamin Voros',
        profile: '@vorosbenisop',
        page: 'snow-mountain-under-stars-phIFdC6lA4E',
    }),
    code: photo({
        id: 'photo-1555066931-4365d14bab8c',
        author: 'Arnold Francisca',
        profile: '@clark_fransa',
        page: 'turned-on-macbook-pro-wit-programming-codes-display-f77Bh3inUpE',
    }),
    cats: photo({
        id: 'photo-1514511745018-1a24bf434b6c',
        author: 'Aleesha Wood',
        profile: '@toxilicity',
        page: 'cats-sleeping-on-brown-couch-dm-ApvBj0nI',
    }),
    network: photo({
        id: 'photo-1544197150-b99a580bb7a8',
        author: 'Jordan Harrison',
        profile: '@jouwdan',
        page: 'blue-utp-cord-40XgDxBfYXM',
    }),
};

export default PHOTOS;
