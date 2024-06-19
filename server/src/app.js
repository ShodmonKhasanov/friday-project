const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRouter = require('./routes/auth.router');

const app = express();

app.get('/', async (req, res) => {
  res.status(200).send(`<h1>Vse okay</h1`);
});

// Кирилл, ручки на тебе


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRouter);

module.exports = app;
