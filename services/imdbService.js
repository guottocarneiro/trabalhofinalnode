const fetch = require('node-fetch');

const imdbUrl = process.env.IMDB_URL;
const imdbKey = process.env.IMDB_API_KEY;
const top250MoviesPath = 'Top250Movies';

async function fetchAllMovies(limit) { 
    const response = await fetch(`${imdbUrl}/${top250MoviesPath}/${imdbKey}`);
    const result = await response.json();

    if(limit) {
        return result.items.slice(0, limit);
    }
    return result.items;
}
module.exports = {fetchAllMovies};