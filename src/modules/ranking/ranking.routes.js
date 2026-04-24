const express = require('express');
const router = express.Router();
const controller = require('./ranking.controller');

router.get('/', controller.getRankings);

module.exports = router;