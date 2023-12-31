import { hostname } from 'os';

const env = require('dotenv');
env.config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
});

const {
  NODE_ENV,
  APP_PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
} = process.env;

export const envConfig = {
  ENV: NODE_ENV,
  PORT: APP_PORT,
  HOSTNAME: hostname(),
  DB: {
    HOST: DB_HOST,
    PORT: DB_PORT,
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    NAME: DB_NAME,
  },
  JWT_SECRET_KEY: JWT_SECRET,
};
