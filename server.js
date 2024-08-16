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
  origin: '*',
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send(`Welcome to restrain api.`);
});
app.use('/api', apiRoutes);

app.listen(PORT, process.env.NODE_ENV === 'development' ? 'localhost' : '31.128.41.42', () => {
	printName();
	console.log(`Welcome to Constructor server, port ${PORT} ✅✅✅`);
});
