const express = require('express');
const cookieParser = require('cookie-parser');

// Set up Express app
const app = express();
const port = process.env.PORT || 3000;

// List of valid routes
app.locals.validRoutes = ['/', '/concept', '/art', '/technical_info', '/about'];

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Serve static files from the "public" directory
app.use(express.static('public/css'));
app.use(express.static('public/images'));
app.use(express.static('public/js'));

// Use cookie parser middleware
app.use(cookieParser());
app.use(express.json());

app.use ((req, res, next) => {
  res.locals.theme = req.cookies.theme || 'light';
  next();
});

app.post('/set-theme', (req, res) => {
  const theme = req.body.theme === 'dark' ? 'dark' : 'light';
  res.cookie('theme', theme, {maxAge: 9000000, httpOnly: true});
  res.json({ success: true });
});

// Set the current path
app.use((req, res, next) => {
  res.locals.currentPath = req.path;

  res.locals.navLink = (path, label) => {
    const isActive = req.path === path;
    const activeClass = isActive ? 'active' : '';
    const ariaCurrent = isActive ? 'aria-current="page"' : '';
    return `<li class="nav-item px-4"><a class="nav-link pe-4 ${activeClass}" href="${path}" ${ariaCurrent}>${label}</a></li>`
  }
  next();
})

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
