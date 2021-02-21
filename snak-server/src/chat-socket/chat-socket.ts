import { Socket } from 'socket.io';

export function chatSocket(socket: Socket) {
  console.log(' a user connected');
  const connections: Socket[] = [];
  connections.push(socket);
  socket.emit('hello hello');
  socket.emit('welcome', { msg: 'lololo' });
}
