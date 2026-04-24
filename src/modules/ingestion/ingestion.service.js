const qs = require('./sources/qs.api');
const times = require('./sources/times.api');
const shanghai = require('./sources/shanghai.api');

async function fetchAllSources() {
  const [qsData, timesData, shanghaiData] = await Promise.all([
    qs(),
    times(),
    shanghai(),
  ]);

  return { qs: qsData, times: timesData, shanghai: shanghaiData };
}

module.exports = { fetchAllSources };