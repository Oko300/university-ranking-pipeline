const repo = require('./university.repository');

async function getAllUniversities() {
  return repo.getAll();
}

async function createUniversity(data) {
  return repo.create(data.name, data.country);
}

module.exports = { getAllUniversities, createUniversity };