const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  return arr.reduce((acc, el, i, array) => {
    switch (el) {
      case '--discard-next':
        return acc;
      case '--discard-prev':
        if (i > 0 && array[i - 2] !== '--discard-next') {
          acc.pop();
        }
        return acc;
      case '--double-next':
        if (i < array.length - 1) {
          acc.push(array[i + 1]);
        }
        return acc;
      case '--double-prev':
        if (i > 0 && array[i - 2] !== '--discard-next') {
          acc.push(array[i - 1]);
        }
        return acc;
      default:
        if (array[i - 1] !== '--discard-next') {
          acc.push(el);
        }
        return acc;
    }
  }, []);
}

module.exports = {
  transform,
};
