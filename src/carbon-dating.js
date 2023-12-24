const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  const parsNumber = typeof sampleActivity === 'string' && Number(sampleActivity);

  if (!isNaN(parsNumber) && Boolean(parsNumber) && parsNumber > 0 && parsNumber < MODERN_ACTIVITY) {
    const age = Math.log(MODERN_ACTIVITY / parsNumber) / (Math.LN2 / HALF_LIFE_PERIOD);
    return Math.ceil(age);
  }
  return false;
}

module.exports = {
  dateSample,
};
