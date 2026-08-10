require('dotenv').config();

const path = require('path');
const express = require('express');
const contactHandler = require('./api/contact');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/scss', express.static(path.join(__dirname, 'scss')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Same handler Vercel runs in production as a serverless function (api/contact.js).
app.post('/api/contact', contactHandler);

app.listen(PORT, () => {
  console.log(`Servidor Lithium rodando em http://localhost:${PORT}`);
});
