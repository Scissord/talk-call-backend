import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import apiRoutes from './routes/index.js';

import printName from "./helpers/printName.js";
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'http://' + process.env.CLIENT_IP,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send(`Welcome to restrain api.`);
});
app.use('/api', apiRoutes);

server.listen(PORT, process.env.NODE_ENV === 'development' ? 'localhost' : process.env.SERVER_IP, () => {
	printName();
	console.log(`Welcome to Constructor server, port ${PORT} ✅✅✅`);
});
