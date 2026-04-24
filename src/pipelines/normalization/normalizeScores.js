function normalize(data) {
  const result = {};

  for (const source in data) {
    result[source] = data[source].map((u) => ({
      name: u.name,
      score: u.score / 100,
    }));
  }

  return result;
}

module.exports = normalize;