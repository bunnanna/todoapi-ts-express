import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { jwtMiddleware } from "./Middlewares/JwtMiddleware";
import userRouter from "./Routers/User";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(jwtMiddleware.decodeJWT);

app.get("/", (req, res) => {
	res.status(200).send("Server is running.").end();
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
