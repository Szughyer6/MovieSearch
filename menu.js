const readLine = require('readline');
const file = require("./fileManager.js");
const requests = require("./requests.js");

const r1 = readLine.createInterface({input: process.stdin, output: process.stdout,});


let movies;

const printMovie = (movie) => {
  console.log(movie.name);
  console.log("Year of Release: " + movie.year + "\nGenre: " + movie.genre + "\nDirector: " + movie.director + "\nRating: " + movie.rating);
}

const displayMovies = (Movies = [], onlySelected = false) => {
  
  let selectedMovies;
  if(onlySelected)
    selectedMovies = Movies;
  else selectedMovies = movies;

  if(selectedMovies.length < 1){
    return console.log("No movies to display."); }

  for(let i = 0; i < selectedMovies.length; i++){
    console.log((i+1) + ") ");
    printMovie(selectedMovies[i]);
    console.log("\n***********************\n");
}
   
}



const addMovie = () => {
    let movieName = "";
    let year;
    let genre;
    let rating;
    let director;

  const getName = () => {
    r1.question("Movie Title: ", answer => {
      movieName = answer;
      getYear();
    });
  };

  const getYear = () => {
    r1.question("Year of Release: ", answer => {
        year = parseInt(answer);
        getGenre();    
    });
  };

  const getGenre = () => {
    r1.question("Genre(s): ", answer => {
      genre = answer;
      getDirector();
    });
  };

  const getDirector = () => {
    r1.question("Movie Director: ", answer => {
      director = answer;
      getRating();
    });
  };

  const getRating = () => {
    r1.question("Movie Rating(1 - 10): ", answer => {
      if(isNaN(answer) || answer < 1 || answer > 10){
        console.log("Invalid Input.");
        return getRating();
      }
      rating = parseFloat(answer);
      
      let movie = {
        name: movieName,
        year: year,
        genre: genre,
        director: director,
        rating: rating
      };

      movies.push(movie);
      file.writeToFile(movies);
      return getAction();

      /*file.getMovieData()
        .then(movies => {  
          movies.push(movie);
          file.writeToFile(movies);
          return getAction();
        });*/
    });
  };

  getName();
}


const updateMovie = () => {
    displayMovies();

    const update = (movie) => {
      let newMovie = movie;
        r1.question("What would you like to update: \n1) Movie Name\n2) Release Year \n3) Genre(s) \n4) Director \n5) Rating\n **To go back to main menu enter 0. \n", answer => {
            switch(answer){
                case '1': r1.question("What is the updated title of the movie? ", answer => {
                    newMovie.name = answer;
                    confirm();
                }); break;
                case '2': r1.question("What is the updated year of release of the movie? ", answer => {
                    newMovie.year = answer;
                    confirm();
                }); break;
                case '3': r1.question("What is the updated genre(s) of the movie? ", answer => {
                  newMovie.genre = answer;
                  confirm();
                }); break;
                case '4': r1.question("What is the updated director of the movie? ", answer => {
                  newMovie.director = answer;
                  confirm();
                }); break;
                case '5': r1.question("What is the updated rating of the movie? ", answer => {
                  newMovie.rating = answer;
                  confirm();
                }); break;
                case '0' : return getAction();
                default: console.log("Please choose one of the options above. "); update(movie);
            }      
        });
        
        const confirm = () => {
          printMovie(newMovie);
         r1.question("\nIs this correct? (y/n)", answer => {
          if(answer[0].toLowerCase() == 'y'){
            movie = newMovie;
            file.writeToFile(movies);
            console.log("Movie successfully updated!");
            return getAction();
          }
          else updateMovie(movie);
        });
        }
        
    }

    const getMovie = () => {
    console.log("MOVIESSS" + movies.length);
    r1.question("Which movie would you like to update? Please enter number of movie. \n **To go back to main menu enter 0. \n", answer => {
      if(answer == 0) return getAction();
      if(answer < 1 || answer > movies.length){
        console.log("Invalid Input.");
        return getMovie();
      } 
        update(movies[answer - 1]);
    });
  }

  
  getMovie();

}


const deleteMovie = () => {
    displayMovies();
    let index = 0;

    const delMovie = () => {
    r1.question("Which movie would you like to delete? Please enter number of movie. \n**To go back to main menu enter 0. \n", answer => {
      if(answer == 0) return getAction();
      if(answer < 1 || answer > movies.length){
        console.log("Invalid Input.");
        return delMovie();
      } 
      index = answer - 1;
      printMovie(movies[index]);
       r1.question("Are you sure you want to delete this movie? (y/n)", answer => {
        if(answer[0].toLowerCase() == "y"){
          movies.splice(index, 1);
          file.writeToFile(movies);
          console.log("Movie has been deleted successfully.");
          return getAction();
        } else delMovie();
       });
    });
  }

  delMovie();
}

const searchMovies = () => {
      r1.question(
        `How would you like to search your movies? 
1) By Title
2) By Director
3) By Genre 
**To go back to main menu enter 0. \n`, answer => {
          let filteredMovies;
          switch(answer){
            case '0': return getAction();
            case '1': r1.question("Enter Title: ", answer => {
              filteredMovies = movies.filter(movie => {
                return movie.name.toLowerCase().includes(answer.toLowerCase().trim());
              });             
               displayMovies(filteredMovies, true);
               return getAction();
            }); break;

            case '2': r1.question("Enter Director: ", answer => {
               filteredMovies = movies.filter(movie => {
                return movie.director.toLowerCase().includes(answer.toLowerCase().trim());
              });                    
              displayMovies(filteredMovies, true);       
              return getAction();
            }); break;

            case '3': r1.question("Enter Genre: ", answer => {
               filteredMovies = movies.filter(movie => {
                return movie.genre.toLowerCase().includes(answer.toLowerCase().trim());
              });                      
              displayMovies(filteredMovies, true);            
              return getAction();
            }); break;
            default: console.log("Please choose one of the previous options. "); searchMovies();
          }
          

    return getAction();
    });
    
}

const filterMovies = () => {
      r1.question(
        `How would you like to filter your movies? 
1) By Genre
2) By Release Year
3) By Rating 
**To go back to main menu enter 0. \n`, answer => {
          switch(answer){
            case '0': return getAction();
            case '1': r1.question("Enter Genre: ", answer => {
              let filteredMovies = movies.filter(movie => {
                return movie.name.toLowerCase() == answer.toLowerCase().trim();
              });
              displayMovies(filteredMovies, true);
              return getAction();
            }); break;
    
            case '2': r1.question("Enter Release Year: ", answer => {
              let filteredMovies = movies.filter(movie => {
                return movie.year == answer;
              });
              displayMovies(filteredMovies, true);
              return getAction();
            }); break;
    
            case '3': r1.question("Enter Rating(1 - 10): ", answer => {
              let filteredMovies = movies.filter(movie => {
                return parseInt(movie.rating)  == parseInt(answer);
              });
              displayMovies(filteredMovies, true);           
              return getAction();
            }); break;
            default: console.log("Please choose one of the previous options. "); return filterMovies();
          }
      });
  
}


const sortTitle = (movie1, movie2) =>{

  if(movie1.name < movie2.name) return -1;
  else if(movie1.name > movie2.name) return 1;
  else return 0;

}

const sortYear = (movie1, movie2) =>{

  if(movie1.year > movie2.year) return -1;
  else if(movie1.year < movie2.year) return 1;
  else return 0;

}

const sortRating = (movie1, movie2) =>{

  if(movie1.rating > movie2.rating) return -1;
  else if(movie1.rating < movie2.rating) return 1;
  else return 0;

}

const sortDirector = (movie1, movie2) =>{

  if(movie1.director < movie2.director) return -1;
  else if(movie1.director > movie2.director) return 1;
  else return 0;

}

const sortMovies = () => {
  let tempMovies = movies;
  r1.question(
    `How would you like to sort your movies? 
1) By Title
2) By Release Year
3) By Rating 
4) By Director
5) Return to original unsorted data.
**To go back to main menu enter 0. \n`, answer => {

  switch(answer){
    case '0': return getAction();
    case '1': displayMovies(tempMovies.sort(sortTitle), true); return getAction(); break;
    case '2': displayMovies(tempMovies.sort(sortYear), true); return getAction(); break;
    case '3': displayMovies(tempMovies.sort(sortRating), true); return getAction(); break;
    case '4': displayMovies(tempMovies.sort(sortDirector), true); return getAction(); break;
    case '5': 
    file.getMovieData()
    .then(data => {   
      movies = data;
      displayMovies(); 
      return getAction();
    });  break;
    default: console.log("Please choose one of the previous options. "); return filterMovies();
  }

});


}

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>>><>>>>>>

const main = () => {
  file.getMovieData()
  .then(data => {   
    movies = data;
    return getAction();
  });
}



const intro = "\nSelect an action:\n1) Display Movies \n2) Add New Movie \n3) Update Movie Details \n4) Delete Movie \n5) Search Movies \n6) Filter Movies \n7) Display Sorted Movies \n8) Exit\n***************************\nWhat's your choice? ";

console.log("***************************\n Welcome to JS Movie Search App\n***************************");

const uploadMovies = () => {

  r1.question("Would you like to: \n1) Use movies saved from previous session \n2) Reset Data \n", answer => {
    if(answer == 2){
      requests.getMovies();
    } 
    else if(answer != 1){
      console.log("Invalid Input.");
      return uploadMovies();
    }

    return main();
  });
}

const getAction = () => {

  r1.question(intro, answer => {

    switch(parseInt(answer)){
    case 1:
      displayMovies();
      break;
    case 2:
      addMovie();
      break;
    case 3:
      updateMovie();
      break;
    case 4:
      deleteMovie();
      break;
    case 5:
      searchMovies();
      break;
    case 6:
      filterMovies();
      break;
    case 7:
      sortMovies(); 
      break;
    case 8:
      console.log("GoodBye!");
      r1.close(); process.exit(); break;
    default:
      console.log("Please enter number from 1-8.")
      getAction();
    } getAction();
  });


}


uploadMovies();



module.exports = {
  getAction

}