import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import apiRoutes from './api';
import { jsresponse } from '#utils/index';
import { envConfig } from '#configs/env.config';
import { errorMiddleware, loggerMiddleware } from '#middlewares/index';
import { createServer } from 'http';
import socket from './api/v1.0/modules/sockets/controller';
import { pkgConfig } from '#configs/package.config';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
};

const app = express();
const server = createServer(app);
socket(server);

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '20MB' }));
app.use(jsresponse());
app.use(express.urlencoded({ extended: false, limit: '50MB' }));
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join('.data')));
app.use(express.static(path.join(__dirname, 'logs')));

app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    info: `${pkgConfig.APP_NAME} backend api server. Please visit health route for more information.`,
    hostname: envConfig.HOSTNAME,
  });
});

app.use((err, req, res, next) => {
  errorMiddleware(err, req, res, next);
});

export { server };
