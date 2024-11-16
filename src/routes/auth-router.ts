import { Router } from "express";
import authService from "../domain/auth-service";
import { jwtService } from "../application/jwt-service";
import { TUserWithId } from "../types/users";

const authRouter = Router({});

authRouter.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const result = await authService.createUser(username, password, email);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

authRouter.post("/verify", async (req, res) => {
  const { code, email } = req.body;

  try {
    const user = await authService.verifyEmail(code as string, email as string);

    // Generate JWT token after verification
    const token = await jwtService.createJWT(user as unknown as TUserWithId);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 30, // Cookie expires in 30 days
      sameSite: "lax",
    });

    res
      .status(200)
      .json({ message: "User verified and account created successfully" });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

authRouter.post("/signin", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await authService.checkCredentials(usernameOrEmail, password);

    const token = await jwtService.createJWT(user as unknown as TUserWithId);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 30, // Cookie expires in 30 days
      sameSite: "lax",
    });

    res.json({ message: "Signed in successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

authRouter.post("/signout", (_, res) => {
  res.clearCookie("accessToken"); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" });
});

export default authRouter;
