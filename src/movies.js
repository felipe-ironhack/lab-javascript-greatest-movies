// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

const getAllDirectors = moviesArray => moviesArray.map(movie => movie.director)

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

// Helper function because iteration 4 will also ask for Drama Movies
const findDrama = moviesArray => moviesArray.filter(movie => movie.genre.includes('Drama'))

const howManyMovies = moviesArray => {
  // We could have here also a one liner 
  // return findDrama(moviesArray.filter(movie => movie.director === 'Steven Spielberg')).length

  const stevenMovies = moviesArray.filter(movie => movie.director === 'Steven Spielberg')

  const drama = findDrama(stevenMovies)

  return drama.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
const scoresAverage = moviesArray => {
  if (!moviesArray.length) return 0

  const reduced = moviesArray.reduce((acc, movie) => {
    if (movie.score && typeof movie.score === 'number') {
      return acc + movie.score
    }
    return acc
  }, 0)

  const decimals = parseFloat((reduced/moviesArray.length).toFixed(2))

  return decimals
}

// Iteration 4: Drama movies - Get the average of Drama Movies
const dramaMoviesScore = moviesArray => scoresAverage(findDrama(moviesArray))

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
const orderByYear = moviesArray => {
  const copy = moviesArray.map(movie => movie)

  copy.sort((movieA, movieB) => {
    if (movieA.year === movieB.year) return movieA.title.localeCompare(movieB.title)

    return movieA.year - movieB.year
    
  })

  return copy

}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
const orderAlphabetically = moviesArray => {
  return moviesArray
          .map(movie => movie.title)
          .sort((a, b) => a.localeCompare(b))
          .slice(0, 20)

  // const justTitles = moviesArray.map(movie => movie.title)

  // justTitles.sort((a, b) => a.localeCompare(b))

  // return justTitles.slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
const turnHoursToMinutes = moviesArray => {
  const deepClone = JSON.parse(JSON.stringify(moviesArray))

  for (const movie of deepClone) {
    // Creating an array that separates the hours from the minutes
    const timeSplit = movie.duration.split(' ') // ['0h', '41min']

    // Gets the first element of the previous array
    // Gets the first index of that element 
    // Multiply it by 60 to get the hours converted to minutes 
    const hours = Number(timeSplit[0].slice(0, 1)) * 60

    let durationInMinutes = hours

    // Checks if we have a minutes element in the timeSplit array
    if (timeSplit[1]) {
      // Splits the timeSplit array so we can get the number of the string portion
      const minutes = timeSplit[1].split('m') // ['41', 'in']

      // Converts the first element to a number
      const minutesToNumber = Number(minutes[0])

      durationInMinutes += minutesToNumber
    }

    movie.duration = durationInMinutes
    
  }

  return deepClone
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
const bestYearAvg = moviesArray => {
  if (!moviesArray.length) return null;

	const moviesByYear = {};

	moviesArray.forEach(movie => {
    // .hasOwnProperty return true or false based of the value that you pass as an argument
    // I'm using to check if the property already exists,
    //  because I don't want to override it if already has some info saved inside
		if (!moviesByYear.hasOwnProperty(movie.year)) {
			moviesByYear[movie.year] = [];
		}

    // Push the movie to the correct property of the object
    // I'm using the square brackets here because it's possible to use variables
    // or have dynamic values
		moviesByYear[movie.year].push(movie);
	});

  // console.log(moviesByYear)

	const scoresByYear = [];

  // To iterate through the object we need to use the for...in loop
  // So I getting one key each time and saving as year
	for (const year in moviesByYear) {
		const yearScore = {
      // This will create a property on the object with the same name of the variable
      // And it will use the value of the variable
      // The same as => year: year,
			year,

      // I'm reusing the function to get the average passing the array that I have in each of the years
			score: scoresAverage(moviesByYear[year]),
		};
		scoresByYear.push(yearScore);
	}

  // console.log(scoresByYear)

  // The sort method changes the array in place
	scoresByYear.sort((a, b) => b.score - a.score);

  // console.log(scoresByYear)

  // Getting the first one because it should be the highest score
	const bestYear = scoresByYear[0];

	const winner = `The best year was ${bestYear.year} with an average score of ${bestYear.score}`;

	return winner;
}
