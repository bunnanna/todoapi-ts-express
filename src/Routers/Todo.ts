import { Router } from "express";
import { todoController } from "../Controllers/Todo";

const todoRouter = Router();
todoRouter.get("/", todoController.getTodoList);
todoRouter.get("/:id", todoController.getTodo);
todoRouter.post("/", todoController.createTodo);
todoRouter.patch("/:id", todoController.update);
todoRouter.delete("/:id", todoController.delete);

export default todoRouter;
