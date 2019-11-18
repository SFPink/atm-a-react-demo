// Accumulate the values in a object
function accumalateObjectValues(obj) {
  return Object.values(obj).reduce((i, j) => i + j);
}

// Find average of values in an object
function objectAverage(object) {
  const sum = accumalateObjectValues(object);
  const avg = sum / Object.keys(object).length;
  return avg;
}

// Using standard deviation find the variation in an object
function ojectStdDeviation(object) {
  // find object average
  const avg = objectAverage(object);

  // find the differnce squared for each value in object i.e (value - average) squared
  const differenceSq = Object.values(object).map(value => {
    return (value - avg) ** 2;
  });

  // find the average of the difference squared values
  const avgSquareDiff = objectAverage(differenceSq);

  // finally square root the avg squared difference
  const stdDev = Math.sqrt(avgSquareDiff);

  return stdDev;
}

// Sort by either max notes or min notes
function sortByNotesCount(arr, desc = false) {
  arr.sort((a, b) => {
    const aStock = accumalateObjectValues(a);
    const bStock = accumalateObjectValues(b);

    if (desc === true) return bStock - aStock;

    return aStock - bStock;
  });
}

// Evenly distribute notes
function sortBySimilarNotes(arr) {
  arr.sort((a, b) => {
    const aKeys = Object.keys(a).length;
    const bKeys = Object.keys(b).length;
    const aDeviation = ojectStdDeviation(a);
    const bDeviation = ojectStdDeviation(b);

    // First sort by objects with the most keys
    if (bKeys > aKeys) return 1;
    if (bKeys < aKeys) return -1;

    // Second sort by standard deivation to sort by variation
    if (bDeviation > aDeviation) return -1;
    if (bDeviation < aDeviation) return 1;
  });
}

// sortType = even (default), min, max
// Find all possible combinations of notes that used to make up the total
// TODO:: It would be more efficient to work out combination based on stock
export function findCombinations(array, amount, sortType) {
  const combinations = [];

  // Function to find all combinations
  function recursive(i, temp) {
    // Calc current total
    const total = temp.reduce((a, b) => a + b, 0);

    // Once the total is met exactly push to result
    if (total === amount) {
      combinations.push(temp);
    }

    // Return if total if equal to or over amount or if not more entries exist in array
    if (total >= amount || i >= array.length) {
      return;
    }

    recursive(i, temp.concat(array[i]));
    recursive(i + 1, temp);
  }

  // Start
  recursive(0, []);

  // Parse combinations into groups
  const result = combinations.map(group => {
    const count = {};

    // Count duplicates in array to find notes required
    group.forEach(value => {
      count[value] = (count[value] || 0) + 1;
    });

    return count;
  });

  switch (sortType) {
    case 'max':
      sortByNotesCount(result, true);
      break;
    case 'min':
      sortByNotesCount(result);
      break;
    default:
      sortBySimilarNotes(result);
      break;
  }

  return result;
}

// Find best combination match for withdrawl
export function withdraw(inventory, amount, type) {
  // Retrieve possible combinations
  const allCombinations = findCombinations(
    // Only pass in the notes available
    inventory.map(i => i.value),
    // Ensure amount is a number
    parseInt(amount, 10),
    type
  );

  const filteredByStock = allCombinations.filter(combo => {
    let hasStock = true;
    Object.keys(combo).forEach(key => {
      const note = inventory.find(item => {
        return item.value == key;
      });
      if (note.stock < combo[key]) hasStock = false;
    });
    return hasStock;
  });

  // Something has failed, no combinations found
  if (filteredByStock.length === 0) return false;

  // Select first combination as it should be the best first
  const toDispense = Object.keys(filteredByStock[0]).map(key => {
    return { stock: filteredByStock[0][key], value: parseInt(key, 10) };
  });

  // Put notes in order of value
  toDispense.sort((a, b) => b.value - a.value);

  return toDispense;
}

// Return best match withdrawal combination and udpate inventory
export function doWithdrawal(inventory, amount, type) {
  const toDispense = withdraw(inventory, amount, type);

  // Update cash machine inventory
  const updatedInventory = inventory.map(({ stock, value }) => {
    // Search for the matching note
    const updateWith = toDispense.find(item => item.value === value);
    // Update stock levels
    const updatedStock = stock - (updateWith ? updateWith.stock : 0);
    return { stock: updatedStock, value };
  });

  return {
    withdrawal: toDispense,
    inventory: updatedInventory
  };
}

export default {
  withdraw,
  doWithdrawal,
  findCombinations
};
