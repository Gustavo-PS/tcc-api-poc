require('dotenv/config');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const routes = require('./src/config/routes');

const app = express()
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {console.log(`Listening at ${port}`)})