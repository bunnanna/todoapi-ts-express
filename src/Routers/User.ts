import { Router } from "express";
import { userController } from "../Controllers/User";

const userRouter = Router();
userRouter.get("/", userController.getSelfData);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUserData);
userRouter.post("/login", userController.login);

export default userRouter;
