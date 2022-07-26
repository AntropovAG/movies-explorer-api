require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://movies.antropovag.nomoredomains.xyz',
    'http://movies.antropovag.nomoredomains.xyz',
  ],
  credentials: true,
};
const requestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(requestLogger);
app.use(requestLimiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
// eslint-disable-next-line no-console
app.listen(PORT, console.log('Сервер запущен и слушает порт:', PORT));
