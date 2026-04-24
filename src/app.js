const express = require('express');
const cors = require('cors');
const app = express();

const universityRoutes = require('./modules/university/university.routes');
const rankingRoutes = require('./modules/ranking/ranking.routes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running...');
});

app.use('/api/universities', universityRoutes);
app.use('/api/rankings', rankingRoutes);

module.exports = app;