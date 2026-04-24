const ingestion = require('../modules/ingestion/ingestion.service');
const normalize = require('./normalization/normalizeScores');
const compute = require('./scoring/compositeScore');

async function runPipeline() {
  const raw = await ingestion.fetchAllSources();
  const normalized = normalize(raw);

  const map = {};

  for (const source in normalized) {
    normalized[source].forEach((u) => {
      if (!map[u.name]) {
        map[u.name] = { name: u.name, scores: {} };
      }
      map[u.name].scores[source] = u.score;
    });
  }

  return Object.values(map).map((u) => ({
    name: u.name,
    compositeScore: compute(u.scores),
  }));
}

module.exports = { runPipeline };