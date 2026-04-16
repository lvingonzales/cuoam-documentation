const express = require('express');

// Set up Express app
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Routing
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/concept', (req, res) => {
  res.render('concept', { title: 'Concept' });
});

app.get('/art', (req, res) => {
  res.render('art', { title: 'Art' });
});

app.get('/technical_info', (req, res) => {
  res.render('technical_info', { title: 'Technical Information' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});
