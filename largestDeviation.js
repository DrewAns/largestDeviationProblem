// largest deviation problem takes in an array of integers and an integer w
// the output should be the largest deviation for each window of length w within the given array
// if w is less than two or greater than or equal to the length of the given array, return -1
"use strict";

/**
 * recursively find where to place numToInsert by using a binary search
 * Input window: Array
 * Input numToInsert: int
 * Input lowerBound: int
 * Input upperBound: int
 * Output index to insert: int
*/
const getIndexToInsert = (window, numToInsert, lowerBound, upperBound) => {
  if(window[upperBound] < numToInsert){ return upperBound + 1; }
  else if (window[lowerBound] > numToInsert){ return lowerBound; }
  else if (upperBound - lowerBound <= 1){ return upperBound; }

  var pivot = Math.round((upperBound + lowerBound) / 2);
  lowerBound = window[pivot] < numToInsert ? pivot + 1: lowerBound;
  upperBound = window[pivot] > numToInsert ? pivot - 1 : upperBound;
  return (getIndexToInsert(window, numToInsert, lowerBound, upperBound));
}

/**
 * get index to insert and insert numToInsert at that index
 * Input window: Array
 * Input numToInsert: int
 * Output null
*/
const binaryInsert = (window, numToInsert) => {
  if (!window.length) {
    window.push(numToInsert);
  } else {
    var index = getIndexToInsert(window, numToInsert, 0, window.length - 1);
    window.splice(index, 0, numToInsert);
  }
  return;
}

/**
 * recursively find where to remove numToRemove from window by using a binary search
 * Input window: Array
 * Input numToRemove: int
 * Input lowerBound: int
 * Input upperBound: int
 * Output index to remove: int
*/
const getIndexToRemove = (window, numToRemove, lowerBound, upperBound) => {
  var pivot = Math.round((upperBound + lowerBound) / 2);
  if(window[pivot] === numToRemove){
    return pivot
  }

  lowerBound = window[pivot] < numToRemove ? pivot + 1 : lowerBound;
  upperBound = window[pivot] > numToRemove ? pivot - 1 : upperBound;
  return (getIndexToRemove(window, numToRemove, lowerBound, upperBound));
}

/**
 * get index to remove and remove numToRemove from window
 * Input window: Array
 * Input numToInsert: int
 * Output null
*/
const binaryRemove = (window, numToRemove) => {
  var index = getIndexToRemove(window, numToRemove, 0, window.length - 1)
  window.splice(index, 1)
  return
}

/**
 * find largest deviation and return
 * Input window: Array
 * Input numToInsert: int
 * Output deviation: int
*/
const getLargestDeviation = (intList, w) => {
  if(w < 2 || w >= intList.length){ return -1 }

  const window = []
  for(var i = 0; i < w; i++){
    binaryInsert(window, intList[i])
  }
  var deviation = window[w - 1] - window[0]

  for(i = w; i < intList.length; i++){
    binaryRemove(window, intList[i - w]);
    binaryInsert(window, intList[i]);
    var tempDeviation = window[w - 1] - window[0];
    if(tempDeviation > deviation){
      deviation = tempDeviation;
    }
  }
  return deviation;
}

largest = getLargestDeviation([6, 0, 2, 8], 3)
console.log(largest)
