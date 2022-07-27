require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const requestLimiter = require('./middlewares/limiter');

const { PORT = 3000, DATA_BASE, NODE_ENV } = process.env;
const app = express();
app.use(requestLogger);
app.use(requestLimiter);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/moviesdb');
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
// eslint-disable-next-line no-console
app.listen(PORT, console.log('Сервер запущен и слушает порт:', PORT));
