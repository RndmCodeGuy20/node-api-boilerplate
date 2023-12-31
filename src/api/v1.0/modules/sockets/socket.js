import { SOCKET_ACTIONS } from '#constants/index';

/**
 * Socket Services
 * @class SocketServices
 * @classdesc Socket Services
 * @exports SocketServices
 * @version 1.0.0
 */
class SocketServices {
  /**
	 *
	 * @param {{}} socket
	 * @return {Promise<{message: string, status: number}>}
	 */
  async handleSocketConnection(socket) {
    try {
      socket.emit(SOCKET_ACTIONS.MESSAGE, 'Hello from server');

      return {
        status: 200,
        message: 'Socket connection established',
      };
    } catch (error) {}
  }
}

export const socketServices = new SocketServices();
