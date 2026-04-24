const cron = require('node-cron');
const { runPipeline } = require('../../pipelines/pipelineRunner');

function startScheduler() {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running pipeline...');
    await runPipeline();
  });
}

module.exports = { startScheduler };