const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// CRUD routes
app.post('/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/items', (req, res) => res.json(items));

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === +req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === +req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  item.name = req.body.name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const idx = items.findIndex(i => i.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  res.json(items.splice(idx, 1)[0]);
});

// Export `app` for Vercel — no app.listen()
module.exports = app;
