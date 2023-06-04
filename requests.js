const { resolve } = require("path");
const file = require("./fileManager.js");
const apiKey = '9549d04e';
const url = 'https://www.omdbapi.com/?t=';

const getMovies = () => { 

  fetch('https://dummyapi.online/api/movies')
    .then(response => response.json())
    .then( async data => {
      const movies = data;
      file.writeToFile(await Promise.all(
        movies.map(async (movie) => {
        let info = await formatMovie(movie.movie.toLowerCase(), movie.rating);
        return info;
    })));
    })
    .catch(error => {
      console.error("Failure to fetch API: " + error);
    });
}


const formatMovie = (title, rating) => {
    title = title.replace(" ", "+");
  return new Promise((resolve, reject) => {
    fetch(`${url}${title}&apikey=${apiKey}`, { method: 'GET' })
    .then(async response => {const movie = await response.json()
 
      let formatedData = {
        name: movie.Title,
        year: movie.Year,
        genre: movie.Genre,
        director: movie.Director,
        rating: rating
      }
      resolve(formatedData);
    })
    .catch(error => {
      reject(error);
      console.error("Failure to fetch API: " + error);
    });
  });
}

module.exports = {
  getMovies
}