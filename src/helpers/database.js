import mongoose from 'mongoose';
import { logger } from '#helpers/index';

export const getConnection = async () => {
  try {
    const mongoUri = 'mongodb:url';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    logger.info('connected to the database successfully', {
      status: 'healthy',
    });
  } catch (err) {
    logger.error(err);
  }
};
