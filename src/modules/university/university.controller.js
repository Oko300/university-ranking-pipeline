const service = require('./university.service');

async function getAllUniversities(req, res) {
  try {
    const data = await service.getAllUniversities();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createUniversity(req, res) {
  try {
    const data = await service.createUniversity(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllUniversities, createUniversity };