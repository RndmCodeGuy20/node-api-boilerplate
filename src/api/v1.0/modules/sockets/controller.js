import { socketServices } from './socket';

const { Server } = require('socket.io');
import { SOCKET_ACTIONS } from '#constants/index';
import { validateSocketUser } from '#middlewares/index';

export default (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      allowedHeaders: '*', // "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
    },
  });

  io.use(validateSocketUser);

  io.on(SOCKET_ACTIONS.CONNECTION, async (socket) => {
    const response = await socketServices.handleSocketConnection(socket);
    console.log('response', response);

    /**
		 * @param {{
		 *   roomID: string,
		 * }} room
		 */
    socket.on(SOCKET_ACTIONS.JOIN_ROOM, (room) => {
      console.log('room', room.roomID);
      socket.join(room.roomID);
      socket
          .to(room.roomID)
          .emit(SOCKET_ACTIONS.MESSAGE, `New user joined ${room} room`);
    });

    socket.on(SOCKET_ACTIONS.DATA, (payload) => {
      const { data, roomID } = payload;
      console.log('data', data, roomID);

      socket.to(roomID).emit(SOCKET_ACTIONS.DATA, JSON.stringify(data));
    });

    socket.on(SOCKET_ACTIONS.COMMANDS, async (payload) => {
      const { commands, roomID } = payload;
      console.log('command', commands, roomID);

      // await socketServices.handleCommand(socket, commands, roomID);

      socket.to(roomID).emit(SOCKET_ACTIONS.COMMANDS, commands);
    });

    socket.on(SOCKET_ACTIONS.MESSAGE, (message, room) => {
      // const response = socketServices.handleSocketMessage(socket, message, room.roomID);
      console.log('response', response);
    });

    // setInterval(() => {
    //   socket.emit(SOCKET_ACTIONS.MESSAGE, 'Hello from server');
    // }, 5000);

    socket.on(SOCKET_ACTIONS.DISCONNECT, () => {
      console.log('user disconnected');
    });
  });
};
