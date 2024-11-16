import { Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import usersService from "../domain/users-servise";
import { UserViewModel } from "../types/models";

const usersRouter = Router({});

usersRouter.get(
  "/",
  authMiddleware,
  async (req: any, res: Response<UserViewModel>) => {
    const userId = (req as any).userId as string;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  }
);

export default usersRouter;
