const { runPipeline } = require('../../pipelines/pipelineRunner');

async function getRankings(req, res) {
  try {
    const results = await runPipeline();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getRankings };