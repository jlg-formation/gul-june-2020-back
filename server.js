const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');

const articles = [
  { id: 'a1', name: 'Tournevis', price: 2.34, qty: 110 },
  { id: 'a2', name: 'Marteau', price: 2.34, qty: 20 },
  { id: 'a3', name: 'Tournevis cruciforme', price: 2.34, qty: 40 },
  { id: 'a4', name: 'Pince ', price: 2.34, qty: 45 },
];

let lastId = 4;

const app = express();

app.use((req, res, next) => {
  console.log('req.url', req.url);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  setTimeout(next, 1000);
});

app.get('/ws/articles', (req, res) => {
  res.json(articles);
});

app.post('/ws/articles', (req, res) => {
  const article = req.body;
  console.log('article: ', article);
  lastId++;
  article.id = 'a' + lastId;
  articles.push(article);
  res.status(201).json(article);
});

app.delete('/ws/articles', (req, res) => {
  const ids = req.body;
  console.log('ids: ', ids);
  ids.forEach((id) => {
    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return;
    }
    articles.splice(index, 1);
  });
  res.status(204).end();
});

app.use(express.static('./www'));
app.use(serveIndex('./www', { icons: true }));

app.listen(3000, () => {
  console.log('Web server started on port 3000');
});
