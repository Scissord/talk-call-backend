import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://' + process.env.CLIENT_IP,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log("a user connected", socket.id);
  const user_id = socket.handshake.user_id;
  if(user_id) {
    console.log(user_id);
  };

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

export { app, io, server };
