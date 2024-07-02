const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/page1', (req, res) => {
  res.render('page1');
});

app.get('/page2', (req, res) => {
  res.render('page2');
});

app.get('/page3', (req, res) => {
  res.render('page3');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
