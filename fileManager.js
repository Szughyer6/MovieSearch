const fs = require('fs');


const getMovieData = () => {
  return new Promise((resolve, reject) => {

    fs.readFile("movies.json", "utf-8", (err, data) => {
      if (err) {
        console.log("Something went wrong while reading the movie file!");
        console.log(err.message);
      } else {
        const movieData = JSON.parse(data);  // Convert string to json
        resolve(movieData);
      //  writeToJSON();   // we call this here because the readFile function is async
      }
    });
  });
  
}

const writeToFile = (data) => {
    fs.writeFile("movies.json", JSON.stringify(data), 'utf-8', (err) => {
      if (err) {
        console.log("Something went wrong while writing to the file!");
        console.log(err.message);
      }
      
    });
  }
  
  const UpdateFile = (newData) => {
    fs.appendFile("movies.json", JSON.stringify(newData), "utf-8", (err) => {
      if (err) {
        console.log("Something went wrong while updating the file!");
        console.log(err.message);
      } else {
        console.log("Your movies have been successfully updated!");
      }
    })
  }
  

  module.exports = {
    getMovieData,
    writeToFile,
    UpdateFile
  }