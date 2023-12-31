import { pkgConfig } from '#configs/index';
import { getConnection } from '#helpers/database';

/**
 * Get health
 * @param {{}} req
 * @param {{}} res
 * @param {{}} next
 * @return {Promise<void>}
 */
export const getHealth = async (req, res, next) => {
  try {
    await getConnection();
    const [date, time] = new Date().toISOString().split('T');
    res.jsend.success(
        {
          name: pkgConfig.APP_NAME,
          version: pkgConfig.APP_VERSION,
          timestamp: `${date} - ${time}`,
        },
        {
          info: 'You are on health route all systems active.',
        },
        200,
    );
  } catch (err) {
    next(err);
  }
};
