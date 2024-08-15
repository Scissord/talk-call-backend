import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import apiRoutes from './routes/index.js';

import printName from "./helpers/printName.js";

const app = express();
const PORT = process.env.PORT || 5005;

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
}));

app.get("/", (req, res) => {
  res.send(`Nothing to see here.`);
});
app.use('/api', apiRoutes);

app.listen(PORT, '31.128.41.42', () => {
	printName();
	console.log(`Welcome to Constructor server, port ${PORT} ✅✅✅`);
});
