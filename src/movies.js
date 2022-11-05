// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
	const onlyDirectors = moviesArray.map(movie => movie.director);

	return onlyDirectors;
}

function uniquifyDirector(directorsArray) {
  const uniqueDirector = [];

	for (let director of directorsArray) {
		if (uniqueDirector.indexOf(director) === -1) {
			uniqueDirector.push(director);
		}
	}

  return uniqueDirector
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function findDrama(moviesArray) {
	const dramaFilter = moviesArray.filter(movie => movie.genre.includes('Drama'));

	return dramaFilter;
}

function howManyMovies(moviesArray) {
	const filteredMovies = moviesArray.filter(movie => movie.director === 'Steven Spielberg');

	const dramaMovies = findDrama(filteredMovies);

	return dramaMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
	if (!moviesArray.length) return 0;

	const reducedScore = moviesArray.reduce((previousValue, movie) => {
		if (movie.score && typeof movie.score === 'number') {
			return previousValue + movie.score;
		}
		return previousValue;
	}, 0);

	const avgScore = reducedScore / moviesArray.length;

	const decimalsAvg = parseFloat(avgScore.toFixed(2));

	return decimalsAvg;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = findDrama(moviesArray)

  const avgScore = scoresAverage(dramaMovies)

  return avgScore

}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const sortedArray = moviesArray.slice()

  sortedArray.sort((movieA, movieB) => {
    if (movieA.year > movieB.year) {
      return 1
    }
    
    if (movieA.year < movieB.year) {
      return -1
    }

    if (movieA.year === movieB.year) {
      return movieA.title.localeCompare(movieB.title)
    }
  })

  return sortedArray
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesCopy = [...moviesArray]

  moviesCopy.sort((movieA, movieB) => movieA.title.localeCompare(movieB.title))

  const onlyTitles = moviesCopy.map(movie => movie.title)

  return onlyTitles.slice(0, 20)
  
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
	const moviesCopy = JSON.parse(JSON.stringify(moviesArray))

	for (const movie of moviesCopy) {
		const timeArray = movie.duration.split(' ')

		let minutes = Number(timeArray[0].slice(0, 1) * 60)

		if (timeArray[1]){
			const minutesCheck = Number(timeArray[1].split('m')[0])
			minutes += minutesCheck
		}

		movie.duration = minutes
	}

	return moviesCopy

}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
	if (!moviesArray.length) return null

	const moviesByYear = {}

	moviesArray.forEach(movie => {
		if (!moviesByYear.hasOwnProperty(movie.year)){
			moviesByYear[movie.year] = []
		} 
		moviesByYear[movie.year].push(movie)
	})

	const scoresByYear = []

	for (const year in moviesByYear) {
		const yearScore = {
			year,
			score: scoresAverage(moviesByYear[year])
		}
		scoresByYear.push(yearScore)
	}

	scoresByYear.sort((a, b) => b.score - a.score)

	const bestYear = scoresByYear[0]

	const winner = `The best year was ${bestYear.year} with an average score of ${bestYear.score}`

	return winner
}

