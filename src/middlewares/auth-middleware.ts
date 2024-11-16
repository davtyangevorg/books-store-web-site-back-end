import { Request, Response, NextFunction } from "express";
import { jwtService } from "../application/jwt-service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const userId = await jwtService.getUserIdFromJWT(token);
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }
    (req as any).userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
