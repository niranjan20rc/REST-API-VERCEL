// api/index.js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/get', (req, res) => res.send('GET'));
app.post('/post', (req, res) => res.send('POST'));
app.put('/put', (req, res) => res.send('PUT'));
app.delete('/delete', (req, res) => res.send('DELETE'));

module.exports = app;
