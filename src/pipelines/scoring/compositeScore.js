const weights = require('./weightConfig');

module.exports = (scores) => {
  let total = 0;
  let weightSum = 0;

  for (const key in weights) {
    if (scores[key]) {
      total += scores[key] * weights[key];
      weightSum += weights[key];
    }
  }

  return weightSum ? total / weightSum : null;
};