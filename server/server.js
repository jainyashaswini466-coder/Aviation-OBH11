import express from 'express';
import flights from './data/flights.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get('/api/flights', (req, res) => {
  res.json(flights);
});

app.get('/api/flights/:id', (req, res) => {
  const flight = flights.find((flight) => flight.id === req.params.id);
  if (!flight) return res.status(404).json({ message: 'Flight not found.' });
  res.json(flight);
});

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.listen(PORT, () => console.log(`Flight API running on http://localhost:${PORT}`));
