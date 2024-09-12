
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import apiRoutes from './routes/index.js';

import printName from "./helpers/printName.js";

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://5.35.82.30',
    'https://tc-chat.pw'
  ],
  credentials: true,
}));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
	printName();
	console.log(`Welcome to Constructor server, port ${PORT} ✅✅✅`);
});
