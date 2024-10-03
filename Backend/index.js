import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectDB from "./controllers/connectDB.js";
import cors from "cors";
import generateUsername from "./utils/usernameGenerator.js";
import userRoutes from './routes/userRoutes.js'
import cookieParser from "cookie-parser";
import messageRoutes from './routes/messageRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/api/v1/generateUsername", (req, res) =>{
    const username = generateUsername();
    res.send(username);
});

app.use("/api/v2/users", userRoutes)

app.use("/api/v1/messages", messageRoutes)

app.use("/api/v1/users", authRoutes);

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
