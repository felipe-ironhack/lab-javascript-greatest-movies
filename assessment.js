/*
Requirements
Create a function named findUnique that receives an array of words as an argument.
The function should returns the first found unique (non-repeating) word.

Sample Input/Output:
input: ['ana', 'ivan', 'jan', 'ana', 'jan']
output: 'ivan'

input: ['fizz', 'foo', 'bar', 'bazz', 'fizz', 'bazz']
output: 'foo'

input: ['apple', 'pear', 'strawberries', 'pineapple']
output: 'apple' 
*/

const names = ['ana', 'ivan', 'jan', 'ana', 'apple', 'jan']

function findUnique(wordsArr) {
  let unique

  for (let i = 0; i < wordsArr.length; i += 1) {
    if (wordsArr.indexOf(wordsArr[i]) === wordsArr.lastIndexOf(wordsArr[i])){
      unique = wordsArr[i]
      break
    }

  }

  return unique
}

console.log(findUnique(names))

/* 
Requirements
Create a function named maxTwoDimArray that receives a two-dimensional array (also called matrix) of numbers as an argument.
The function should return the greatest number from the given nested arrays.

Sample Input/Output:
Example 1:

const twoDimArr1 = [
  [1, 2, 3],
  [4, 3, 8],
  [5, 12, 9]
]
input: twoDimArr1
output: 12
*/

const twoDimArr1 = [
  [1, 2, 3],
  [4, 3, 8],
  [5, 12, 9]
]

function maxTwoDimArray(matrix) {
  let max = 0;

  for (let i = 0; i <  matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1){
      if (matrix[i][j] > max) {
        max = matrix[i][j]
      }
    }
  }

  return max

}

console.log(maxTwoDimArray(twoDimArr1))
