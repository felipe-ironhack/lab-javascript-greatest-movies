// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
	return moviesArray.map(movie => movie.director)
}

const onlyDrama = moviesArray => moviesArray.filter(movie => movie.genre.includes('Drama'))

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
	return moviesArray.filter(movie => {
		return movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
	}).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
	if (moviesArray.length === 0) {
		return 0
	}
	const sum = moviesArray.reduce((total, current) => {
		// double checking if the scores exist before summing to the total
		if (typeof current.score === 'number') {
			return total + current.score
		}
		return total
	}, 0)

	const average = sum / moviesArray.length

	const decimals = Math.round(average * 100) / 100

	return decimals
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
	// reusing the previous function getting the array from the result of the filtering
	// return scoresAverage(onlyDrama(moviesArray))

	// const filteredDrama = moviesArray.filter(movie => movie.genre.includes('Drama'))
	// return scoresAverage(filteredDrama)

	const justDrama = onlyDrama(moviesArray)
	const average = scoresAverage(justDrama)
	return average
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
	const copy = [...moviesArray]

	copy.sort((a, b) => {
		if (a.year === b.year) {
			return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
		} else {
			return a.year - b.year
		}
	})

	return copy
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
	// chaining array methods
	// return moviesArray
	// 					.map(movie => movie.title)
	// 					.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
	// 					.slice(0, 20);

	const justTitle = moviesArray.map(movie => movie.title)
	justTitle.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
	const top20 = justTitle.slice(0, 20)

	return top20
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
	// Create a new array so the original array is preserved
	const changedDuration = moviesArray.map(movie => {
		// Create a variable to hold the changes to the duration
		let duration = 0
		// Split the duration that is a string using the whitespace as the separator
		/*
			Example of the result:
			['2h', '22min'] 
		*/
		// Loop through each element of that result array
		movie.duration.split(' ').forEach(timeFragment => {
			// If the element analyzed has the 'h' do the following:
			if (timeFragment.includes('h')) {
				// Split the element on the 'h', grab the first element, change to a Number and multiply by 60
				/*
					'2h' => ['2'] => '2' => 2 => 120 
				*/
				// Add to the duration
				duration += Number(timeFragment.split('h')[0]) * 60
			}
			// If the element has the 'min' do the following:
			else if (timeFragment.includes('min')){
				// Split the element on the 'min', grab the first element, change to a Number
				/*
					'22min' => ['22'] => '22' => 22 
				*/
				// Add to the duration
				duration += Number(timeFragment.split('min')[0])
			}
		})

		// Spread the previous properties of the object and updates the duration to the new calculated previously
		// return {...movie, duration: duration }
		return { ...movie, duration }
	})
	return changedDuration
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
	if (moviesArray.length === 0) {
		return null
	}

	// Creates an object to hold the values that needed
	/*
	 Example of how it should look at the end:
	 {
		1978: [{ score: 9.8 }, { score: 9.2 }, { score: 7 }],
		2000: [{ score: 9 }, { score: 8.5 }]
	 }
	*/
	const scoresByYear = {}
	/*
		- loop through the array that we receive
		- The year exists in the scoresByYear ?
			- If not: create as empty array
			- If yes: push the score to that array
	*/
	moviesArray.forEach(movie => {
		if ((movie.year in scoresByYear) === false){
			// If the year doesn't exists as a property create one as an empty array
			scoresByYear[movie.year] = []
		}
		// Add the score as an object into the array (Reuse the scoresAverage needs a property called score)
		scoresByYear[movie.year].push({ score: movie.score })
	})

	// Create an array to be sorted later
	/*
		Example of how it should look at the end:
		[
			{ year: 1978, average: 8.66 },
			{ year: 2000, average: 8.75 },
		] 
	*/
	const averageByYear = [] 
	/*
		- loop through the object
		- calculate all the averages
		- push to averageByYear { year, average }
	*/
	// The for...in loop can loop through an object and the variable will be the property
	// year = 1978 || 2000 in the previous example (look to scoresByYear)
	for (const year in scoresByYear) {
		const yearAverage = { 
			// Create a property using the year
			year: Number(year),
			// Grab the array value from the object and save the result of the reduce to a new property
			/*
				Example: 
				- For the 1978 property it should look like
				average: scoresAverage([{ score: 9.8 }, { score: 9.2 }, { score: 7 }])
			*/
			average: scoresAverage(scoresByYear[year])
		}
		// Push the object created inside of the for...in block to the array
		averageByYear.push(yearAverage)
	}

	// Sort the array so the highest average is the first one 
	averageByYear.sort((a, b) => {
		if (b.average === a.average) {
			// return the oldest if there's a tie in the averages
			return a.year - b.year
		}
		return b.average - a.average
	})
	
	// Grab the first one that would be the highest average on the array
	const bestYear = averageByYear[0]
	const message = `The best year was ${bestYear.year} with an average score of ${bestYear.average}`

	return message
}
