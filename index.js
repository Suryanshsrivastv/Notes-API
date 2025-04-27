const express = require('express');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notesRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', notesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});