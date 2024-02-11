import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { jwtMiddleware } from "./Middlewares/JwtMiddleware";
import todoRouter from "./Routers/Todo";
import userRouter from "./Routers/User";
import { prisma } from "./configs/db";

config();

prisma.$connect().then(() => {
	const app = express();
	const PORT = process.env.PORT || 8080;

	// 3rd party middleware
	app.use(
		morgan(
			":method\t:url\t:date[web]\t:status\t:remote-addr\t:response-time ms"
		),
		express.json(),
		cookieParser()
	);

	// custom middleware
	app.use(jwtMiddleware.decodeJWT);

	// life check
	app.get("/", (req, res) => {
		res.status(200).send("Server is running.").end();
	});

	// router
	app.use("/user", userRouter);
	app.use("/todo", todoRouter);

	// start server
	app.listen(PORT, () => console.log(`Server running at ${PORT}`));
});
