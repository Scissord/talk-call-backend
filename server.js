import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from './routes/index.js';
import printName from "./helpers/printName.js";
// import { app, server } from './socket/socket.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://' + process.env.CLIENT_IP
  ],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send(`Welcome to restrain api.`);
});
app.use('/api', apiRoutes);

app.listen(PORT, process.env.NODE_ENV === 'development' ? 'localhost' : process.env.SERVER_IP, () => {
	printName();
	console.log(`Welcome to Constructor server, port ${PORT} ✅✅✅`);
});
