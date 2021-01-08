const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressLayouts);
app.set('views', path.join(__dirname, './src/views'));
app.set('layout', path.join(__dirname, './src/views/layouts', 'layout'));
app.set('view engine', 'ejs');

const dashboardRouter = require('./src/routes/Dashboard');
app.use('/', dashboardRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));