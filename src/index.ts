import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(jwtMiddleware.decodeJWT);

app.get("/", (req, res) => {
	res.status(200).send("Server is running.").end();
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
