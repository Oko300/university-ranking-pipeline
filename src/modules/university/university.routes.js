const express = require('express');
const router = express.Router();
const controller = require('./university.controller');

router.get('/', controller.getAllUniversities);
router.post('/', controller.createUniversity);

module.exports = router;