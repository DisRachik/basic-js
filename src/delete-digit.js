const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const str = '' + n;
  let res = 0;

  for (let i = 0; i < str.length; i += 1) {
    const modifiedStr = str.slice(0, i) + str.slice(i + 1);
    const modifiedNum = parseInt(modifiedStr, 10);
    res = Math.max(res, modifiedNum);
  }

  return res;
}

module.exports = {
  deleteDigit,
};
