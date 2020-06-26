const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  console.log('req.url', req.url);
  next();
});

app.use(cors());
app.use(express.static('./www'));
app.use(serveIndex('./www', { icons: true }));

app.listen(3000, () => {
  console.log('Web server started on port 3000');
});
